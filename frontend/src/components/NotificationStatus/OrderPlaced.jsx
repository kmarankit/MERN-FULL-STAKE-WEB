// import React, { useState, useEffect, useRef } from 'react';

// // --- Using placeholder images for demonstration ---
// import cookingImage from '../../assets/OrderPreparing.png';

// // --- Inlined SVG Icons ---
// const FiPhone = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//         <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81 .7A2 2 0 0 1 22 16.92z" />
//     </svg>
// );

// const FiActivity = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//         <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
//     </svg>
// );

// // --- The Action Button Sub-component ---
// const ActionButton = ({ children, ariaLabel }) => (
//     <button
//         aria-label={ariaLabel}
//         onClick={(e) => e.stopPropagation()}
//         className="group w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-gray-700/70 transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg"
//     >
//         {children}
//     </button>
// );

// // --- The Main OrderPlaced Component ---
// export default function OrderPlaced() {
//     const [isExpanded, setIsExpanded] = useState(false);
//     const islandRef = useRef(null);

//     // --- LOGIC FOR PERSISTENT PROGRESS ---

//     const getInitialProgress = () => {
//         const savedData = sessionStorage.getItem('orderProgressData');
//         if (!savedData) {
//             return 0;
//         }

//         const { progress, timestamp } = JSON.parse(savedData);
//         const timeElapsed = (Date.now() - timestamp) / 1000; // in seconds
        
//         // *** MODIFIED ***: Calculate progress increase based on a 9-second interval
//         const progressIncrease = Math.floor(timeElapsed / 9); 
        
//         const newProgress = progress + progressIncrease;
//         return newProgress >= 100 ? 100 : newProgress;
//     };

//     const [progress, setProgress] = useState(getInitialProgress);
//     const progressRef = useRef(progress);

//     useEffect(() => {
//         progressRef.current = progress;
//     }, [progress]);

//     useEffect(() => {
//         if (progressRef.current >= 100) return;

//         // *** MODIFIED ***: Update interval to 9000ms (9 seconds)
//         // 100 steps * 9000ms/step = 900,000ms = 15 minutes
//         const interval = setInterval(() => {
//             setProgress(prev => {
//                 if (prev >= 100) {
//                     clearInterval(interval);
//                     return 100;
//                 }
//                 return prev + 1;
//             });
//         }, 9000); 

//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         const handleBeforeUnload = () => {
//             const dataToSave = {
//                 progress: progressRef.current,
//                 timestamp: Date.now()
//             };
//             sessionStorage.setItem('orderProgressData', JSON.stringify(dataToSave));
//         };

//         window.addEventListener('beforeunload', handleBeforeUnload);

//         return () => {
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//         };
//     }, []);

//     // --- END OF PERSISTENT PROGRESS LOGIC ---

//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (islandRef.current && !islandRef.current.contains(event.target)) {
//                 setIsExpanded(false);
//             }
//         }
//         if (isExpanded) {
//             document.addEventListener("mousedown", handleClickOutside);
//         }
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [isExpanded]);

//     return (
//         <div className="fixed top-5 w-full flex justify-center z-50 font-['Nunito'] pointer-events-none">
//             <div
//                 ref={islandRef}
//                 onClick={() => !isExpanded && setIsExpanded(true)}
//                 className={`
//                     pointer-events-auto relative flex items-center justify-center
//                     bg-gradient-to-br from-blue-900 to-black text-white
//                     transition-all duration-700 ease-in-out
//                     w-[90%] max-w-sm shadow-2xl shadow-blue-500/10
//                     ${isExpanded ? 'rounded-[2.5rem] h-80' : 'rounded-full h-20 cursor-pointer'}
//                 `}
//             >
//                 {/* Header View */}
//                 <div className="absolute top-0 left-0 right-0 h-20 flex items-center px-4">
//                     <div className="flex items-center space-x-3 w-12">
//                         {!isExpanded && (
//                             <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center p-1">
//                                 <img src={cookingImage} alt="Restaurant" className="w-full h-full object-cover rounded-full" />
//                             </div>
//                         )}
//                     </div>
                    
