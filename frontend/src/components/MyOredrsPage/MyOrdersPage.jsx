// // src/pages/UserOrdersPage.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { FcApproval } from "react-icons/fc";
// import { GiCampCookingPot } from "react-icons/gi";
// import { MdOutlineDirectionsBike } from "react-icons/md";
// import { LuPackageCheck } from "react-icons/lu";
// import { FiArrowLeft, FiChevronDown } from "react-icons/fi";

// // -----------------------------
// // BillModal (same as before)
// // -----------------------------
// const BillModal = ({ order, onClose }) => {
//   if (!order) return null;
//   const handleModalContentClick = (e) => e.stopPropagation();

//   const storeName =
//     order.store?.name || order.storeName || "Annapurna Dhaba and Family Restaurant";
//   const storeAddress =
//     order.store?.address || order.storeAddress || "Loenga, Kamdara, Gumla, Ranchi - 835227";
//   const storePhone = order.store?.phone || order.storePhone || "7903335271";

//   const customerFirstName =
//     order.firstName || order.user?.firstName || order.user?.name || order.customerName || "";
//   const customerLastName = order.lastName || order.user?.lastName || "";
//   const customerFullName = `${customerFirstName}${customerLastName ? " " + customerLastName : ""}`.trim() || "Customer";

//   const customerAddress =
//     order.address ||
//     order.user?.address ||
//     order.shippingAddress?.address ||
//     order.deliveryAddress?.address ||
//     order.user?.addresses?.[0]?.fullAddress ||
//     "";

//   const customerPhone = order.phone || order.user?.phone || order.contact || "";

//   const items = Array.isArray(order.items) ? order.items : [];
//   const subtotal =
//     typeof order.subtotal === "number"
//       ? order.subtotal
//       : items.reduce((sum, it) => sum + (Number(it?.item?.price ?? 0) * (it.quantity ?? 0)), 0);
//   const tax = typeof order.tax === "number" ? order.tax : subtotal * 0.05;
//   const grandTotal = typeof order.total === "number" ? order.total : subtotal + tax;

