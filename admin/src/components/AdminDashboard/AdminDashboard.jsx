// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// import { BsCashCoin } from "react-icons/bs";
// import { IoBagCheckOutline } from "react-icons/io5";
// import { FaUserClock } from "react-icons/fa";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { IoApps } from "react-icons/io5";
// import { FaUserCheck } from "react-icons/fa";
// import Visitors from "./Visitors.jsx";
// import { Link } from "react-router-dom";
// // ✅ Chart options
// const chartOptions = {
//   chart: {
//     type: "area",
//     toolbar: { show: false },
//     fontFamily: "Inter, sans-serif",
//   },
//   tooltip: { enabled: true },
//   legend: { show: false },
//   fill: {
//     type: "gradient",
//     gradient: { opacityFrom: 0.55, opacityTo: 0 },
//   },
//   dataLabels: { enabled: false },
//   stroke: { width: 3 },
//   grid: { show: false },
//   xaxis: {
//     categories: ["01 Feb", "02 Feb", "03 Feb", "04 Feb", "05 Feb", "06 Feb", "07 Feb"],
//     labels: { show: true },
//     axisBorder: { show: false },
//     axisTicks: { show: false },
//   },
//   yaxis: { show: false },
// };

// const chartSeries = [
//   { name: "Developer Edition", data: [1500, 1418, 1456, 1526, 1356, 1256], color: "#1A56DB" },
//   { name: "Designer Edition", data: [643, 413, 765, 412, 1423, 1731], color: "#7E3BF2" },
// ];

// const AdminDisplay = () => {
//   const [visitors, setVisitors] = useState([]);
//   const [Orders, setOrders] = useState([]);
//   const [Users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ sidebar toggle

//   // ✅ Fetch Users
//   useEffect(() => {
//     const fetchUsersData = async () => {
//       try {
//         setIsLoading(true);
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

//   // ✅ Fetch Orders
//   useEffect(() => {
//     const fetchOrderData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch("http://localhost:4000/api/orders/getall", {
//           headers: { "Content-Type": "application/json" },
//         });
//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         const data = await response.json();
//         setOrders(data.orders || data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchOrderData();
//   }, []);

//   // ✅ Fetch Visitors
//   useEffect(() => {
//     const fetchVisitorsData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch("http://localhost:4000/api/visitors");
//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         const data = await response.json();
//         setVisitors(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchVisitorsData();
//   }, []);

//   // ✅ Helpers
//   const isToday = (date) => {
//     const d = new Date(date);
//     const today = new Date();
//     return (
//       d.getDate() === today.getDate() &&
//       d.getMonth() === today.getMonth() &&
//       d.getFullYear() === today.getFullYear()
//     );
//   };

//   // Stats
//   const totalVisitors = visitors.length;
//   const todayVisitors = visitors.filter((v) => isToday(v.createdAt)).length;
//   const totalUsers = Users.length;
//   const todayUsers = Users.filter((u) => isToday(u.createdAt)).length;
//   const totalOrders = Orders.length;
//   const todayOrders = Orders.filter((o) => isToday(o.createdAt)).length;
//   const totalPayments = Orders.reduce((sum, order) => sum + (order.total || 0), 0);

//   if (isLoading) return <div className="p-6">Loading data...</div>;
//   if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

//   return (
//     <div className="flex">
//       {/* ✅ Sidebar */}
//       {/* ✅ Sidebar */}
// <aside
//   className={`fixed top-0 left-0 z-40 h-screen bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out ${
//     isSidebarOpen ? "w-56" : "w-16"
//   }`}
// >
//   <div className="relative h-full flex flex-col">
//     {/* Toggle button */}
//     <button
//       onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       className="absolute -right-4 top-6 bg-white border rounded-full shadow p-1 hover:bg-gray-100 transition"
//     >
//       {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
//     </button>

//     <ul className="mt-16 space-y-2 font-medium flex-1">
//       {/* Dashboard */}
//       <li>
//         <a
//           href="#"
//           className="flex items-center justify-center md:justify-start p-2 text-gray-900 rounded-lg hover:bg-gray-100"
//         >
//           <IoApps  className="text-xl text-gray-500" />
//           {isSidebarOpen && <span className="ms-3">Dashboard</span>}
//         </a>
//       </li>

//       {/* Visitors */}
//      <li>
//   <Link
//     to="/visitors"
//     className="flex items-center justify-center md:justify-start p-2 text-gray-900 rounded-lg hover:bg-gray-100"
//   >
//     <FaUserClock className="text-xl text-gray-500" />
//     {isSidebarOpen && <span className="flex-1 ms-3">Visitors</span>}
//     <span
//       className={`px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full ${
//         !isSidebarOpen && "hidden"
//       }`}
//     >
//       {todayVisitors}
//     </span>
//   </Link>
// </li>

//       {/* Users */}
//       <li>
//         <a
//           href="#"
//           className="flex items-center justify-center md:justify-start p-2 text-gray-900 rounded-lg hover:bg-gray-100"
//         >
//           <FaUserCheck className="text-xl text-gray-500" />
//           {isSidebarOpen && <span className="flex-1 ms-3">Users</span>}
//           <span
//             className={`px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full ${
//               !isSidebarOpen && "hidden"
//             }`}
//           >
//             {todayUsers}
//           </span>
//         </a>
//       </li>

