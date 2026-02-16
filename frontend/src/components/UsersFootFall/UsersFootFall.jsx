// import React, { useEffect, useRef } from 'react';
// import { UAParser } from 'ua-parser-js';
// import { v4 as uuidv4 } from 'uuid';

// // --- Configuration ---
//   const STORE_LOCATION = { lat: 22.895518295476265, lng: 84.8830742134923 };

// // ✅ Define your backend server's URL here
// const BACKEND_URL = 'http://localhost:4000'; 

// // --- Helper Functions ---
// const formatDateTime12Hour = (date) => {
//   if (!date || !(date instanceof Date)) return null;
//   return date.toLocaleString('en-IN', {
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true,
//   });
// };

// const calculateDistance = (coords1, coords2) => {
//   if (!coords1 || !coords2) return 'N/A';
//   const toRad = (x) => (x * Math.PI) / 180;
//   const R = 6371;
//   const dLat = toRad(coords2.lat - coords1.lat);
//   const dLon = toRad(coords2.lng - coords1.lng);
//   const lat1 = toRad(coords1.lat);
//   const lat2 = toRad(coords2.lat);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return (R * c).toFixed(2);
// };


// const VisitorTracker = () => {
//   const visitorDataRef = useRef({
//     visitorId: null,
//     sessionStartTime: null,
//     location: { latitude: null, longitude: null },
//     ipAddress: 'N/A',
//     isp: 'N/A',
//     deviceInfo: null,
//     distanceFromStore: 'N/A',
//   });
//   const hasSentData = useRef(false);

//   useEffect(() => {
//     // --- 1. SET VISITOR ID & SESSION START TIME ---
//     let id = localStorage.getItem('visitorId');
//     if (!id) {
//       id = uuidv4();
//       localStorage.setItem('visitorId', id);
//     }
//     visitorDataRef.current.visitorId = id;
//     visitorDataRef.current.sessionStartTime = new Date();

//     // --- 2. GET DEVICE & BROWSER INFO ---
//     const parser = new UAParser();
//     visitorDataRef.current.deviceInfo = parser.getResult();

//     // --- 3. GET IP ADDRESS & ISP ---
//     const fetchNetworkInfo = async () => {
//       try {
//         const IPINFO_TOKEN = '47a29394fd2fe2'; // Note: Move to .env file for production
//         const response = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`);
//         if (!response.ok) throw new Error('Network response was not ok');
//         const data = await response.json();
//         visitorDataRef.current.ipAddress = data.ip || 'N/A';
//         visitorDataRef.current.isp = data.org || 'N/A';
//       } catch (error) {
//         console.error('Failed to fetch network info:', error);
//       }
//     };

//     // --- 4. GET GPS LOCATION ---
//     const fetchLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             visitorDataRef.current.location = { latitude, longitude };
//             const userCoords = { lat: latitude, lng: longitude };
//             visitorDataRef.current.distanceFromStore = calculateDistance(STORE_LOCATION, userCoords);
//           },
//           (error) => console.error('Error getting location:', error.message),
//           { enableHighAccuracy: true }
//         );
//       } else {
//         console.error('Geolocation is not supported by this browser.');
//       }
//     };
    
//     // --- 5. DEFINE THE FUNCTION TO SAVE DATA ON EXIT ---
//     const saveDataOnExit = () => {
//       if (hasSentData.current || !visitorDataRef.current.sessionStartTime) return;
//       hasSentData.current = true;

//       const sessionEndTime = new Date();
//       const data = visitorDataRef.current;
//       const durationInSeconds = Math.round((sessionEndTime - data.sessionStartTime) / 1000);

//       const payload = {
//         visitorId: data.visitorId,
//         sessionData: {
//             sessionStartTime: formatDateTime12Hour(data.sessionStartTime),
//             sessionEndTime: formatDateTime12Hour(sessionEndTime),
//             sessionDurationSeconds: durationInSeconds,
//             location: data.location,
//             distanceFromStoreKM: data.distanceFromStore,
//             ipAddress: data.ipAddress,
//             isp: data.isp,
//             device: {
//                 browser: `${data.deviceInfo.browser.name} ${data.deviceInfo.browser.version}`,
//                 os: `${data.deviceInfo.os.name} ${data.deviceInfo.os.version}`,
//                 type: data.deviceInfo.device.type || 'desktop',
//             }
//         }
//       };
      
//       // ✅ Create a Blob to send the data as application/json
//       const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      
//       // ✅ Use the full backend URL
//       navigator.sendBeacon(`${BACKEND_URL}/api/track-visitor`, blob);
//     };

//     // --- INITIALIZE EVERYTHING ---
//     fetchNetworkInfo();
//     fetchLocation();
//     window.addEventListener('beforeunload', saveDataOnExit);

//     // --- CLEANUP ---
//     return () => {
//       window.removeEventListener('beforeunload', saveDataOnExit);
//     };
//   }, []);

