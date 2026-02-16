// import React, { useState, useEffect } from "react";
// import { FaUserCircle, FaUsers } from "react-icons/fa";
// import { IoBagCheckOutline } from "react-icons/io5";
// import { BsCashCoin } from "react-icons/bs";

// const UserDisplay = () => {
//   const [users, setUsers] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ Fetch Users
//   useEffect(() => {
//     const fetchUsersData = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("http://localhost:4000/api/users");
//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         const data = await response.json();
//         setUsers(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchUsersData();
//   }, []);

//   useEffect(() => {
//   const fetchOrderData = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       // 🔹 Use the public endpoint (no token needed)
//       const response = await fetch("http://localhost:4000/api/orders/getall", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       const data = await response.json();

//       // 🔹 If your backend returns { orders: [...] }
//       setOrders(data.orders || data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   fetchOrderData();
// }, []);


//   // ✅ Helper to check today's data
//   const isToday = (date) => {
//     const d = new Date(date);
//     const today = new Date();
//     return (
//       d.getDate() === today.getDate() &&
//       d.getMonth() === today.getMonth() &&
//       d.getFullYear() === today.getFullYear()
//     );
//   };

//   // ✅ Stats
//   const totalUsers = users.length;
//   const todayUsers = users.filter((u) => isToday(u.createdAt)).length;

//   const totalOrders = orders.length;
//   const todayOrders = orders.filter((o) => isToday(o.createdAt)).length;

//   const totalPayments = orders.reduce(
//     (sum, order) => sum + (order.totalAmount || order.total || 0),
//     0
//   );

//   // ✅ User-specific orders
//   const userOrders = selectedUser
//     ? orders.filter(
//         (order) =>
//           order.userId === selectedUser._id || order.user === selectedUser._id
//       )
//     : [];

//   const totalPaymentByUser = userOrders.reduce(
//     (sum, order) => sum + (order.totalAmount || 0),
//     0
//   );

//   if (isLoading) return <div className="p-6">Loading user data...</div>;
//   if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

//   return (
//     <div className="flex  ">
//       {/* ✅ Sidebar with Users */}
// <aside className="bg-white w-64 p-5 border-r shadow-lg 
//                   sticky top-0 h-screen overflow-y-auto">
//         <div className="h-full px-3 py-6 overflow-y-auto">
//           <h2 className="text-lg font-bold text-gray-700 mb-4">Users</h2>
//           <ul className="space-y-2 font-medium">
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <li
//                   key={user._id}
//                   onClick={() => setSelectedUser(user)}
//                   className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition border-2 border-gray-200 ${
//                     selectedUser?._id === user._id
//                       ? "bg-green-600 text-white"
//                       : "hover:bg-green-100"
//                   }`}
//                 >
//                   <span className="truncate">
//                     {user.username ||
//                       `${user.addresses?.[0]?.firstName || ""} ${
//                         user.addresses?.[0]?.lastName || ""
//                       }`}
//                   </span>
//                   {/* Count this user's new orders (today) */}
// {(() => {
//   const userOrdersToday = orders.filter(
//     (o) =>
//       (o.userId === user._id || o.user === user._id) &&
//       isToday(o.createdAt)
//   );

//   return (
//     <span
//       className={`text-xs font-bold px-2 py-0.5 rounded-full ${
//         selectedUser?._id === user._id
//           ? "bg-white text-green-700"
//           : "bg-green-100 text-green-700"
//       }`}
//     >
//       {userOrdersToday.length > 0
//         ? `${userOrdersToday.length} New`
//         : "0"}
//     </span>
//   );
// })()}

//                 </li>
//               ))
//             ) : (
//               <p className="text-sm text-gray-500">No users found.</p>
//             )}
//           </ul>
//         </div>
//       </aside>

//       {/* ✅ Main Content */}
//       <main className="flex-1 p-6 ml-64 font-['Nunito']">
//         {/* Stats cards */}
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <div className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
//             <p className="text-sm text-gray-400">Today Users</p>
//             <p className="text-lg font-bold text-gray-700">{todayUsers}</p>
//             <p className="text-sm text-gray-500">Total: {totalUsers}</p>
//           </div>

//           <div className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
//             <p className="text-sm text-gray-400">Today Orders</p>
//             <p className="text-lg font-bold text-gray-700">{todayOrders}</p>
//             <p className="text-sm text-gray-500">Total: {totalOrders}</p>
//           </div>

