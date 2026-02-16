// import React, { useState, useEffect } from "react";
// import { FiUser, FiBox } from "react-icons/fi";
// import axios from "axios";
// import AdminNavbar from "../Navbar/Navbar";
// import {
//   statusStyles,
//   paymentMethodDetails,
//   tableClasses,
//   layoutClasses,
//   iconMap,
// } from "../../assets/dummyadmin";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/api/orders/getall",
//           {
//             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//           }
//         );

//         const formatted = response.data.map((order) => ({
//           ...order,
//           address: order.address ?? order.shippingAddress?.address ?? "",
//           city: order.city ?? order.shippingAddress?.city ?? "",
//           zipCode: order.zipCode ?? order.shippingAddress?.zipCode ?? "",
//           phone: order.phone ?? "",
//           items:
//             order.items?.map((e) => ({
//               _id: e._id,
//               item: e.item,
//               quantity: e.quantity,
//             })) || [],
//           createdAt: new Date(order.createdAt).toLocaleDateString("en-IN", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         }));

//         setOrders(formatted);
//         setError(null);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to load orders.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await axios.put(`http://localhost:4000/api/orders/getall/${orderId}`, {
//         status: newStatus,
//       });
//       setOrders((orders) =>
//         orders.map((o) =>
//           o._id === orderId ? { ...o, status: newStatus } : o
//         )
//       );
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to update order status");
//     }
//   };

//   if (loading)
//     return (
//       <div className={layoutClasses.page + " flex items-center justify-center"}>
//         <div className="text-amber-500 text-lg animate-pulse">
//           Loading orders...
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className={layoutClasses.page + " flex items-center justify-center"}>
//         <div className="text-red-500 text-lg">{error}</div>
//       </div>
//     );

//   return (
//     <>
//       <AdminNavbar />
//       <div className="min-h-screen bg-gray-50 py-10 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-6">
//             <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3">
//               Order Management
//             </h2>

//             <div className="overflow-x-auto rounded-lg border border-gray-200">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
//                     {[
//                       "Date",
//                       "Order ID",
//                       "Customer",
//                       "Address",
//                       "Items",
//                       "Total Items",
//                       "Price",
//                       "Payment",
//                       "Status",
//                     ].map((h) => (
//                       <th
//                         key={h}
//                         className={`py-3 px-4 text-left font-semibold ${
//                           h === "Total Items" ? "text-center" : ""
//                         }`}
//                       >
//                         {h}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map((order, idx) => {
//                     const totalItems = order.items.reduce(
//                       (s, i) => s + i.quantity,
//                       0
//                     );
//                     const totalPrice =
//                       order.total ??
//                       order.items.reduce(
//                         (s, i) => s + i.item.price * i.quantity,
//                         0
//                       );
//                     const payMethod =
//                       paymentMethodDetails[order.paymentMethod?.toLowerCase()] ||
//                       paymentMethodDetails.default;
//                     const payStatusStyle =
//                       statusStyles[order.paymentStatus] ||
//                       statusStyles.processing;
//                     const stat =
//                       statusStyles[order.status] || statusStyles.processing;

