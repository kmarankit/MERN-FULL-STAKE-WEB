// import React, { useState } from 'react';
// import { useCart } from '../../CartContext/CartContext';
// import { Link } from 'react-router-dom';
// import { FaMinus, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../../components/Navbar/Navbar'

// // Import the video
// import cartVideo from '../../assets/cart video.mp4';

// const API_URL = 'http://localhost:4000';
// const ArrowLeftIcon = () => (
//     <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
//     </svg>
    
// );
// const CartPage = () => {
//   const { cartItems, removeFromCart, updateQuantity } = useCart();
//   const [selectedImage, setSelectedImage] = useState(null);
//  const navigate = useNavigate();

//   const buildImageUrl = (path) => {
//     if (!path) return '';
//     return path.startsWith('http')
//       ? path
//       : `${API_URL}/uploads/${path.replace(/^\/uploads\//, '')}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <button
//                     onClick={() => navigate(-1)}
//                     className="absolute top-4 left-4 z-10 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
//                     aria-label="Go back"
//                 >
//                     <ArrowLeftIcon />
//                 </button>
//         <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
//           Your Cart
//         </h1>

//         {cartItems.length === 0 ? (
          
//           <div className="text-center">
//               <Navbar/>
//             <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
//             <Link
//               to="/menu"
//               className="px-6 py-2 border border-gray-400 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
//             >
//               Browse Menu
//             </Link>
//           </div>
//         ) : (
//           <>
//             {/* Cart Items */}
//             <div className="bg-white rounded-xl shadow-md divide-y divide-gray-200 uppercase">
//               {cartItems
//                 .filter((ci) => ci.item)
//                 .map(({ _id, item, quantity }) => (
//                   <div
//                     key={_id}
//                     className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
//                   >
//                     {/* Image */}
//                     <div
//                       className="w-20 h-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border border-gray-200"
//                       onClick={() =>
//                         setSelectedImage(buildImageUrl(item.imageUrl || item.image))
//                       }
//                     >
//                       <img
//                         src={buildImageUrl(item?.imageUrl || item?.image)}
//                         alt={item?.name || 'Item'}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     {/* Info */}
//                     <div className="flex-1 ml-4">
//                       <h3 className="text-gray-800 font-semibold text-lg">
//                         {item.name}
//                       </h3>
//                       <p className="text-gray-600 text-sm mt-1">
//                         ₹{Number(item.price).toFixed(2)}
//                       </p>
//                     </div>

//                     {/* Quantity */}
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => updateQuantity(_id, Math.max(1, quantity - 1))}
//                         className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200"
//                       >
//                         <FaMinus className="w-3 h-3" />
//                       </button>
//                       <span className="w-6 text-center text-gray-800">{quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(_id, quantity + 1)}
//                         className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200"
//                       >
//                         <FaPlus className="w-3 h-3" />
//                       </button>
//                     </div>

//                     {/* Price + Remove */}
//                     <div className="flex flex-col items-end ml-4">
//                       <p className="text-gray-800 font-semibold">
//                         ₹{(Number(item.price) * quantity).toFixed(2)}
//                       </p>
//                       <button
//                         onClick={() => removeFromCart(_id)}
//                         className="mt-2 text-red-500 text-sm flex items-center gap-1 hover:text-red-600"
//                       >
//                         <FaTrash className="w-4 h-4" />
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//             </div>

//             {/* Mobile Only Video */}
//            {/* Mobile Only Video */}
//           <div className="mt-6 block sm:hidden flex justify-center">
//             <video
//               src={cartVideo}
//               autoPlay
//               loop
//               muted
//               playsInline
//               className="w-80 h-80 rounded-2xl shadow-2xl object-cover"
//             />
//           </div>

//             {/* Bottom bar */}
//             <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg p-4 flex justify-between items-center">
//               <Link
//                 to="/menu"
//                 className=" px-4 py-2 border border-gray-400 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
//               >
//                 Continue Shopping
//               </Link>
//               <Link
//                 to="/address"
//                 className="bg-[#e6002b] px-6 py-2 rounded-lg text-white font-medium hover:bg-green-700 transition"
//               >
//                 Proceed to Address
//               </Link>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Fullscreen Image Viewer */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div className="relative max-w-full max-h-full">
//             <img
//               src={selectedImage}
//               alt="Full view"
//               className="max-w-[90vw] max-h-[90vh] rounded-lg object-contain"
//             />
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute top-2 right-2 bg-white rounded-full p-2 text-gray-700 hover:bg-gray-200 transition"
//             >
//               <FaTimes className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;


import React, { useState } from 'react';
import { useCart } from '../../CartContext/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import cartVideo from '../../assets/cart video.mp4';
import { apiUrl } from '../../config/api';

const API_URL = apiUrl();

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const buildImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `${API_URL}/uploads/${path.replace(/^\/uploads\//, '')}`;
  };

  if (!cartItems) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          &#8592;
        </button>

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <Navbar />
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <Link
              to="/menu"
              className="px-6 py-2 border border-gray-400 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-md divide-y divide-gray-200 uppercase">
              {cartItems
                .filter((ci) => ci.item)
                .map(({ _id, item, quantity }) => (
                  <div key={_id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
                    <div
                      className="w-20 h-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border border-gray-200"
                      onClick={() => setSelectedImage(buildImageUrl(item.imageUrl || item.image))}
                    >
                      <img
                        src={buildImageUrl(item?.imageUrl || item?.image)}
                        alt={item?.name || 'Item'}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 ml-4">
                      <h3 className="text-gray-800 font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">₹{Number(item.price).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(_id, Math.max(1, quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200"
                      >
                        <FaMinus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-gray-800">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(_id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200"
                      >
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex flex-col items-end ml-4">
                      <p className="text-gray-800 font-semibold">₹{(Number(item.price) * quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(_id)}
                        className="mt-2 text-red-500 text-sm flex items-center gap-1 hover:text-red-600"
                      >
                        <FaTrash className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6 block sm:hidden flex justify-center">
              <video
                src={cartVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-80 h-80 rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </>
        )}

       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg p-4 flex justify-between items-center">
              <Link
                to="/menu"
                className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
              >
                Continue Shopping
              </Link>
              <Link
                to="/address"
                className="bg-[#e6002b] px-6 py-2 rounded-lg text-white font-medium hover:bg-green-700 transition"
              >
                Proceed to Address
              </Link>
            </div>
      </div>
    </div>
  );
};

export default CartPage;
