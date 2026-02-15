// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaStar, FaHeart, FaPlus } from 'react-icons/fa';
// import { HiMinus, HiPlus } from 'react-icons/hi';
// import { useCart } from '../../CartContext/CartContext';
// import FloatingParticle from '../FloatingParticle/FloatingParticle';
// import './SpecialOffer.css';

// const SpecialOffer = () => {
//   const [items, setItems] = useState([]);
//   const { addToCart, updateQuantity, removeFromCart, cartItems: rawCart } = useCart();

//   const cartItems = rawCart.filter(ci => ci.item);

//   useEffect(() => {
//     axios
// .get('http://localhost:4000/api/items/category/Dhaba%20Speciel')      .then(res => setItems(res.data.items ?? res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="bg-gradient-to-tl from-[#fff5f5] to-[#fff] backdrop-blur-2xl text-white py-5 overflow-hidden font-['Nunito'] mb-15">
//       <div className="max-w-7xl mx-auto px-3">
//         {/* Header */}
//         <div className="text-center mb-1">
//           <h1 className="text-4xl sm:text-5xl font-extrabold bg-[#e6002b] bg-clip-text text-transparent tracking-tight font-['Nunito']">
//             Dhaba Ki Shaan
//           </h1>
//           <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light font-['Nunito']">
//             Jharkhand ki Pehchan
//           </p>
//         </div>

//         {/* Horizontal Scrollable Slider */}
//         <div className="flex flex-row gap-8 p-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide font-['Nunito']">
//           {items.map(item => {
//             const cartItem = cartItems.find(ci => ci.item?._id === item._id);
//             const qty = cartItem?.quantity ?? 0;
//             const cartId = cartItem?._id;

//             return (
//               <div
//                 key={item._id}
//                 className="card-container relative min-w-[280px] sm:min-w-[320px]  rounded-tb-4xl overflow-hidden snap-center font-['Nunito']"
//               >
//                 {/* Glassmorphism Card */}
//                 <div className="card-glassmorphism relative h-full w-full p-1.5 rounded-3xl transition-all duration-500 hover:rotate-2 hover:scale-[1.02] border-2 border-[#e6002b]">
//                   <div className="inner-card flex flex-col h-full bg-gray-50 backdrop-blur-md rounded-[1.2rem] overflow-hidden">
//                     {/* Image */}
//                     <div className="relative h-48 overflow-hidden rounded-t-[1.2rem]">
//                       <img
//                         src={item.imageUrl}
//                         alt={item.name}
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                       />
//                       <div className="absolute inset-0 to-transparent" />

//                       {/* Stats */}
//                       <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-sm font-bold font-['Nunito']">
//                         <span className="flex items-center gap-1.5 text-yellow-400 bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
//                           <FaStar className="w-3 h-3" /> {item.rating}
//                         </span>
//                         <span className="flex items-center gap-1.5 text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
//                           <FaHeart className="w-3 h-3" /> {item.hearts}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Content & Cart Controls */}
//                     <div className="p-5 flex flex-col flex-grow bg-gray-100 font-['Nunito']">
//                       <h3 className="text-xl sm:text-2xl font-bold mb-1 bg-gray-700 bg-clip-text text-transparent font-['Nunito']">
//                         {item.name}
//                       </h3>
//                       <p className="w-full text-gray-700 mb-4 text-sm flex-grow font-['Nunito']">
//                         {item.description}
//                       </p>

//                       <div className="flex items-center justify-between gap-4 mt-auto font-['Nunito']">
//                         <span className="text-2xl font-bold text-gray-900">
//                           ₹{Number(item.price).toFixed(2)}
//                         </span>
//                         {qty > 0 ? (
//                           <div className="flex items-center gap-2 bg-white rounded-full px-1.5 py-1">
//                             <button
//                               onClick={() =>
//                                 qty > 1
//                                   ? updateQuantity(cartId, qty - 1)
//                                   : removeFromCart(cartId)
//                               }
//                               className="w-7 h-7 rounded-full bg-[#e6002b] flex items-center justify-center transition-colors duration-300 hover:bg-yellow-800"
//                             >
//                               <HiMinus className="w-4 h-4 text-white" />
//                             </button>
//                             <span className="w-6 text-center text-gray-800 font-bold text-base font-['Nunito']">
//                               {qty}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(cartId, qty + 1)}
//                               className="w-7 h-7 rounded-full bg-[#e6002b] flex items-center justify-center transition-colors duration-300 hover:bg-yellow-800"
//                             >
//                               <HiPlus className="w-4 h-4 text-white" />
//                             </button>
//                           </div>
//                         ) : (
//                           <button
//                             onClick={() => addToCart(item, 1)}
//                             className="flex items-center gap-2 bg-[#e6002b] text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:from-red-700 hover:to-orange-600 shadow-lg hover:shadow-xl"
//                           >
//                             <FaPlus />
//                             <span>Add</span>
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <FloatingParticle className="opacity-0 group-hover:opacity-100 absolute inset-0 pointer-events-none" />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpecialOffer;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { useCart } from '../../CartContext/CartContext';
import { useCart } from '../../CartContext/CartContext';

