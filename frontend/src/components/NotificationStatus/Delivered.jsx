import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // --- MODIFICATION: Import for gestures and animation ---

// --- Placeholder images (adjust paths if needed) ---
const homeImage = 'https://placehold.co/100x100/1a202c/ffffff?text=Home';
const deliveredFoodImage = 'https://placehold.co/200x200/22c55e/ffffff?text=Enjoy!';
// --- Inlined SVG Icons ---
const FiHome = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);
const FiCheckCircle = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

// --- The Main OrderDelivered Component ---
export default function OrderDelivered() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const islandRef = useRef(null);

    useEffect(() => {
      console.log("✅ Delivered component mounted");
    }, []);

    // --- MODIFICATION 1: BROWSER NOTIFICATION ON ARRIVAL ---
    useEffect(() => {
        const showNotification = () => {
            // This creates the browser notification
            new Notification("Your Order Has Arrived!", {
                body: "Thank you for your order. Enjoy your meal!",
                icon: '/icon.png' // Make sure you have an icon in your public folder
            });
        };

        // Check if the browser supports notifications
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                // If permission is already granted, show the notification
                showNotification();
            } else if (Notification.permission !== 'denied') {
                // Otherwise, request permission from the user
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        showNotification();
                    }
                });
            }
        }
    }, []); // Empty array ensures this runs only once when the component appears
    // --- END OF MODIFICATION 1 ---


    // --- MODIFICATION 2: SWIPE TO VANISH & AUTO-DISMISS ---
    const handleVanish = () => {
        setIsVisible(false);
    };

    // Automatically hide the component after 15 seconds
    useEffect(() => {
        const visibilityTimer = setTimeout(handleVanish, 15000); 
        return () => clearTimeout(visibilityTimer);
    }, []);

    // Handle the end of a swipe gesture
    const handleDragEnd = (event, info) => {
        // If the island is dragged more than 100 pixels horizontally, vanish it
        if (info.offset.x > 100 || info.offset.x < -100) {
            handleVanish();
        }
    };
    // --- END OF MODIFICATION 2 ---


    // This effect handles collapsing the island when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (islandRef.current && !islandRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        }
        if (isExpanded) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isExpanded]);


    // If the component is not visible, render nothing
    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed top-5 w-full flex justify-center z-50 font-['Nunito'] pointer-events-none">
            {/* --- MODIFICATION 2 (cont.): Added motion.div for gestures --- */}
            <motion.div
                ref={islandRef}
                layout // Animate size changes
                drag="x" // Enable horizontal dragging
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragEnd={handleDragEnd}
                onClick={() => !isExpanded && setIsExpanded(true)}
                className={`
                    pointer-events-auto relative flex items-center justify-center
                    bg-gradient-to-br from-green-800 to-gray-900 text-white
                    transition-all duration-700 ease-in-out
                    w-[90%] max-w-sm shadow-2xl shadow-green-500/10
                    ${isExpanded ? 'rounded-[2.5rem] h-80' : 'rounded-full h-20 cursor-pointer'}
                `}
            >
                {/* Header View */}
                <div className="absolute top-0 left-0 right-0 h-20 flex items-center px-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full">
                        <FiCheckCircle className="w-7 h-7 text-green-400" />
                    </div>
                    <div className="flex-1 text-center px-2">
                        {isExpanded ? (
                            <div>
                                <p className="text-lg font-bold tracking-tight">Your Order Has Arrived!</p>
                                <p className="text-sm text-gray-300">Delivered successfully</p>
                            </div>
                        ) : (
                            <p className="text-lg font-semibold">Order Delivered</p>
                        )}
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full">
                         <FiHome className="w-6 h-6 text-green-400" />
                    </div>
                </div>

                {/* Expanded Content View */}
                <div className={`absolute top-20 bottom-5 left-5 right-5 transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="relative w-full h-full flex flex-col items-center justify-center text-center bg-black/30 rounded-3xl overflow-hidden border border-white/10 p-4">
                        <img src={deliveredFoodImage} alt="Food Delivered" className="w-24 h-24 rounded-full mb-4 border-2 border-green-500" />
                        <p className="text-2xl font-bold text-white mb-2">Enjoy your meal!</p>
                        <p className="text-gray-300 mb-6">Thank you for your order.</p>
                        
                    </div>
                </div>
            </motion.div>
        </div>
    );
}