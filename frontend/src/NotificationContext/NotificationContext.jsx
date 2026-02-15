import React, { createContext, useContext, useState, useEffect } from 'react';
import { socket } from '../utils/socket.js'; // Ensure this path points to your socket client instance

// 1. Create the context
const NotificationContext = createContext();

// 2. Create the Provider component
export const NotificationProvider = ({ children }) => {
    // State for the notification list (for a dropdown/bell icon)
    const [notifications, setNotifications] = useState([]);
    // State to control the currently visible dynamic island
    const [activeIsland, setActiveIsland] = useState(null);
    // State to handle initial loading of historical notifications
    const [loading, setLoading] = useState(true);

    // This useEffect hook runs once and manages the entire real-time lifecycle
    useEffect(() => {
        console.log("✅ 1. [Context] Initializing notification service...");

        // --- Step A: Fetch Existing Notifications on Load ---
        const fetchInitialNotifications = async () => {
            const userId = localStorage.getItem("UserId");
            const token = localStorage.getItem("authToken");
            if (!userId || !token) {
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(`/api/notifications/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error(`API fetch failed with status: ${res.status}`);
                const data = await res.json();
                setNotifications(data);
                console.log("✅ 2. [Context] Successfully fetched initial notifications.");
            } catch (err) {
                console.error("❌ 2. [Context] Error fetching initial notifications:", err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialNotifications();

        // --- Step B: Prepare and Initiate Socket Connection ---
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("❌ 3. [Context] No auth token found. Socket connection aborted.");
            return;
        }
        
        console.log("✅ 3. [Context] Auth token found. Preparing to connect socket...");
        // Your backend's `io.use()` middleware requires the token here
        socket.auth = { token };
        socket.connect();

        // --- Step C: Define Handlers for Socket Events ---
        
        // This runs when a new notification is received from the server
        const onNewNotification = (newNotification) => {
            console.log("✅ 5. [Context] Received 'newNotification' event with data:", newNotification);
            
            // Add the new notification to the beginning of the list
            setNotifications(prev => [newNotification, ...prev]);
            console.log("order status: "+newNotification.type);
            // Decide which dynamic island to show based on the 'type'
            switch (newNotification.type) {
                case 'processing':
                case 'Food Preparing':
                    console.log("➡️ [Context] Setting active island to: 'placed'");
                    setActiveIsland('placed');
                    break;
                case 'outForDelivery':
                    console.log("➡️ [Context] Setting active island to: 'delivery'");
                    setActiveIsland('delivery');
                    break;
                case 'delivered':
                    console.log("➡️ [Context] Setting active island to: 'delivered'");
                    setActiveIsland('delivered');
                    break;
                default:
                    console.log(`➡️ [Context] Received unhandled type '${newNotification.type}'. No island will be shown.`);
                    break;
            }
        };

        const onConnect = () => {
            console.log("✅ 4. [Context] Socket successfully connected with ID:", socket.id);
        };

        const onDisconnect = () => {
            console.log("🔌 [Context] Socket disconnected.");
        };

        // --- Step D: Attach Event Listeners ---
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('newNotification', onNewNotification);

        // --- Step E: Define Cleanup Logic ---
        // This function runs when the component unmounts, preventing memory leaks
        return () => {
            console.log("🧹 [Context] Cleaning up: Removing listeners and disconnecting socket.");
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('newNotification', onNewNotification);
            socket.disconnect();
        };
    }, []); // The empty array `[]` ensures this effect runs only once.

    // 3. Define the value to be shared across the app
    const value = {
        notifications,
        activeIsland,
        loading,
        setNotifications
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

// 4. Create a custom hook for easy access to the context's value
export const useNotifications = () => {
    return useContext(NotificationContext);
};