//   return null; // This component does not render anything
// };

// export default VisitorTracker;

import React, { useEffect, useRef } from 'react';
import { UAParser } from 'ua-parser-js';
import { v4 as uuidv4 } from 'uuid';
import { apiUrl } from '../../config/api';

// --- Configuration ---
const STORE_LOCATION = { lat: 22.895518295476265, lng: 84.8830742134923 };
const BACKEND_URL = apiUrl();
// ✅ Paste your Google Maps API key here
const GOOGLE_MAPS_API_KEY = 'AIzaSyD7chhi8vSrxnnNlKhcOkeYAXr0fro2pgQ';

// --- Helper Functions ---
const formatDateTime12Hour = (date) => {
  if (!date || !(date instanceof Date)) return null;
  return date.toLocaleString('en-IN', {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', hour12: true,
  });
};

const calculateDistance = (coords1, coords2) => {
  if (!coords1 || !coords2) return 'N/A';
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);
  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
};

const VisitorTracker = () => {
  const visitorDataRef = useRef({
    visitorId: null,
    sessionStartTime: null,
    location: { latitude: null, longitude: null },
    locationName: 'N/A', // ✅ Added field for the address
    ipAddress: 'N/A',
    isp: 'N/A',
    deviceInfo: null,
    distanceFromStore: 'N/A',
  });
  const hasSentData = useRef(false);

  useEffect(() => {
    // --- 1. SET VISITOR ID & SESSION START TIME ---
    let id = localStorage.getItem('visitorId');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('visitorId', id);
    }
    visitorDataRef.current.visitorId = id;
    visitorDataRef.current.sessionStartTime = new Date();

    // --- 2. GET DEVICE & BROWSER INFO ---
    const parser = new UAParser();
    visitorDataRef.current.deviceInfo = parser.getResult();

    // --- 3. GET IP ADDRESS & ISP ---
    const fetchNetworkInfo = async () => {
      try {
        const IPINFO_TOKEN = '47a29394fd2fe2';
        const response = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        visitorDataRef.current.ipAddress = data.ip || 'N/A';
        visitorDataRef.current.isp = data.org || 'N/A';
      } catch (error) {
        console.error('Failed to fetch network info:', error);
      }
    };

    // --- 4. GET GPS LOCATION & ADDRESS NAME ---
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          // ✅ The success callback is now async to handle the API call
          async (position) => {
            const { latitude, longitude } = position.coords;
            visitorDataRef.current.location = { latitude, longitude };
            const userCoords = { lat: latitude, lng: longitude };
            visitorDataRef.current.distanceFromStore = calculateDistance(STORE_LOCATION, userCoords);
            
            // ✅ Reverse Geocode: Get address from coordinates
            try {
              const geoResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);
              const geoData = await geoResponse.json();
              if (geoData.status === 'OK' && geoData.results[0]) {
                visitorDataRef.current.locationName = geoData.results[0].formatted_address;
              } else {
                 throw new Error('Reverse geocoding failed: ' + geoData.status);
              }
            } catch (error) {
              console.error('Error fetching address:', error);
              visitorDataRef.current.locationName = 'Address not found';
            }
          },
          (error) => console.error('Error getting location:', error.message),
          { enableHighAccuracy: true }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };
    
    // --- 5. DEFINE THE FUNCTION TO SAVE DATA ON EXIT ---
    const saveDataOnExit = () => {
      if (hasSentData.current || !visitorDataRef.current.sessionStartTime) return;
      hasSentData.current = true;
      const sessionEndTime = new Date();
      const data = visitorDataRef.current;
      const durationInSeconds = Math.round((sessionEndTime - data.sessionStartTime) / 1000);

      const payload = {
        visitorId: data.visitorId,
        sessionData: {
            sessionStartTime: formatDateTime12Hour(data.sessionStartTime),
            sessionEndTime: formatDateTime12Hour(sessionEndTime),
            sessionDurationSeconds: durationInSeconds,
            location: data.location,
            locationName: data.locationName, // ✅ Added address to the payload
            distanceFromStoreKM: data.distanceFromStore,
            ipAddress: data.ipAddress,
            isp: data.isp,
            device: {
                browser: `${data.deviceInfo.browser.name} ${data.deviceInfo.browser.version}`,
                os: `${data.deviceInfo.os.name} ${data.deviceInfo.os.version}`,
                type: data.deviceInfo.device.type || 'desktop',
            }
        }
      };
      
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(`${BACKEND_URL}/api/track-visitor`, blob);
    };

    // --- INITIALIZE EVERYTHING ---
    fetchNetworkInfo();
    fetchLocation();
    window.addEventListener('beforeunload', saveDataOnExit);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('beforeunload', saveDataOnExit);
    };
  }, []);

  return null;
};

export default VisitorTracker;