//                     <div className="flex-1 text-center">
//                         {isExpanded ? (
//                             <div>
//                                 <p className="text-lg font-bold tracking-tight -mb-1">Order Confirmed!</p>
//                                 <p className="text-sm text-gray-400">The restaurant is preparing your food</p>
//                                 <div className='text-gray-300 text-xs mt-1'>Order Placed</div>
//                             </div>
//                         ) : (
//                             <p className="text-lg font-semibold">Order Placed Successfully</p>
//                         )}
//                     </div>

//                     <div className="flex items-center space-x-2">
//                         {isExpanded ? (
//                             <ActionButton ariaLabel="Call Driver">
//                                 <FiPhone className="w-7 h-7 text-green-500 group-hover:text-white" />
//                             </ActionButton>
//                         ) : (
//                             <div className="relative w-12 h-12 flex items-center justify-center">
//                                 <FiActivity className="w-7 h-7 text-blue-400"/>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Expanded Content View */}
//                 <div className={`absolute top-24 bottom-5 left-5 right-5 transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
//                     <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/30 rounded-3xl overflow-hidden border p-4 border-white/10">
//                         <p className="text-gray-300 mb-4">Preparation Status</p>
//                         <div className="mb-6">
//                             <img src={cookingImage} alt="Food Preparation" className="w-24 h-24 object-contain" />
//                         </div>
//                         <div className="w-full flex flex-col items-center gap-2">
//                            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
//                                <div 
//                                  className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
//                                  style={{ width: `${progress}%`, transition: 'width 1s linear' }} // Added CSS transition for visual smoothness
//                                ></div>
//                            </div>
//                            <p className="text-xl font-bold">{Math.round(progress)}%</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // Import for animations and gestures

// --- Asset Imports ---
import cookingImage from '../../assets/OrderPreparing.png';

// --- Inlined SVG Icons (no changes) ---
const FiPhone = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81 .7A2 2 0 0 1 22 16.92z" />
    </svg>
);
const FiActivity = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
);

// --- The Action Button Sub-component ---
const ActionButton = ({ children, ariaLabel, onClick }) => (
    <button
        aria-label={ariaLabel}
        onClick={(e) => {
            e.stopPropagation(); // Prevent the island from expanding/collapsing
            if (onClick) onClick();
        }}
        className="group w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-gray-700/70 transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg"
    >
        {children}
    </button>
);

// --- The Main OrderPlaced Component ---
export default function OrderPlaced() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const islandRef = useRef(null);
    const autoVanishTimer = useRef(null);

    // --- MODIFICATION 1: 20-MINUTE TIMER PROGRESS BAR ---
    const PREPARATION_TIME_MS = 20 * 60 * 1000; // 20 minutes in milliseconds

    // This function now calculates progress based on a fixed start time
    const getInitialProgress = () => {
        const savedData = sessionStorage.getItem('orderProgressData');
        if (!savedData) {
            // If no data, start a new timer
            sessionStorage.setItem('orderProgressData', JSON.stringify({ startTime: Date.now() }));
            return 0;
        }

        const { startTime } = JSON.parse(savedData);
        const timeElapsed = Date.now() - startTime;
        const progress = Math.min((timeElapsed / PREPARATION_TIME_MS) * 100, 100);
        return progress;
    };

    const [progress, setProgress] = useState(getInitialProgress);