//       {/* Orders */}
//       <li>
//         <a
//           href="#"
//           className="flex items-center justify-center md:justify-start p-2 text-gray-900 rounded-lg hover:bg-gray-100"
//         >
//           <IoBagCheckOutline className="text-xl text-gray-500" />
//           {isSidebarOpen && <span className="flex-1 ms-3">Orders</span>}
//           <span
//             className={`px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full ${
//               !isSidebarOpen && "hidden"
//             }`}
//           >
//             {todayOrders}
//           </span>
//         </a>
//       </li>

//       {/* Payments */}
//       <li>
//         <a
//           href="#"
//           className="flex items-center justify-center md:justify-start p-2 text-gray-900 rounded-lg hover:bg-gray-100"
//         >
//           <BsCashCoin className="text-xl text-gray-500" />
//           {isSidebarOpen && <span className="flex-1 ms-3">Payments</span>}
//         </a>
//       </li>
//     </ul>
//   </div>
// </aside>


//       {/* ✅ Main Content */}
//       <main className={`flex-1 p-6 font-['Nunito'] transition-all duration-300 ${isSidebarOpen ? "ml-56" : "ml-16"}`}>
//         {/* Stats */}
//         <div className="grid grid-cols-4 gap-4 mb-6">
//           <div className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
//             <p className="text-sm text-gray-400">Today Visitors</p>
//             <p className="text-lg font-bold text-gray-700">{todayVisitors}</p>
//             <p className="text-sm text-gray-500">Total: {totalVisitors}</p>
//           </div>
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
//             <p className="text-lg font-bold text-gray-700">₹{Orders.total}</p>
//             <p className="text-sm font-bold text-green-500">Total: {totalPayments}</p>
//           </div>
//         </div>

//         {/* Chart */}
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h5 className="text-3xl font-bold text-gray-900">₹12,423</h5>
//               <p className="text-gray-500">Sales this week</p>
//             </div>
//             <div className="text-green-600 font-semibold">+23%</div>
//           </div>
//           <Chart options={chartOptions} series={chartSeries} type="area" height={300} />
//         </div>

//         {/* Visitor Data */}
//         <h1 className="text-2xl font-bold mb-4">Visitor Data</h1>
//         {visitors.length > 0 ? (
//           visitors.map((visitor) => (
//             <div key={visitor.visitorId} className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
//               <h2 className="font-semibold">Visitor ID: {visitor.visitorId}</h2>
//               <p>First Seen: {new Date(visitor.createdAt).toLocaleString()}</p>
//               <h3 className="mt-2 font-medium">Sessions ({visitor.sessions.length}):</h3>
//               {visitor.sessions.length > 0 ? (
//                 <ul className="pl-4">
//                   {visitor.sessions.map((session, i) => (
//                     <li key={i} className="border-t border-gray-100 mt-2 pt-2">
//                       <p><strong>Start:</strong> {session.sessionStartTime}</p>
//                       <p><strong>End:</strong> {session.sessionEndTime}</p>
//                       <p><strong>Duration:</strong> {session.sessionDurationSeconds / 60} Min</p>
//                       <p><strong>Location:</strong> {session.locationName || "N/A"}</p>
//                       <p><strong>IP:</strong> {session.ipAddress}</p>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No recorded sessions.</p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No visitor data found.</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDisplay;


import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoApps } from "react-icons/io5";
import { FaUserClock, FaUserCheck } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import { Outlet, Link } from "react-router-dom";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      {/* ✅ Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-56" : "w-16"
        }`}
      >
        <div className="relative h-full flex flex-col">
          {/* Toggle button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -right-4 top-6 bg-white border rounded-full shadow p-1 hover:bg-gray-100 transition"
          >
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>

          {/* Navigation */}
          <ul className="mt-16 space-y-2 font-medium flex-1">
            <li>
              <Link
                to="/"
                className="flex items-center justify-center md:justify-start p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <IoApps className="text-xl text-gray-500" />
                {isSidebarOpen && <span className="ms-3">Dashboard</span>}
              </Link>
            </li>

            <li>
              <Link
                to="visitors"
                className="flex items-center justify-center md:justify-start p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <FaUserClock className="text-xl text-gray-500" />
                {isSidebarOpen && <span className="flex-1 ms-3">Visitors</span>}
              </Link>
            </li>

            <li>
              <Link
                to="user"
                className="flex items-center justify-center md:justify-start p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <FaUserCheck className="text-xl text-gray-500" />
                {isSidebarOpen && <span className="flex-1 ms-3">Users</span>}
              </Link>
            </li>

            <li>
              <Link
                to="orders"
                className="flex items-center justify-center md:justify-start p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <IoBagCheckOutline className="text-xl text-gray-500" />
                {isSidebarOpen && <span className="flex-1 ms-3">Orders</span>}
              </Link>
            </li>

            <li>
              <Link
                to="payments"
                className="flex items-center justify-center md:justify-start p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <BsCashCoin className="text-xl text-gray-500" />
                {isSidebarOpen && <span className="flex-1 ms-3">Payments</span>}
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* ✅ Main Content */}
      <main
        className={`flex-1 p-6 font-['Nunito'] transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-16"
        }`}
      >
        {/* Here child components will load */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
