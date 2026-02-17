// import React, { useState, useEffect } from 'react';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import {
//   FiHome,
//   FiBook,
//   FiStar,
//   FiPhone,
//   FiShoppingCart,
//   FiLogOut,
//   FiKey,
//   FiPackage,
 
// } from 'react-icons/fi';
// import { BiSolidDish } from "react-icons/bi";
// import { FaBagShopping } from "react-icons/fa6";
// import { FaHome } from "react-icons/fa";

// import Login from '../Login/Login';
// import { useCart } from '../../CartContext/CartContext';
// import logo from "../../assets/logo.png";

// const Navbar = () => {
//   const { totalItems } = useCart();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [isAuthenticated, setIsAuthenticated] = useState(
//     Boolean(localStorage.getItem('loginData'))
//   );
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   useEffect(() => {
//     setShowLoginModal(location.pathname === '/login');
//     setIsAuthenticated(Boolean(localStorage.getItem('loginData')));
//   }, [location.pathname]);

//   const navLinks = [
//     { name: 'Home', href: '/', icon: <FiHome /> },
//     { name: 'Menu', href: '/menu', icon: <FiBook /> },
//     { name: 'About', href: '/about', icon: <FiStar /> },
//     { name: 'Contact', href: '/contact', icon: <FiPhone /> },
//     ...(isAuthenticated ? [
//       { name: 'My Orders', href: '/myorder', icon: <FiPackage /> }
//     ] : [])
//   ];

//   const handleLoginSuccess = () => {
//     localStorage.setItem('loginData', JSON.stringify({ loggedIn: true }));
//     setIsAuthenticated(true);
//     navigate('/');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('loginData');
//     setIsAuthenticated(false);
//   };

//   return (
//     <>
//       {/* Floating Bottom Navbar */}
//       <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-red-200 
//                       rounded-full bottom-4 left-1/2 dark:bg-white dark:border-[#e6002b]">
//         <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
//           {/* Home */}
//           <NavLink 
//             to="/" 
//             className={({ isActive }) =>
//               `inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group 
//               ${isActive ? 'text-[#e6002b]' : 'text-gray-500'}`
//             }
//           >
//             <FaHome className="w-7 h-7" />
//             <span className="sr-only">Home</span>
//           </NavLink>

//           {/* Menu */}
//           <NavLink 
//             to="/menu" 
//             className={({ isActive }) =>
//               `inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group 
//               ${isActive ? 'text-[#e6002b]' : 'text-gray-500'}`
//             }
//           >
//             <BiSolidDish className="w-9 h-9 mb-1" />
//             <span className="sr-only">Menu</span>
//           </NavLink>

//           {/* Cart Button */}
//           <div className="flex items-center justify-center">
//             <NavLink 
//               to="/cart" 
//               className="inline-flex items-center justify-center w-10 h-10 font-medium bg-[#e6002b] rounded-full hover:bg-gray-700 relative"
//             >
//               <FiShoppingCart className="w-5 h-5 text-white" />
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-white w-6 h-6 rounded-full border-1 border-[#e6002b] text-xl
//                                 flex items-center justify-center text-gray-500 ">
//                   {totalItems}
//                 </span>
//               )}
//               <span className="sr-only">Cart</span>
//             </NavLink>
//           </div>

//           {/* MyOrder */}
//           <NavLink 
//             to="/myorder" 
//             className={({ isActive }) =>
//               `inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group 
//               ${isActive ? 'text-[#e6002b]' : 'text-gray-500'}`
//             }
//           >
//             <FaBagShopping className="w-7 h-7 mb-1 " />
//             <span className="sr-only">My Order</span>
//           </NavLink>

//           {/* Auth / Profile */}
//           {isAuthenticated ? (
//             <button
//               onClick={handleLogout}
//               className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group text-gray-500 hover:text-blue-600"
//             >
//               <FiLogOut className="w-7 h-7  mb-1" />
//               <span className="sr-only">Logout</span>
//             </button>
//           ) : (
//             <button
//               onClick={() => navigate('/login')}
//               className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group text-gray-500 hover:text-blue-600"
//             >
//               <FiKey className="w-7 h-7 mb-1" />
//               <span className="sr-only">Login</span>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//           <div className="backdrop-blur-sm bg-gradient-to-br from-gray-100/80 to-transperent rounded-2xl p-8 w-full max-w-md relative border-4 border-gray-100">
//             <button
//               onClick={() => navigate('/')}
//               className="absolute top-4 right-4 text-white hover:text-yellow-200 text-2xl"
//             >
//               &times;
//             </button>
//             <h2 className="text-3xl font-bold text-white bg-clip-text mb-6 text-center">
//               Annapurna Dhaba
//             </h2>
//             <Login onLoginSuccess={handleLoginSuccess} onClose={() => navigate('/')} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiBook,
  FiStar,
  FiPhone,
  FiShoppingCart,
  FiLogOut,
  FiKey,
  FiPackage,
} from 'react-icons/fi';
import { BiSolidDish } from "react-icons/bi";
import { FaBagShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

import Login from '../Login/Login';
import { useCart } from '../../CartContext/CartContext';
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('loginData'))
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    setShowLoginModal(location.pathname === '/login');
    setIsAuthenticated(Boolean(localStorage.getItem('loginData')));
  }, [location.pathname]);

  const handleLoginSuccess = () => {
    localStorage.setItem('loginData', JSON.stringify({ loggedIn: true }));
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true); // show confirmation popup
  };

  const confirmLogout = () => {
    localStorage.removeItem('loginData');
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('UserId');
    setIsAuthenticated(false);
    setShowLogoutConfirm(false);
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      {/* Floating Bottom Navbar */}
      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-red-200 
                      rounded-full bottom-4 left-1/2 dark:bg-white dark:border-[#e6002b]">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          {/* Home */}
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              `inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group 
              ${isActive ? 'text-[#e6002b]' : 'text-gray-500'}`
            }
          >
            <FaHome className="w-7 h-7" />
            <span className="sr-only">Home</span>
          </NavLink>

          {/* Menu */}
          <NavLink 
            to="/menu" 
            className={({ isActive }) =>
              `inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group 
              ${isActive ? 'text-[#e6002b]' : 'text-gray-500'}`
            }
          >
            <BiSolidDish className="w-9 h-9 mb-1" />
            <span className="sr-only">Menu</span>
          </NavLink>

          {/* Cart Button */}
          <div className="flex items-center justify-center">
            <NavLink 
              to="/cart" 
              className="inline-flex items-center justify-center w-10 h-10 font-medium bg-[#e6002b] rounded-full hover:bg-gray-700 relative"
            >
              <FiShoppingCart className="w-5 h-5 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white w-6 h-6 rounded-full border-1 border-[#e6002b] text-xl
                                flex items-center justify-center text-gray-500 ">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </NavLink>
          </div>

          {/* MyOrder */}
          <NavLink 
            to="/myorder" 
            className={({ isActive }) =>
              `inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group 
              ${isActive ? 'text-[#e6002b]' : 'text-gray-500'}`
            }
          >
            <FaBagShopping className="w-7 h-7 mb-1 " />
            <span className="sr-only">My Order</span>
          </NavLink>

          {/* Auth / Logout */}
          {isAuthenticated ? (
            <button
              onClick={handleLogoutClick}
              className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group text-gray-500 hover:text-blue-600"
            >
              <FiLogOut className="w-7 h-7 mb-1" />
              <span className="sr-only">Logout</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group text-gray-500 hover:text-blue-600"
            >
              <FiKey className="w-7 h-7 mb-1" />
              <span className="sr-only">Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-sm bg-gradient-to-br from-gray-100/80 to-transperent rounded-2xl p-8 w-full max-w-md relative border-4 border-gray-100">
            <button
              onClick={() => navigate('/')}
              className="absolute top-4 right-4 text-white hover:text-yellow-200 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-white bg-clip-text mb-6 text-center">
              Annapurna Dhaba
            </h2>
            <Login onLoginSuccess={handleLoginSuccess} onClose={() => navigate('/')} />
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to logout?</p>
            <div className="flex justify-around">
              <button
                onClick={confirmLogout}
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
              >
                Logout
              </button>
              <button
                onClick={cancelLogout}
                className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
