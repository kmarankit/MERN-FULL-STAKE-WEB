import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
import { FaMinus, FaPlus } from 'react-icons/fa';
import './Om.css';
import { apiUrl } from '../../config/api';
import Indo from '../../assets/Indo-Chiness.png';
import Paratha from '../../assets/Paratha2.png';
import Biryani from '../../assets/Biryani.png';
import MainCource from '../../assets/_shahi paneer.png';
import Dhaba from '../../assets/pitha mutton.jpg';

const categories = [
    { name: 'Indo-Chinese', imageUrl: Indo },
    { name: 'Roti & Paratha', imageUrl: Paratha },
    { name: 'Biryani & Rice', imageUrl: Biryani },
    { name: 'Curries', imageUrl: MainCource },
    { name: 'Dhaba Special', imageUrl: Dhaba },
];

// ✨ 1. NEW: Reusable Skeleton component for a clean loading state
const MenuItemSkeleton = () => (
    <div className="bg-gray-100 rounded-3xl p-3 border-2 border-gray-300 flex items-start gap-4 animate-pulse">
        <div className="flex-1 space-y-3">
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        </div>
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className="w-32 h-24 bg-gray-300 rounded-2xl"></div>
            <div className="w-24 h-8 bg-gray-300 rounded-md -mt-6"></div>
        </div>
    </div>
);


