import React, { useEffect, useState, useRef } from "react";
import { 
  HiOutlineBellAlert,
  HiOutlineClipboardDocumentCheck,
  HiOutlineClock,
  HiOutlineInformationCircle
} from "react-icons/hi2"; 
import { FaCircle } from "react-icons/fa";
import { socket } from "../../utils/socket.js";
import { apiUrl } from "../../config/api";

const Notification = ({ open }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

  // This useEffect fetches the initial list of notifications when the component opens.
  useEffect(() => {
    const fetchInitialNotifications = async () => {
      // const userId = localStorage.getItem("UserId");
      const userId = localStorage.getItem("userId") || localStorage.getItem("UserId");
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(apiUrl(`/api/notifications`), {
        // const res = await fetch(apiUrl(`/api/notifications/${userId}`), {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching initial notifications:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialNotifications();
  }, []); // The empty dependency array means this runs only once when the component mounts.

  // This useEffect handles the real-time socket connection.
  useEffect(() => {
    // 1. --- FINAL DEBUGGING CHECK ---
    // Check for the token in localStorage at the exact moment we need it.
    const token = localStorage.getItem('authToken');
    console.log("Attempting to connect socket. Token from localStorage:", token);

    // 2. Only connect if a token exists.
    if (token) {
        // Manually set the auth token on the socket instance before connecting.
        socket.auth = { token };
        socket.connect();
    } else {
        console.error("Socket Connection Aborted: No auth token was found in localStorage.");
    }

    // 3. Set up listeners for incoming messages.
    console.log("📥 Frontend is now listening for notifications...");

    const onNewNotification = (newNotification) => {
        console.log("✅ SUCCESS: 'newNotification' event received!", newNotification);
        setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
        if (audioRef.current) {
            audioRef.current.play().catch(error => console.log("Audio play failed:", error));
        }
    };
    
    socket.on("newNotification", onNewNotification);

    // This is a powerful "catch-all" listener for debugging.
    socket.onAny((eventName, ...args) => {
        console.log(`🕵️‍♂️ DEBUG: An event was received: '${eventName}' with data:`, args);
    });

    // 4. Clean up when the component is closed or unmounted.
    return () => {
        console.log("Cleaning up socket listeners and disconnecting.");
        socket.off("newNotification", onNewNotification);
        socket.offAny();
        socket.disconnect();
    };
  }, []); // The empty array ensures this setup runs only once.

  // This handler marks a notification as read.
  const handleNotificationClick = async (id) => {
    setNotifications(
      notifications.map((notif) => 
        notif._id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  // This function returns the correct icon for the notification type.
  const getNotificationIcon = (notif) => {
    const iconClass = notif.isRead ? "text-gray-400" : "text-blue-600";
    
    switch (notif.type) {
      case "order_placed":
      case "payment_succeeded":
        return <HiOutlineClipboardDocumentCheck className={`text-xl ${iconClass}`} />;
      case "payment_pending":
        return <HiOutlineClock className={`text-xl text-yellow-500`} />;
      case "order_status":
        return <HiOutlineInformationCircle className={`text-xl ${iconClass}`}  />;
      default:
        return <HiOutlineBellAlert className={`text-xl ${iconClass}`} />;
    }
  };

  return (
    <div
      className={`absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg border border-gray-200 
      transition-all duration-300 transform 
      ${open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"} 
      overflow-hidden z-50`}
    >
      
      <div className="flex items-center px-4 py-3 border-b border-gray-200 bg-gray-50">
        <HiOutlineBellAlert className="text-2xl mr-3 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
      </div>

      <div className="max-h-72 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        ) : notifications.length === 0 ? (
          <p className="p-4 text-gray-500 text-center">No new notifications</p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif._id}
              onClick={() => handleNotificationClick(notif._id)}
              className={`flex items-start px-4 py-3 border-b border-gray-100 
                hover:bg-blue-50 transition-all duration-200 ease-in-out cursor-pointer 
                ${notif.isRead ? "bg-white" : "bg-blue-50"}`}
            >
              <div className="flex-shrink-0 mr-3 mt-1">
                {getNotificationIcon(notif)}
              </div>
              <div className="flex-grow">
                <p className={`text-sm ${notif.isRead ? "text-gray-600 font-normal" : "text-gray-800 font-semibold"}`}>
                  {notif.message}
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(notif.createdAt).toLocaleString()}
                </span>
              </div>
              {!notif.isRead && (
                <FaCircle className="ml-2 mt-1 text-blue-500 text-[8px] flex-shrink-0" title="Unread" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