//   const fmt = (v) => Number(v || 0).toFixed(2);

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6"
//         onClick={handleModalContentClick}
//       >
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold text-[#e6002b]">Invoice</h2>
//           <p className="text-sm text-gray-500 uppercase">Order #{String(order._id).slice(-6)}</p>
//           <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
//         </div>

//         <div className="grid grid-cols-2 gap-4 text-sm mb-6">
//           <div>
//             <p className="text-xs uppercase font-bold text-gray-600">{storeName}</p>
//             <p className="text-xs text-gray-400 uppercase">{storeAddress}</p>
//             <p className="text-xs text-gray-400">Phone: {storePhone}</p>
//           </div>

//           <div>
//             <p className="font-bold text-gray-600 underline">Billed To:</p>
//             <p className="uppercase text-xs font-bold text-gray-500">{customerFullName}</p>
//             {customerAddress && <p className="uppercase text-xs text-gray-500">{customerAddress}</p>}
//             {customerPhone && <p className="uppercase text-xs text-gray-400 mt-1">Phone: {customerPhone}</p>}
//             <p className="uppercase text-xs font-bold text-gray-400 mt-2">
//               {order.paymentMethod || "Cash on Delivery"}
//             </p>
//           </div>
//         </div>

//         <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
//           <h3 className="font-semibold text-gray-700 border-b pb-2">Order Summary</h3>
//           {items.map((entry) => {
//             const key = entry._id || entry.item?._id || Math.random();
//             const name = entry.item?.name || "Item";
//             const qty = entry.quantity ?? 0;
//             const price = Number(entry.item?.price ?? 0);
//             const img = entry.item?.imageUrl || "";
//             return (
//               <div key={key} className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <img
//                     src={img}
//                     alt={name}
//                     className="w-12 h-8 rounded-lg object-cover mr-4"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "https://placehold.co/100x100/e2e8f0/e2e8f0?text=Img";
//                     }}
//                   />
//                   <div>
//                     <p className="font-semibold text-gray-500 uppercase">{name}</p>
//                     <p className="text-gray-500 text-sm">Qty: {qty}</p>
//                   </div>
//                 </div>
//                 <p className="font-semibold text-gray-800">₹{fmt(price * qty)}</p>
//               </div>
//             );
//           })}
//         </div>

//         <div className="border-t pt-4 space-y-2 text-sm">
//           <div className="flex justify-between items-center">
//             <p className="text-gray-600">Subtotal</p>
//             <p className="font-semibold text-gray-800">₹{fmt(subtotal)}</p>
//           </div>
//           <div className="flex justify-between items-center">
//             <p className="text-gray-600">Taxes & Charges (5%)</p>
//             <p className="font-semibold text-gray-800">₹{fmt(tax)}</p>
//           </div>
//           <div className="border-t border-dashed my-2"></div>
//           <div className="flex justify-between items-center text-lg">
//             <p className="font-bold text-gray-800">Grand Total</p>
//             <p className="text-2xl font-bold text-[#e6002b]">₹{fmt(grandTotal)}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // -----------------------------
// // OrderCard with item name on top
// // -----------------------------
// const OrderCard = ({ order, isExpanded, onExpand, handleViewBill }) => {
//   const currentStep = getCurrentStep(order.status);
//   const items = Array.isArray(order.items) ? order.items : [];
//   const subtotal = items.reduce((s, it) => s + (Number(it?.item?.price ?? 0) * (it.quantity ?? 0)), 0);
//   const totalPrice = Number(order.total ?? subtotal * 1.05);

//   const firstItemName = items[0]?.item?.name || "Order";

//   return (
//     <div className="bg-white shadow-md rounded-xl overflow-hidden mb-4 transition-all duration-300">
//       <div
//         className="bg-green-600 text-white p-4 flex justify-between items-center cursor-pointer"
//         onClick={onExpand}
//       >
//         <div>
//           <p className="font-bold">{firstItemName}</p>
//           <p className="text-xs">Order #{String(order._id).slice(-6)}</p>
//           <p className="text-sm">{new Date(order.createdAt).toLocaleString()}</p>
//         </div>
//         <div className="flex items-center">
//           <p className="font-semibold mr-2">₹{totalPrice.toFixed(2)}</p>
//           <FiChevronDown
//             className={`transform transition-transform duration-300 ${
//               isExpanded ? "rotate-180" : ""
//             }`}
//             size={20}
//           />
//         </div>
//       </div>

//       <div
//         className={`transition-all duration-500 ease-in-out overflow-hidden ${
//           isExpanded ? "max-h-[1000px]" : "max-h-0"
//         }`}
//       >
//         <div className="p-4 space-y-6">
//           {[
//             { label: "Order Placed", description: "We have received your order.", icon: <FcApproval />, step: 0 },
//             { label: "Order Confirmed", description: "Order locked in. We're on it!", icon: <GiCampCookingPot className="text-red-500" />, step: 1 },
//             { label: "Out For Delivery", description: "Your food is on the way.", icon: <MdOutlineDirectionsBike className="text-blue-600" />, step: 2 },
//             { label: "Delivered", description: "Enjoy your meal!", icon: <LuPackageCheck className="text-yellow-600" />, step: 3 },
//           ].map(({ label, description, icon, step }, index, arr) => {
//             const isActive = currentStep >= step;
//             return (
//               <div key={index} className="flex items-start relative pl-6">
//                 <div className="absolute left-0 top-1">
//                   <div className={`w-5 h-5 rounded-full ${isActive ? "bg-green-600" : "bg-gray-300"} border-2 border-white`}></div>
//                   {index < arr.length - 1 && (
//                     <div className="absolute left-1/2 top-6 transform -translate-x-1/2 h-14 w-px bg-green-300"></div>
//                   )}
//                 </div>
//                 <div className="ml-4">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-xl">{icon}</span>
//                     <p className={`font-semibold ${isActive ? "text-green-600" : "text-gray-400"}`}>{label}</p>
//                   </div>
//                   <p className={`text-sm mt-1 ${isActive ? "text-gray-700" : "text-gray-400"}`}>{description}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="px-4 pb-4">
//           <button
//             onClick={() => handleViewBill(order)}
//             className="w-full bg-[#e6002b] hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
//           >
//             View Bill
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // -----------------------------
// // Helper: map status to step
// // -----------------------------
// const getCurrentStep = (status) => {
//   switch ((status || "").toString().toLowerCase()) {
//     case "processing":
//     case "order confirmed":
//     case "confirmed":
//       return 1;
//     case "outfordelivery":
//       return 2;
//     case "delivered":
//     case "succeeded":
//       return 3;
//     default:
//       return 0;
//   }
// };

// // -----------------------------
// // Main Page
// // -----------------------------
// const UserOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedOrderId, setExpandedOrderId] = useState(null);
//   const [selectedOrderForBill, setSelectedOrderForBill] = useState(null);

//   useEffect(() => {
//     const userId = localStorage.getItem("UserId");
//     if (!userId) {
//       setError("Please log in to see your orders.");
//       setLoading(false);
//       return;
//     }

//     const fetchOrders = async () => {
//       try {
//         const API_BASE_URL = "http://localhost:4000";
//         const response = await axios.get(`${API_BASE_URL}/api/orders`, {
//           params: { userId },
//           headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
//         });

//         const formattedData = (response.data || []).map((order) => ({
//           ...order,
//           items: (order.items || []).map((entry) => ({
//             ...entry,
//             item: {
//               ...entry.item,
//               imageUrl: entry.item?.imageUrl ? `${API_BASE_URL}${entry.item.imageUrl}` : null,
//             },
//           })),
//         }));

//         const sortedData = formattedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setOrders(sortedData);

//         // Expand the latest order by default
//         if (sortedData.length > 0) {
//           setExpandedOrderId(sortedData[0]._id);
//         }

//         setError(null);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         setError("Failed to load orders. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-md mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <Link to="/" className="flex items-center gap-2 text-gray-600">
//             <FiArrowLeft className="text-xl" />
//             <span className="font-bold">Back</span>
//           </Link>
//         </div>

//         {loading && <p className="text-center text-gray-500">Loading orders...</p>}
//         {error && <p className="text-center text-red-500">{error}</p>}

//         {!loading && !error && orders.length === 0 && (
//           <p className="text-center text-gray-500">No orders found.</p>
//         )}

//         {!loading &&
//           !error &&
//           orders.map((order) => (
//             <OrderCard
//               key={order._id}
//               order={order}
//               isExpanded={expandedOrderId === order._id}
//               onExpand={() =>
//                 setExpandedOrderId(expandedOrderId === order._id ? null : order._id)
//               }
//               handleViewBill={setSelectedOrderForBill}
//             />
//           ))}
//       </div>

//       <BillModal order={selectedOrderForBill} onClose={() => setSelectedOrderForBill(null)} />
//     </div>
//   );
// };

// export default UserOrdersPage;

// src/pages/UserOrdersPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FcApproval } from "react-icons/fc";
import { GiCampCookingPot } from "react-icons/gi";
import { MdOutlineDirectionsBike } from "react-icons/md";
import { LuPackageCheck } from "react-icons/lu";
import { FiArrowLeft, FiChevronDown } from "react-icons/fi";
import { apiUrl } from "../../config/api";

// -----------------------------
// BillModal Component
// -----------------------------
const BillModal = ({ order, onClose }) => {
  if (!order) return null;
  const handleModalContentClick = (e) => e.stopPropagation();

  const storeName =
    order.store?.name || order.storeName || "Annapurna Dhaba and Family Restaurant";
  const storeAddress =
    order.store?.address || order.storeAddress || "Loenga, Kamdara, Gumla, Ranchi - 835227";
  const storePhone = order.store?.phone || order.storePhone || "7903335271";

  const customerFullName = `${order.firstName || ""} ${order.lastName || ""}`.trim() || "Customer";
  const customerAddress = order.address || "";
  const customerPhone = order.phone || "";

  const items = Array.isArray(order.items) ? order.items : [];
  const subtotal = typeof order.subtotal === "number"
    ? order.subtotal
    : items.reduce((sum, it) => sum + (Number(it?.item?.price ?? 0) * (it.quantity ?? 0)), 0);
  const tax = typeof order.tax === "number" ? order.tax : subtotal * 0.05;
  const grandTotal = typeof order.total === "number" ? order.total : subtotal + tax;

  const fmt = (v) => Number(v || 0).toFixed(2);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6"
        onClick={handleModalContentClick}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#e6002b]">Invoice</h2>
          <p className="text-sm text-gray-500 uppercase">Order #{String(order._id).slice(-6)}</p>
          <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <p className="text-xs uppercase font-bold text-gray-600">{storeName}</p>
            <p className="text-xs text-gray-400 uppercase">{storeAddress}</p>
            <p className="text-xs text-gray-400">Phone: {storePhone}</p>
          </div>

          <div>
            <p className="font-bold text-gray-600 underline">Billed To:</p>
            <p className="uppercase text-xs font-bold text-gray-500">{customerFullName}</p>
            {customerAddress && <p className="uppercase text-xs text-gray-500">{customerAddress}</p>}
            {customerPhone && <p className="uppercase text-xs text-gray-400 mt-1">Phone: {customerPhone}</p>}
            <p className="uppercase text-xs font-bold text-gray-400 mt-2">
              {order.paymentMethod || "Cash on Delivery"}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Order Summary</h3>
          {items.map((entry) => {
            const key = entry._id || entry.item?._id || Math.random();
            const name = entry.item?.name || "Item";
            const qty = entry.quantity ?? 0;
            const price = Number(entry.item?.price ?? 0);
            const img = entry.item?.imageUrl || "";
            return (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={img}
                    alt={name}
                    className="w-12 h-8 rounded-lg object-cover mr-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/100x100/e2e8f0/e2e8f0?text=Img";
                    }}
                  />
                  <div>
                    <p className="font-semibold text-gray-500 uppercase">{name}</p>
                    <p className="text-gray-500 text-sm">Qty: {qty}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">₹{fmt(price * qty)}</p>
              </div>
            );
          })}
        </div>

        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Subtotal</p>
            <p className="font-semibold text-gray-800">₹{fmt(subtotal)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Taxes & Charges (5%)</p>
            <p className="font-semibold text-gray-800">₹{fmt(tax)}</p>
          </div>
          <div className="border-t border-dashed my-2"></div>
          <div className="flex justify-between items-center text-lg">
            <p className="font-bold text-gray-800">Grand Total</p>
            <p className="text-2xl font-bold text-[#e6002b]">₹{fmt(grandTotal)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// -----------------------------
// OrderCard Component
// -----------------------------
const OrderCard = ({ order, isExpanded, onExpand, handleViewBill }) => {
  const currentStep = getCurrentStep(order.status);
  const items = Array.isArray(order.items) ? order.items : [];
  const subtotal = items.reduce((s, it) => s + (Number(it?.item?.price ?? 0) * (it.quantity ?? 0)), 0);
  const totalPrice = Number(order.total ?? subtotal * 1.05);

  const firstItemName = items[0]?.item?.name || "Order";

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden mb-4 transition-all duration-300">
      <div
        className="bg-green-600 text-white p-4 flex justify-between items-center cursor-pointer"
        onClick={onExpand}
      >
        <div>
          <p className="font-bold">{firstItemName}</p>
          <p className="text-xs">Order #{String(order._id).slice(-6)}</p>
          <p className="text-sm">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex items-center">
          <p className="font-semibold mr-2">₹{totalPrice.toFixed(2)}</p>
          <FiChevronDown
            className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            size={20}
          />
        </div>
      </div>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? "max-h-[1000px]" : "max-h-0"}`}>
        <div className="p-4 space-y-6">
          {[
            { label: "Order Placed", description: "We have received your order.", icon: <FcApproval />, step: 0 },
            { label: "Order Confirmed", description: "Order locked in. We're on it!", icon: <GiCampCookingPot className="text-red-500" />, step: 1 },
            { label: "Out For Delivery", description: "Your food is on the way.", icon: <MdOutlineDirectionsBike className="text-blue-600" />, step: 2 },
            { label: "Delivered", description: "Enjoy your meal!", icon: <LuPackageCheck className="text-yellow-600" />, step: 3 },
          ].map(({ label, description, icon, step }, index, arr) => {
            const isActive = currentStep >= step;
            return (
              <div key={index} className="flex items-start relative pl-6">
                <div className="absolute left-0 top-1">
                  <div className={`w-5 h-5 rounded-full ${isActive ? "bg-green-600" : "bg-gray-300"} border-2 border-white`}></div>
                  {index < arr.length - 1 && (
                    <div className="absolute left-1/2 top-6 transform -translate-x-1/2 h-14 w-px bg-green-300"></div>
                  )}
                </div>
                <div className="ml-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{icon}</span>
                    <p className={`font-semibold ${isActive ? "text-green-600" : "text-gray-400"}`}>{label}</p>
                  </div>
                  <p className={`text-sm mt-1 ${isActive ? "text-gray-700" : "text-gray-400"}`}>{description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={() => handleViewBill(order)}
            className="w-full bg-[#e6002b] hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
          >
            View Bill
          </button>
        </div>
      </div>
    </div>
  );
};

// -----------------------------
// Status Helper
// -----------------------------
const getCurrentStep = (status) => {
  switch ((status || "").toString().toLowerCase()) {
    case "processing":
    case "order confirmed":
    case "confirmed":
      return 1;
    case "outfordelivery":
      return 2;
    case "delivered":
    case "succeeded":
      return 3;
    default:
      return 0;
  }
};

// -----------------------------
// Main Page
// -----------------------------
const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [selectedOrderForBill, setSelectedOrderForBill] = useState(null);

  useEffect(() => {
    // const firebaseId = localStorage.getItem("UserId"); // now sending Firebase UID
    // if (!firebaseId) {
    const userId = localStorage.getItem("userId") || localStorage.getItem("UserId");
    if (!userId) {
      setError("Please log in to see your orders.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const API_BASE_URL = apiUrl();
        const response = await axios.get(`${API_BASE_URL}/api/orders`, {
          // params: { firebaseId },
          // headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
       headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      
        });

        const formattedData = (response.data || []).map((order) => ({
          ...order,
          items: (order.items || []).map((entry) => ({
            ...entry,
            item: {
              ...entry.item,
              imageUrl: entry.item?.imageUrl
                ? entry.item.imageUrl.startsWith("http")
                  ? entry.item.imageUrl
                  : `${API_BASE_URL}${entry.item.imageUrl}`
                : null,
            },
          })),
        }));

        const sortedData = formattedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedData);

        if (sortedData.length > 0) setExpandedOrderId(sortedData[0]._id);

        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="flex items-center gap-2 text-gray-600">
            <FiArrowLeft className="text-xl" />
            <span className="font-bold">Back</span>
          </Link>
        </div>

        {loading && <p className="text-center text-gray-500">Loading orders...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && orders.length === 0 && <p className="text-center text-gray-500">No orders found.</p>}

        {!loading && !error &&
          orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              isExpanded={expandedOrderId === order._id}
              onExpand={() =>
                setExpandedOrderId(expandedOrderId === order._id ? null : order._id)
              }
              handleViewBill={setSelectedOrderForBill}
            />
          ))}
      </div>

      <BillModal order={selectedOrderForBill} onClose={() => setSelectedOrderForBill(null)} />
    </div>
  );
};

export default UserOrdersPage;