// --- Inline SVG Icons ---
const FaStar = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
    </svg>
);
const FaHeart = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
    </svg>
);
const FaPlus = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
    </svg>
);
const HiMinus = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"></path>
    </svg>
);
const HiPlus = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
    </svg>
);

const SpecialOffer = () => {
    const [items, setItems] = useState([]);
    const { addToCart, updateQuantity, removeFromCart, cartItems: rawCart } = useCart();

    const cartItems = rawCart.filter(ci => ci.item);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/items/category/Dhaba%20Special')
            .then(res => setItems(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleCartClick = (e, action) => {
        e.stopPropagation();
        e.preventDefault();
        action();
    };

    return (
        <>
            {/* CSS to hide the scrollbar */}
            <style>
                {`
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .hide-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}
            </style>
            <div className="bg-gradient-to-tl from-[#fff5f5] to-[#fff] backdrop-blur-2xl py-5 overflow-hidden font-['Nunito'] mb-15">
                <div className="max-w-7xl mx-auto px-3">
                    {/* Header */}
                    <div className="text-center mb-1">
                        <h1 className="text-4xl sm:text-5xl font-extrabold bg-[#e6002b] bg-clip-text text-transparent tracking-tight">
                            Dhaba Ki Shaan
                        </h1>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                            Jharkhand ki Pehchan
                        </p>
                    </div>

                    {/* Horizontal Scrollable Slider with hidden scrollbar */}
                    <div className="flex flex-row gap-8 p-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory hide-scrollbar">
                        {items.map(item => {
                            const cartItem = cartItems.find(ci => ci.item?._id === item._id);
                            const qty = cartItem?.quantity ?? 0;
                            const cartId = cartItem?._id;

                            return (
                                <Link
                                    to={`/items/${item._id}`}
                                    key={item._id}
                                    className="card-container group relative min-w-[280px] sm:min-w-[320px] rounded-tb-4xl overflow-hidden snap-center block"
                                >
                                    <div className="card-glassmorphism relative h-full w-full p-1.5 rounded-3xl transition-all duration-500 group-hover:rotate-2 group-hover:scale-[1.02] border-2 border-[#e6002b]">
                                        <div className="inner-card flex flex-col h-full bg-gray-50 backdrop-blur-md rounded-[1.2rem] overflow-hidden">
                                            <div className="relative h-48 overflow-hidden rounded-t-[1.2rem]">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 to-transparent" />
                                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-sm font-bold">
                                                    <span className="flex items-center gap-1.5 text-yellow-400 bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
                                                        <FaStar /> {item.rating}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
                                                        <FaHeart /> {item.hearts || '2k+'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-5 flex flex-col flex-grow bg-gray-100">
                                                <h3 className="text-xl sm:text-2xl font-bold mb-1 text-gray-800">
                                                    {item.name}
                                                </h3>
                                                <p className="w-full text-gray-600 mb-4 text-sm flex-grow">
                                                    {item.description}
                                                </p>
                                                <div className="flex items-center justify-between gap-4 mt-auto">
                                                    <span className="text-2xl font-bold text-gray-900">
                                                        ₹{Number(item.price).toFixed(2)}
                                                    </span>
                                                    {qty > 0 ? (
                                                        <div className="flex items-center gap-2 bg-white rounded-full px-1.5 py-1 z-10 relative">
                                                            <button
                                                                onClick={(e) => handleCartClick(e, () => qty > 1 ? updateQuantity(cartId, qty - 1) : removeFromCart(cartId))}
                                                                className="w-7 h-7 rounded-full bg-[#e6002b] flex items-center justify-center text-white transition-colors duration-300 hover:bg-red-700"
                                                            >
                                                                <HiMinus />
                                                            </button>
                                                            <span className="w-6 text-center text-gray-800 font-bold text-base">
                                                                {qty}
                                                            </span>
                                                            <button
                                                                onClick={(e) => handleCartClick(e, () => updateQuantity(cartId, qty + 1))}
                                                                className="w-7 h-7 rounded-full bg-[#e6002b] flex items-center justify-center text-white transition-colors duration-300 hover:bg-red-700"
                                                            >
                                                                <HiPlus />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={(e) => handleCartClick(e, () => addToCart(item, 1))}
                                                            className="flex items-center gap-2 bg-[#e6002b] text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:bg-red-700 shadow-lg hover:shadow-xl z-10 relative"
                                                        >
                                                            <FaPlus />
                                                            <span>Add</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpecialOffer;