const OurMenu = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0].name);
    const [menuData, setMenuData] = useState({});
    const [foodTypeFilter, setFoodTypeFilter] = useState('all');

    // ✨ 2. ADD a loading state, initially true
    const [isLoading, setIsLoading] = useState(true);

    const { cartItems: rawCart, addToCart, updateQuantity, removeFromCart } = useCart();
    const cartItems = rawCart.filter(ci => ci.item);

    useEffect(() => {
        setIsLoading(true); // Start loading

        axios.get(apiUrl('/api/items'))
            .then(res => {
                const grouped = res.data.reduce((acc, item) => {
                    acc[item.category] = acc[item.category] || [];
                    acc[item.category].push(item);
                    return acc;
                }, {});
                setMenuData(grouped);
            })
            .catch(console.error)
            .finally(() => {
                // ✨ 3. SET loading to false after the fetch is complete
                setIsLoading(false);
            });
    }, []);

    const getCartEntry = id => cartItems.find(ci => ci.item?._id === id);
    const getQuantity = id => getCartEntry(id)?.quantity ?? 0;

    const displayItems = (menuData[activeCategory] || [])
        .filter(item => {
            if (foodTypeFilter === 'veg') return item.isVeg === true;
            if (foodTypeFilter === 'non-veg') return item.isVeg === false;
            return true;
        });

    return (
        <div className="bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-['Nunito']">
            <div className="max-w-7xl mx-auto">
            
                {/* Category carousel remains the same */}
                <div className="flex overflow-x-scroll no-scrollbar py-2 gap-2 mb-5 md:grid md:grid-cols-6 bg-white">
                    {categories.map((cat) => (
                        <div
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`flex-shrink-0 flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out ${activeCategory === cat.name ? 'transform scale-105' : 'hover:scale-100'}`}
                        >
                            <div className={`w-30 h-30 sm:w-40 sm:h-40 rounded-full border-4 bg-white ${activeCategory === cat.name ? 'border-[#e6002b] shadow-lg shadow-amber-800/50' : 'border-gray-200'} overflow-hidden transition-all duration-300`}>
                                <img
                                    src={cat.imageUrl}
                                    alt={cat.name}
                                    className={`w-full h-full object-cover transition duration-300 ${activeCategory === cat.name ? 'opacity-100' : 'opacity-60'}`}
                                />
                            </div>
                            <p className={`mt-2 text-center font-medium px-1 bg-white rounded-2xl ${activeCategory === cat.name ? 'text-[#e6002b] font-bold' : 'text-gray-600'}`}>
                                {cat.name}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Filter toggle remains the same */}
                <div className="flex justify-center mb-6 px-4">
                    <div className="relative flex w-64 items-center rounded-full bg-gray-100 p-1 shadow-inner">
                        <div
                            className="absolute h-full w-1/3 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"
                            style={{ transform: foodTypeFilter === 'all' ? 'translateX(0%)' : foodTypeFilter === 'veg' ? 'translateX(100%)' : 'translateX(200%)' }}
                        />
                        <button onClick={() => setFoodTypeFilter('all')} className={`relative z-10 w-1/3 py-2 text-center text-sm font-semibold transition-colors duration-300 ${foodTypeFilter === 'all' ? 'text-gray-800' : 'text-gray-500'}`}>All</button>
                        <button onClick={() => setFoodTypeFilter('veg')} className={`relative z-10 w-1/3 py-2 text-center text-sm font-semibold transition-colors duration-300 ${foodTypeFilter === 'veg' ? 'text-green-600' : 'text-gray-500'}`}>Veg</button>
                        <button onClick={() => setFoodTypeFilter('non-veg')} className={`relative z-10 w-1/3 py-2 text-center text-sm font-semibold transition-colors duration-300 ${foodTypeFilter === 'non-veg' ? 'text-red-600' : 'text-gray-500'}`}>Non-Veg</button>
                    </div>
                </div>

                {/* ✨ 4. CONDITIONAL RENDERING for Menu Grid */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white p-4 rounded-4xl shadow-2xl mb-20">
                    {isLoading ? (
                        // Show 6 skeleton cards while loading to fill the grid
                        <>
                            <MenuItemSkeleton />
                            <MenuItemSkeleton />
                            <MenuItemSkeleton />
                            <MenuItemSkeleton />
                            <MenuItemSkeleton />
                            <MenuItemSkeleton />
                        </>
                    ) : (
                        // Show actual items once loaded
                        displayItems.length > 0 ? (
                            displayItems.map((item) => {
                                const qty = getQuantity(item._id);
                                const cartEntry = getCartEntry(item._id);

                                return (
                                    <div key={item._id} className="bg-gray-100 rounded-3xl p-3 border-2 border-gray-300 flex items-start gap-4">
                                        <div className="flex-1">
                                            <Link to={`/items/${item._id}`} className="flex flex-col justify-start">
                                                <div className="flex items-center gap-2 mb-1">
                                                     <span className={`w-4 h-4 border ${item.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center`}>
                                                        <span className={`w-1.5 h-1.5 ${item.isVeg ? 'bg-green-600' : 'bg-red-600'} rounded-full`}></span>
                                                    </span>
                                                    <h3 className="text-lg font-bold text-gray-800 hover:text-[#e6002b] transition-colors">
                                                        {item.name}
                                                    </h3>
                                                </div>
                                                <p className="text-gray-600 mb-2 font-bold text-xl">₹{Number(item.price).toFixed(2)}</p>
                                                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-2">{item.description}</p>
                                            </Link>
                                        </div>
                                        <div className="flex-shrink-0 flex flex-col items-center gap-2">
                                            <Link to={`/items/${item._id}`} className="block">
                                                <div className="relative w-35 h-35 rounded-2xl border border-gray-200 overflow-hidden shadow-md">
                                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                            </Link>
                                            {qty > 0 ? (
                                                <div className="relative w-24 -mt-6 bg-white shadow-lg border border-gray-300 rounded-md flex items-center justify-between z-10">
                                                    <button onClick={() => qty > 1 ? updateQuantity(cartEntry?._id, qty - 1) : removeFromCart(cartEntry._id)} className="w-8 h-8 flex items-center justify-center text-[#e6002b] hover:bg-red-50 transition-colors">
                                                        <FaMinus size={12} />
                                                    </button>
                                                    <span className="text-md font-bold text-gray-800 w-8 text-center">{qty}</span>
                                                    <button onClick={() => updateQuantity(cartEntry._id, qty + 1)} className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 transition-colors">
                                                        <FaPlus size={12} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button onClick={() => addToCart(item, 1)} className="relative w-24 -mt-6 bg-white text-[#e6002b] text-sm font-bold uppercase py-2 rounded-md shadow-lg border border-gray-300 transition-all hover:bg-red-50 hover:text-red-700 z-10">
                                                    ADD
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20">
                                <p className="text-gray-500 text-xl font-semibold">No items found for this filter.</p>
                                <p className="text-gray-400 mt-2">Please try another category or filter setting.</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default OurMenu;
