import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Bill = () => {
  const { _id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("authToken");
        // console.log("Ankit Kumar"+orderId)
        const response = await axios.get(`http://localhost:4000/api/orders/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrder(response.data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to fetch order details.");
      }
    };

    fetchOrder();
  }, [orderId]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!order) {
    return <div className="text-center text-gray-500">Loading bill...</div>;
  }

  const totalAmount = order.items.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-xl font-bold mb-4 text-[#e6002b]">Bill Summary</h1>

      <p className="text-sm text-gray-700 mb-2">
        <strong>Order ID:</strong> {order._id}
      </p>
      <p className="text-sm text-gray-700 mb-2">
        <strong>Status:</strong> {order.status}
      </p>
      <p className="text-sm text-gray-700 mb-4">
        <strong>Date:</strong>{" "}
        {new Date(order.createdAt).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>

      <table className="w-full text-sm text-left mb-6">
        <thead className="border-b">
          <tr>
            <th className="py-2">Item</th>
            <th className="py-2">Qty</th>
            <th className="py-2">Price</th>
            <th className="py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map(({ item, quantity }, idx) => (
            <tr key={idx} className="border-b">
              <td className="py-2 uppercase">{item.name}</td>
              <td className="py-2">{quantity}</td>
              <td className="py-2">₹{item.price}</td>
              <td className="py-2">₹{item.price * quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between font-semibold text-lg">
        <span>Total Amount:</span>
        <span className="text-[#e6002b]">₹{totalAmount}</span>
      </div>
    </div>
  );
};

export default Bill;