useEffect(() => {
  console.log("✅ OrderPlaced component mounted");
}, []);

    useEffect(() => {
        // This interval updates the progress bar every second
        const interval = setInterval(() => {
            setProgress(getInitialProgress());
        }, 1000);

        // Stop the interval when progress reaches 100%
        if (progress >= 100) {
            clearInterval(interval);
            sessionStorage.removeItem('orderProgressData'); // Clean up session storage
        }

        return () => clearInterval(interval);
    }, [progress]);
    // --- END OF MODIFICATION 1 ---


    // --- MODIFICATION 2: WORKING CALL DRIVER BUTTON ---
    const handleCallDriver = () => {
        console.log("Calling driver...");
        window.location.href = 'tel:7903335271';
    };
    // --- END OF MODIFICATION 2 ---


    // --- MODIFICATION 3: BROWSER NOTIFICATION PERMISSION ---
    useEffect(() => {
        const showNotification = () => {
            new Notification("Your Order is Placed!", {
                body: "The restaurant has started preparing your food. We'll keep you updated!",
                icon: cookingImage // You can use a URL to your logo here
            });
        };

        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                showNotification();
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        showNotification();
                    }
                });
            }
        }
    }, []);
    // --- END OF MODIFICATION 3 ---


    // --- MODIFICATION 4: AUTO-VANISH & SWIPE TO DISMISS ---
    const handleVanish = () => {
        setIsVisible(false);
        sessionStorage.removeItem('orderProgressData'); // Clean up on dismiss
    };

    // Auto-vanish after 15 seconds
    useEffect(() => {
        autoVanishTimer.current = setTimeout(handleVanish, 15000);
        // Clear timer if the component unmounts
        return () => clearTimeout(autoVanishTimer.current);
    }, []);

    const handleInteraction = () => {
        // If user interacts, cancel the auto-vanish timer
        if (autoVanishTimer.current) {
            clearTimeout(autoVanishTimer.current);
        }
    };

    // Handle swipe gesture
    const handleDragEnd = (event, info) => {
        if (info.offset.x > 100 || info.offset.x < -100) {
            handleVanish();
        }
    };
    // --- END OF MODIFICATION 4 ---


    // This logic handles closing the expanded view when clicking outside
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


    // If the island is not visible, render nothing
    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed top-5 w-full flex justify-center z-50 font-['Nunito'] pointer-events-none">
            <motion.div
                ref={islandRef}
                layout // Animate layout changes (e.g., expand/collapse)
                drag="x" // Enable horizontal dragging
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Keep it constrained
                onDragEnd={handleDragEnd}
                onTapStart={handleInteraction}
                onClick={() => !isExpanded && setIsExpanded(true)}
                className={`
                    pointer-events-auto relative flex items-center justify-center
                    bg-gradient-to-br from-blue-900 to-black text-white
                    transition-all duration-700 ease-in-out
                    w-[90%] max-w-sm shadow-2xl shadow-blue-500/10
                    ${isExpanded ? 'rounded-[2.5rem] h-80' : 'rounded-full h-20 cursor-pointer'}
                `}
            >
                {/* Header View */}
                <div className="absolute top-0 left-0 right-0 h-20 flex items-center px-4">
                    <div className="w-12">
                        {!isExpanded && (
                            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center p-1">
                                <img src={cookingImage} alt="Restaurant" className="w-full h-full object-cover rounded-full" />
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1 text-center">
                        {isExpanded ? (
                            <div>
                                <p className="text-lg font-bold tracking-tight -mb-1">Order Confirmed!</p>
                                <p className="text-sm text-gray-400">The restaurant is preparing your food</p>
                                <div className='text-gray-300 text-xs mt-1'>Order Placed</div>
                            </div>
                        ) : (
                            <p className="text-lg font-semibold">Order Placed Successfully</p>
                        )}
                    </div>

                    <div className="w-12">
                        {isExpanded ? (
                            <ActionButton ariaLabel="Call Driver" onClick={handleCallDriver}>
                                <FiPhone className="w-7 h-7 text-green-500 group-hover:text-white" />
                            </ActionButton>
                        ) : (
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <FiActivity className="w-7 h-7 text-blue-400"/>
                            </div>
                        )}
                    </div>
                </div>

                {/* Expanded Content View */}
                <div className={`absolute top-24 bottom-5 left-5 right-5 transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/30 rounded-3xl overflow-hidden border p-4 border-white/10">
                        <p className="text-gray-300 mb-4">Preparation Status</p>
                        <div className="mb-6">
                            <img src={cookingImage} alt="Food Preparation" className="w-24 h-24 object-contain" />
                        </div>
                        <div className="w-full flex flex-col items-center gap-2">
                           <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                               <div 
                                 className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                 style={{ width: `${progress}%`, transition: 'width 1s linear' }}
                               ></div>
                           </div>
                           <p className="text-xl font-bold">{Math.floor(progress)}%</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}