//           <div className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
//             <p className="text-sm text-gray-400">Payments</p>
//             <p className="text-lg font-bold text-gray-700">₹{totalPayments}</p>
//           </div>
//         </div>

//         {/* ✅ Selected User Details */}
//         {selectedUser ? (
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <div className="flex items-center gap-4 border-b pb-4 mb-4">
//               <FaUserCircle className="text-5xl text-green-600" />
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {selectedUser.username ||
//                     `${selectedUser.addresses?.[0]?.firstName || ""} ${
//                       selectedUser.addresses?.[0]?.lastName || ""
//                     }`}
//                 </h2>
//                 <p className="text-sm text-gray-500">{selectedUser.email}</p>

//               </div>
//             </div>

//             {/* Orders */}
//             <div>
//               <h3 className="text-md font-semibold text-gray-600 mb-4">
//                 Orders
//               </h3>
//               {userOrders.length > 0 ? (
//                 <div className="space-y-4">
//                   {userOrders.map((order) => (
//                     <div
//                       key={order._id}
//                       className="p-4 border rounded-lg shadow-sm flex gap-4 bg-gray-50 hover:bg-gray-100 transition"
//                     >
//                       <div className="flex-1">
//                         <p className="text-sm font-bold text-gray-800 uppercase">
//                           Order ID: {order._id}
//                         </p>
//                         <p className="text-sm font-bold text-gray-800 uppercase">
//                           Deliver To: {order.firstName} {order.lastName}
//                         </p>
//                           <p className="text-sm uppercase text-gray-600">
//                           Payment Status: {order.paymentStatus}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           Price: ₹{order.total}
//                         </p>
//                          <p className="text-sm text-gray-600 uppercase">
//                           Status: {order.status}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           Payment: {order.paymentMethod || "N/A"}
//                         </p>
                 
//                         <div className="space-y-2">
//       <h4 className="text-sm font-semibold text-gray-700 mb-2">Items:</h4>
//       {order.items && order.items.length > 0 ? (
//         order.items.map((i) => (
//           <div
//             key={i._id}
//             className="flex items-center gap-4 p-2 border rounded-lg bg-white shadow-sm"
//           >
//             {/* Product Image */}
//             <img
//               src={`http://localhost:4000${i.item.imageUrl}`}
//               alt={i.item.name}
//               className="w-16 h-16 rounded object-cover border"
//             />

//             {/* Product Info */}
//             <div className="flex-1">
//               <p className="text-sm font-medium text-gray-800">{i.item.name}</p>
//               <p className="text-xs text-gray-500">
//                 Price: ₹{i.item.price} × {i.quantity}
//               </p>
//               <p className="text-xs font-semibold text-gray-700">
//                 Subtotal: ₹{i.item.price * i.quantity}
//               </p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-xs text-gray-400">No items found.</p>
//       )}
//     </div>

//                         <p className="text-xs text-gray-500">
//                           {new Date(order.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                   ))}

//                   {/* Total Payment by this user */}
//                   <div className="p-4 bg-green-100 border rounded-lg mt-4">
//                     <p className="text-sm text-gray-700 font-semibold">
//                       Total Payment by User: ₹{totalPaymentByUser}
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No orders for this user.</p>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="flex items-center justify-center h-full bg-white/50 rounded-xl border-2 border-dashed">
//             <p className="text-gray-500 font-medium">
//               Select a user from the sidebar to view details
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default UserDisplay;

import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const UserDisplay = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Fetch Users
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://mern-full-stake-web.onrender.com/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        setUsers(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsersData();
  }, []);

  // ✅ Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://mern-full-stake-web.onrender.com/api/orders/getall");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.orders || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const isToday = (date) => {
    const d = new Date(date);
    const t = new Date();
    return (
      d.getDate() === t.getDate() &&
      d.getMonth() === t.getMonth() &&
      d.getFullYear() === t.getFullYear()
    );
  };

  const totalUsers = users.length;
  const todayUsers = users.filter((u) => isToday(u.createdAt)).length;
  const totalOrders = orders.length;
  const todayOrders = orders.filter((o) => isToday(o.createdAt)).length;
  const totalPayments = orders.reduce(
    (sum, o) => sum + (o.totalAmount || o.total || 0),
    0
  );

  const userOrders = selectedUser
    ? orders.filter(
        (o) => o.userId === selectedUser._id || o.user === selectedUser._id
      )
    : [];

  const totalPaymentByUser = userOrders.reduce(
    (sum, o) => sum + (o.totalAmount || o.total || 0),
    0
  );

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="flex relative font-['Nunito']">
      {/* ✅ Mobile Menu Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-green-600 text-white shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <IoMdClose size={22} /> : <IoMdMenu size={22} />}
      </button>

      {/* ✅ Sidebar */}
      <aside
        className={`bg-white w-64 p-5 border-r shadow-lg h-screen overflow-y-auto fixed top-0 left-0 transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static`}
      >
        <h2 className="text-lg font-bold text-gray-700 mb-4">Users</h2>
        <ul className="space-y-2 font-medium">
          {users.length > 0 ? (
            users.map((u) => (
              <li
                key={u._id}
                onClick={() => {
                  setSelectedUser(u);
                  setSidebarOpen(false);
                }}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition border ${
                  selectedUser?._id === u._id
                    ? "bg-green-600 text-white border-green-600"
                    : "hover:bg-green-100"
                }`}
              >
                <span className="truncate">
                  {u.username ||
                    `${u.addresses?.[0]?.firstName || ""} ${
                      u.addresses?.[0]?.lastName || ""
                    }`}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    selectedUser?._id === u._id
                      ? "bg-white text-green-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {
                    orders.filter(
                      (o) =>
                        (o.userId === u._id || o.user === u._id) &&
                        isToday(o.createdAt)
                    ).length
                  }{" "}
                  New
                </span>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No users found.</p>
          )}
        </ul>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:ml-64">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
            <p className="text-sm text-gray-400">Today Users</p>
            <p className="text-xl font-bold text-gray-700">{todayUsers}</p>
            <p className="text-sm text-gray-500">Total: {totalUsers}</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
            <p className="text-sm text-gray-400">Today Orders</p>
            <p className="text-xl font-bold text-gray-700">{todayOrders}</p>
            <p className="text-sm text-gray-500">Total: {totalOrders}</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
            <p className="text-sm text-gray-400">Payments</p>
            <p className="text-xl font-bold text-gray-700">
              ₹{totalPayments.toLocaleString()}
            </p>
          </div>
        </div>

        {/* ✅ User Details */}
        {selectedUser ? (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b pb-4 mb-4">
              <FaUserCircle className="text-5xl text-green-600" />
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {selectedUser.username ||
                    `${selectedUser.addresses?.[0]?.firstName || ""} ${
                      selectedUser.addresses?.[0]?.lastName || ""
                    }`}
                </h2>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
              </div>
            </div>

            <h3 className="text-md font-semibold text-gray-600 mb-4">Orders</h3>
            {userOrders.length > 0 ? (
              <div className="space-y-4">
                {userOrders.map((o) => (
                  <div
                    key={o._id}
                    className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <p className="text-sm font-bold text-gray-800">
                      Order ID: {o._id}
                    </p>
                    <p className="text-sm text-gray-600">
                      Deliver To: {o.firstName} {o.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment Status: {o.paymentStatus}
                    </p>
                    <p className="text-sm text-gray-600">Price: ₹{o.total}</p>
                    <p className="text-sm text-gray-600">
                      Status: {o.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment: {o.paymentMethod || "N/A"}
                    </p>

                    {/* Items */}
                    <div className="mt-3 space-y-2">
                      {o.items?.length > 0 ? (
                        o.items.map((i) => (
                          <div
                            key={i._id}
                            className="flex items-center gap-3 p-2 border rounded-lg bg-white shadow-sm"
                          >
                            <img
                              src={i.item.imageUrl}
                              alt={i.item.name}
                              className="w-14 h-14 rounded object-cover border"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">
                                {i.item.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ₹{i.item.price} × {i.quantity}
                              </p>
                              <p className="text-xs font-semibold text-gray-700">
                                Subtotal: ₹{i.item.price * i.quantity}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-400">No items</p>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                <div className="p-3 bg-green-100 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700">
                    Total Payment by User: ₹{totalPaymentByUser}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No orders found.</p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-40 bg-white/50 rounded-xl border-2 border-dashed">
            <p className="text-gray-500 font-medium text-center px-4">
              Select a user from the sidebar to view details
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDisplay;
