import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// --- Asset Imports ---
import hotelImage from '../../assets/AnnpurnaDhaba.png';
import homeImage from '../../assets/Home.png';
import deliveryBoyImage from '../../assets/DilevryBoy.png';

// --- Inlined SVG Icon for Phone ---
const FiPhone = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81 .7A2 2 0 0 1 22 16.92z" />
    </svg>
);

// --- Action Button Sub-component ---
const ActionButton = ({ children, ariaLabel, onClick }) => (
    <button
        aria-label={ariaLabel}
        onClick={(e) => { e.stopPropagation(); if (onClick) onClick(); }}
        className="group w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-gray-700/70 transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg"
    >
        {children}
    </button>
);


// --- The Main OutForDelivery Component ---
export default function OutForDelivery() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [progress, setProgress] = useState(0); // Starts at 0
    const [isVisible, setIsVisible] = useState(true);
    
    const islandRef = useRef(null);
    const audioRef = useRef(null); // Ref for the audio element
    const autoVanishTimer = useRef(null);
    
    // --- MODIFIED: Time-Based Delivery & Rider Movement (No Persistence) ---
    const DELIVERY_TIME_MS = 1 * 60 * 100; // 15 minutes

    useEffect(() => {
        // Record the exact time the component mounts
        const startTime = Date.now();

        // This interval updates the progress every second
        const interval = setInterval(() => {
            const timeElapsed = Date.now() - startTime;
            const newProgress = (timeElapsed / DELIVERY_TIME_MS) * 100;

            if (newProgress >= 100) {
                setProgress(100);
                setIsVisible(false); // Vanish when complete
                clearInterval(interval);
            } else {
                setProgress(newProgress);
            }
        }, 100);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []); // Empty array `[]` ensures this runs only once when the component appears.


    // --- ADDED: Notification Bell Audio on Arrival ---
    useEffect(() => {
        // Play sound when the component first mounts.
        // Note: Some browsers may block this until a user clicks on the page.
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.warn("Audio autoplay was blocked by the browser. A user interaction is required.", error);
            });
        }
    }, []);


    // --- Swipe to Vanish & Auto-Dismiss Logic (No changes) ---
    const handleVanish = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        autoVanishTimer.current = setTimeout(handleVanish, 20000); // 20-second auto-vanish
        return () => clearTimeout(autoVanishTimer.current);
    }, []);

    const handleInteraction = () => {
        if (autoVanishTimer.current) {
            clearTimeout(autoVanishTimer.current);
        }
    };

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 100 || info.offset.x < -100) {
            handleVanish();
        }
    };
    

    // Other existing logic...
    useEffect(() => {
        function handleClickOutside(event) {
            if (islandRef.current && !islandRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        }
        if (isExpanded) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isExpanded]);
    
    const handleCallDriver = () => {
        window.location.href = 'tel:7903335271';
    };

    if (!isVisible) {
        return null;
    }

    const minutesRemaining = Math.max(0, Math.ceil((1 - progress / 100) * 15));

    return (
        <div className="fixed top-5 w-full flex justify-center z-50 font-['Nunito'] pointer-events-none">
            {/* Audio element is now included */}
            <audio ref={audioRef} src="/notification.mp3" preload="auto" style={{ display: 'none' }} />

            <motion.div
                ref={islandRef}
                layout
                drag="x"
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragEnd={handleDragEnd}
                onTapStart={handleInteraction}
                onClick={() => !isExpanded && setIsExpanded(true)}
                className={`
                    pointer-events-auto relative flex items-center justify-center
                    bg-gradient-to-br from-yellow-800 to-black text-white
                    transition-all duration-700 ease-in-out
                    w-[90%] max-w-sm shadow-2xl shadow-yellow-500/10
                    ${isExpanded ? 'rounded-[2.5rem] h-80' : 'rounded-full h-20 cursor-pointer'}
                `}
            >
                {/* Header View */}
                <div className="absolute top-0 left-0 right-0 h-20 flex items-center px-4">
                    <div className="w-12">
                        {!isExpanded && (
                            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center p-1">
                                <img src={deliveryBoyImage} alt="Delivery Boy" className="w-full h-full object-cover rounded-full" />
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1 text-center">
                        {isExpanded ? (
                            <div>
                                <p className="text-lg font-bold tracking-tight -mb-1">Your Food is on the way</p>
                                <p className="text-sm text-gray-400">Arriving in ~{minutesRemaining} mins</p>
                                <div className='text-gray-300 text-xs mt-1' >Out for Delivery</div>
                            </div>
                        ) : (
                            <p className="text-lg font-semibold">Order is on the way</p>
                        )}
                    </div>

                    <div className="w-12">
                        {isExpanded ? (
                            <ActionButton ariaLabel="Call driver" onClick={handleCallDriver}>
                                <FiPhone className="w-7 h-7 text-green-500 group-hover:text-white" />
                            </ActionButton>
                        ) : (
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <img src={deliveryBoyImage} alt="Delivery Rider" className="w-8 h-8"/>
                            </div>
                        )}
                    </div>
                </div>

                {/* Expanded Content View */}
                <div className={`absolute top-20 bottom-5 left-5 right-5 transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="relative w-full h-full bg-black/30 rounded-3xl overflow-hidden border border-white/10 p-2">
                        <div className="absolute top-1/2 -translate-y-1/2 left-2 text-center">
                            <img src={hotelImage} alt="Restaurant" className="w-12 h-12 object-contain p-1" />
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 right-2 text-center">
                            <img src={homeImage} alt="Home" className="w-12 h-12 object-contain p-1" />
                        </div>
                        
                        <div className="absolute w-12 h-12 flex items-center justify-center transition-all duration-1000 linear" style={{ top: '56%', left: `${10 + (progress * 0.7)}%`, transform: 'translate(-50%, -50%)' }}>
                            <img src={deliveryBoyImage} alt="Delivery Boy" className="w-full h-full object-cover" />
                        </div>

                        <svg className="absolute inset-0 w-full h-full" width="100%" height="100%" viewBox="0 0 300 150">
                            <path d="M 40 100 L 260 100" stroke="#FFFFFF40" strokeWidth="2" fill="none" strokeDasharray="5 3" />
                        </svg>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}