//                     return (
//                       <tr
//                         key={order._id}
//                         className={`transition hover:bg-gray-50 ${
//                           idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"
//                         }`}
//                       >
//                         <td className="py-3 px-4 font-mono text-sm text-gray-700">
//                           {order.createdAt}
//                         </td>
//                         <td className="py-3 px-4 font-mono text-sm text-gray-700 uppercase">
//                           {order._id.slice(-8)}
//                         </td>
//                         <td className="py-3 px-4">
//                           <div className="flex items-center gap-3">
//                             <FiUser className="text-gray-500 text-lg" />
//                             <div>
//                               <p className="text-gray-800 font-medium">
//                                 {order.user?.name ||
//                                   order.firstName + " " + order.lastName}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 {order.user?.phone || order.phone}
//                               </p>
//                               <p className="text-xs text-gray-500 truncate max-w-[160px]">
//                                 {order.user?.email || order.email}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="py-3 px-4 text-sm text-gray-600 max-w-[200px] truncate">
//                           {order.address}, {order.city} - {order.zipCode}
//                         </td>
//                         <td className="py-3 px-4">
//                           <div className="space-y-2 max-h-40 overflow-auto pr-1">
//                             {order.items.map((itm, idx) => (
//                               <div
//                                 key={idx}
//                                 className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
//                               >
//                                 <img
//                                   src={`http://localhost:4000${itm.item.imageUrl}`}
//                                   alt={itm.item.name}
//                                   className="w-10 h-10 object-cover rounded-lg shadow"
//                                 />
//                                 <div className="flex-1">
//                                   <span className="text-sm text-gray-800 font-medium block truncate">
//                                     {itm.item.name}
//                                   </span>
//                                   <div className="flex items-center gap-2 text-xs text-gray-500">
//                                     <span>₹{itm.item.price.toFixed(2)}</span>
//                                     <span>•</span>
//                                     <span>x{itm.quantity}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </td>
//                         <td className="py-3 px-4 text-center font-semibold text-gray-700">
//                           <div className="flex items-center justify-center gap-1">
//                             <FiBox className="text-gray-500" />
//                             <span>{totalItems}</span>
//                           </div>
//                         </td>
//                         <td className="py-3 px-4 text-gray-800 font-semibold">
//                           ₹{totalPrice.toFixed(2)}
//                         </td>
//                         <td className="py-3 px-4">
//                           <div className="flex flex-col gap-2">
//                             <div
//                               className={`${payMethod.class} px-3 py-1.5 rounded-lg border text-xs text-center`}
//                             >
//                               {payMethod.label}
//                             </div>
//                             <div
//                               className={`${payStatusStyle.color} flex items-center gap-2 text-sm `}
//                             >
//                               {iconMap[payStatusStyle.icon]}
//                               <span>{payStatusStyle.label}</span>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="py-3 px-4">
//                           <div className="flex items-center gap-2">
//                             <span className={`${stat.color} text-lg`}>
//                               {iconMap[stat.icon]}
//                             </span>
//                             <select
//                               value={order.status}
//                               onChange={(e) =>
//                                 handleStatusChange(order._id, e.target.value)
//                               }
//                               className={`px-3 py-1.5 rounded-lg ${stat.bg} ${stat.color} border border-gray-300 text-sm cursor-pointer`}
//                             >
//                               {Object.entries(statusStyles)
//                                 .filter(([k]) => k !== "succeeded")
//                                 .map(([key, sty]) => (
//                                   <option
//                                     key={key}
//                                     value={key}
//                                     className={`${sty.bg} ${sty.color}`}
//                                   >
//                                     {sty.label}
//                                   </option>
//                                 ))}
//                             </select>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {orders.length === 0 && (
//               <div className="text-center py-12 text-gray-500 text-lg">
//                 No orders found
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Orders;
import React, { useState, useEffect } from "react";
import { FiUser, FiBox } from "react-icons/fi";
import axios from "axios";
import AdminNavbar from "../Navbar/Navbar";
import {
  statusStyles,
  paymentMethodDetails,
  layoutClasses,
  iconMap,
} from "../../assets/dummyadmin";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://mern-full-stake-web.onrender.com/api/orders/getall",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        const formatted = response.data.map((order) => ({
          ...order,
          address: order.address ?? order.shippingAddress?.address ?? "",
          city: order.city ?? order.shippingAddress?.city ?? "",
          zipCode: order.zipCode ?? order.shippingAddress?.zipCode ?? "",
          phone: order.phone ?? "",
          items:
            order.items?.map((e) => ({
              _id: e._id,
              item: e.item,
              quantity: e.quantity,
            })) || [],
          createdAt: new Date(order.createdAt).toLocaleString("en-IN", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        }));

        setOrders(formatted);
        setFilteredOrders(formatted);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`https://mern-full-stake-web.onrender.com/api/orders/getall/${orderId}`, {
        status: newStatus,
      });
      setOrders((orders) =>
        orders.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
      setFilteredOrders((orders) =>
        orders.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order status");
    }
  };

  // 🔍 Filter orders by date range
  const handleDateFilter = () => {
    if (!startDate || !endDate) {
      alert("Please select both From and To dates");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= start && orderDate <= end;
    });

    setFilteredOrders(filtered);
  };

  // 🔄 Reset filter
  const resetFilter = () => {
    setFilteredOrders(orders);
    setStartDate("");
    setEndDate("");
  };

  if (loading)
    return (
      <div className={layoutClasses.page + " flex items-center justify-center"}>
        <div className="text-amber-500 text-lg animate-pulse">
          Loading orders...
        </div>
      </div>
    );

  if (error)
    return (
      <div className={layoutClasses.page + " flex items-center justify-center"}>
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3">
              Order Management
            </h2>

            {/* 🗓 Date Filter Section */}
            <div className="flex flex-wrap items-end gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-600 font-medium mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 font-medium mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>
              <button
                onClick={handleDateFilter}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
              >
                Filter
              </button>
              <button
                onClick={resetFilter}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-5 py-2 rounded-lg shadow-md transition"
              >
                Reset
              </button>
            </div>

            {/* 📋 Orders Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
                    {[
                      "Date",
                      "Order ID",
                      "Customer",
                      "Address",
                      "Items",
                      "Total Items",
                      "Price",
                      "Payment",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        className={`py-3 px-4 text-left font-semibold ${
                          h === "Total Items" ? "text-center" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, idx) => {
                    const totalItems = order.items.reduce(
                      (s, i) => s + i.quantity,
                      0
                    );
                    const totalPrice =
                      order.total ??
                      order.items.reduce(
                        (s, i) => s + i.item.price * i.quantity,
                        0
                      );
                    const payMethod =
                      paymentMethodDetails[order.paymentMethod?.toLowerCase()] ||
                      paymentMethodDetails.default;
                    const payStatusStyle =
                      statusStyles[order.paymentStatus] ||
                      statusStyles.processing;
                    const stat =
                      statusStyles[order.status] || statusStyles.processing;

                    return (
                      <tr
                        key={order._id}
                        className={`transition hover:bg-gray-50 ${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                        }`}
                      >
                        <td className="py-3 px-4 font-mono text-sm text-gray-700">
                          {order.createdAt}
                        </td>
                        <td className="py-3 px-4 font-mono text-sm text-gray-700 uppercase">
                          {order._id.slice(-8)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <FiUser className="text-gray-500 text-lg" />
                            <div>
                              <p className="text-gray-800 font-medium">
                                {order.user?.name ||
                                  order.firstName + " " + order.lastName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {order.user?.phone || order.phone}
                              </p>
                              <p className="text-xs text-gray-500 truncate max-w-[160px]">
                                {order.user?.email || order.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 max-w-[200px] truncate">
                          {order.address}, {order.city} - {order.zipCode}
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-2 max-h-40 overflow-auto pr-1">
                            {order.items.map((itm, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
                              >
                                <img
                                  src={itm.item.imageUrl}
                                  alt={itm.item.name}
                                  className="w-10 h-10 object-cover rounded-lg shadow"
                                />
                                <div className="flex-1">
                                  <span className="text-sm text-gray-800 font-medium block truncate">
                                    {itm.item.name}
                                  </span>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>₹{itm.item.price.toFixed(2)}</span>
                                    <span>•</span>
                                    <span>x{itm.quantity}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center font-semibold text-gray-700">
                          <div className="flex items-center justify-center gap-1">
                            <FiBox className="text-gray-500" />
                            <span>{totalItems}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-800 font-semibold">
                          ₹{totalPrice.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-2">
                            <div
                              className={`${payMethod.class} px-3 py-1.5 rounded-lg border text-xs text-center`}
                            >
                              {payMethod.label}
                            </div>
                            <div
                              className={`${payStatusStyle.color} flex items-center gap-2 text-sm`}
                            >
                              {iconMap[payStatusStyle.icon]}
                              <span>{payStatusStyle.label}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`${stat.color} text-lg`}>
                              {iconMap[stat.icon]}
                            </span>
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(order._id, e.target.value)
                              }
                              className={`px-3 py-1.5 rounded-lg ${stat.bg} ${stat.color} border border-gray-300 text-sm cursor-pointer`}
                            >
                              {Object.entries(statusStyles)
                                .filter(([k]) => k !== "succeeded")
                                .map(([key, sty]) => (
                                  <option
                                    key={key}
                                    value={key}
                                    className={`${sty.bg} ${sty.color}`}
                                  >
                                    {sty.label}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-lg">
                No orders found for the selected date range
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
