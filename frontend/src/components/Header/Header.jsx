import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaLocationArrow } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Logo from "../../assets/logo.png";
import Fssai from "../../assets/Fssailogo.png";
import Annpurna from"../../assets/1.png";
import Notification from "../Notification/Notification.jsx";
import { v4 as uuidv4 } from 'uuid'; // NEW: Import the uuid library
import Visitors from '../UsersFootFall/UsersFootFall.jsx';


// ------------------- COOKIES -------------------
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let c of ca) {
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
};

// ------------------- HELPERS -------------------
const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);
  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const formatFromComponents = (components = []) => {
  const find = (types) =>
    components.find((c) => types.some((t) => c.types.includes(t)))?.long_name;

  const sublocality =
    find(["sublocality_level_1"]) ||
    find(["sublocality"]) ||
    find(["neighborhood"]);
  const locality = find(["locality"]) || find(["administrative_area_level_2"]);

  return sublocality && locality
    ? `${sublocality}, ${locality}`
    : locality || null;
};

const stripPlusCode = (addr = "") =>
  addr.replace(/^[0-9A-Z+]+\s*,\s*/i, "");

const shortAddress = (formatted_address, components) => {
  const comp = formatFromComponents(components);
  if (comp) return comp;

  const withoutPlus = stripPlusCode(formatted_address || "");
  const parts = withoutPlus
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.slice(0, 2).join(", ") || formatted_address || "Detected Location";
};

const userId = localStorage.getItem("userId");

// ------------------- COMPONENT -------------------
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [location, setLocation] = useState(""); // short display name
  const [address, setAddress] = useState(""); // full address for search input
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);

  const popupRef = useRef(null);
  const triggerRef = useRef(null);

  const storeLocation = { lat: 22.895518295476265, lng: 84.8830742134923 };

  // ------------------- LOCATION HANDLERS -------------------
  const handleSelect = async (value) => {
    try {
      setLoading(true);
      const results = await geocodeByAddress(value);
      const place = results[0];
      const latLng = await getLatLng(place);
      const dist = haversineDistance(storeLocation, latLng);

      // Set state
      setAddress(place.formatted_address);
      setLocation(shortAddress(place.formatted_address, place.address_components));
      setCoordinates(latLng);
      setDistance(dist.toFixed(2));

      // ✅ SET COOKIES WITH FULL ADDRESS AND COORDINATES
      setCookie("userFullAddress", place.formatted_address, 7);
      setCookie("userCoordinates", JSON.stringify(latLng), 7);
      setCookie("deliveryDistance", dist.toFixed(2), 7);
      
      setShowLocationOptions(false);
    } catch (error) {
      console.error("Error fetching location details:", error);
    } finally {
      setLoading(false);
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const latLng = { lat: latitude, lng: longitude };
        const dist = haversineDistance(storeLocation, latLng);
        
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD7chhi8vSrxnnNlKhcOkeYAXr0fro2pgQ`
          );
          const data = await response.json();

          if (data.status === "OK" && data.results.length > 0) {
            const result = data.results[0];
            const fullAddr = result.formatted_address;
            
            // Set state
            setAddress(fullAddr);
            setLocation(shortAddress(fullAddr, result.address_components));
            setCoordinates(latLng);
            setDistance(dist.toFixed(2));
            
            // ✅ SET COOKIES WITH FULL ADDRESS AND COORDINATES
            setCookie("userFullAddress", fullAddr, 7);
            setCookie("userCoordinates", JSON.stringify(latLng), 7);
            setCookie("deliveryDistance", dist.toFixed(2), 7);

          } else {
            throw new Error("Reverse geocoding failed");
          }
        } catch (err) {
          console.error("Error fetching address:", err);
          // Fallback if API fails
          setAddress("Detected Location");
          setLocation("Detected Location");
          setCoordinates(latLng);
          setDistance(dist.toFixed(2));
          
          // ✅ SET FALLBACK COOKIES
          setCookie("userFullAddress", "Detected Location", 7);
          setCookie("userCoordinates", JSON.stringify(latLng), 7);
          setCookie("deliveryDistance", dist.toFixed(2), 7);

        } finally {
          setLoading(false);
          setShowLocationOptions(false);
        }
      },
      (error) => {
        console.error("Error detecting location:", error);
        alert("Unable to fetch your location.");
        setLoading(false);
      }
    );
  };

  
  // ------------------- EFFECTS -------------------
  useEffect(() => {
    // ✅ READ FULL ADDRESS AND COORDINATES FROM COOKIES ON LOAD
    const storedFullAddress = getCookie("userFullAddress");
    const storedCoords = getCookie("userCoordinates");
    const storedDistance = getCookie("deliveryDistance");
 // Set the ID to state so it can be displayed


    if (storedFullAddress && storedCoords && storedDistance) {
        const parsedCoords = JSON.parse(storedCoords);
        setAddress(storedFullAddress);
        setLocation(shortAddress(storedFullAddress)); // Create short name for display
        setCoordinates(parsedCoords);
        setDistance(storedDistance);
    } else {
      detectLocation();
    }
    // eslint-disable-next-line
  }, []);

  // This effect is no longer needed as cookies are set directly in handlers
  // useEffect(() => {
  //   if (location && distance !== null) {
  //     setCookie("userLocation", location, 7);
  //     setCookie("deliveryDistance", distance, 7);
  //   }
  // }, [location, distance]);

  useEffect(() => {
    const handleOutside = (e) => {
      const inPopup = popupRef.current?.contains(e.target);
      const inTrigger = triggerRef.current?.contains(e.target);
      if (!inPopup && !inTrigger) setShowLocationOptions(false);
    };
    if (showLocationOptions) {
      document.addEventListener("click", handleOutside);
    }
    return () => document.removeEventListener("click", handleOutside);
  }, [showLocationOptions]);

  // ------------------- RENDER -------------------
  return (
    <>
    <div className="display: 'none'">
      <Visitors/>
    </div>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-white sticky top-0 z-50">
        {/* Menu & Location */}
        <div className="flex items-center gap-4">
          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 bg-gray-100 rounded-full shadow cursor-pointer hover:bg-gray-200 transition"
          >
            <FaBars className="text-xl text-gray-700" />
          </button>

          {/* Location */}
          <div
            className="flex flex-col px-3 cursor-pointer relative"
            onClick={() => setShowLocationOptions((s) => !s)}
            ref={triggerRef}
          >
            <span className="text-sm font-bold text-red-600 tracking-wide">
              DELIVER TO
            </span>
            <span className="text-sm font-medium text-gray-800 flex items-center gap-1 truncate max-w-[150px] sm:max-w-[250px]">
              {location || "Detecting..."} <span className="text-xs">▼</span>
            </span>

            {/* Location Popover */}
            {showLocationOptions && (
              <div
                ref={popupRef}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full left-0 mt-2 w-[22rem] max-w-[90vw] bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-4"
              >
                <h2 className="text-base font-semibold mb-3">
                  Choose your location
                </h2>

                {/* Search */}
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                  searchOptions={{
                    componentRestrictions: { country: "in" },
                    types: ["geocode"],
                  }}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading: loadingSug,
                  }) => (
                    <div>
                      <input
                        {...getInputProps({
                          placeholder: "Enter area, street name…",
                          className:
                            "w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500",
                        })}
                      />
                      <div className="bg-white border rounded-md mt-2 max-h-52 overflow-y-auto">
                        {loadingSug && (
                          <div className="p-2 text-gray-500">Loading…</div>
                        )}
                        {suggestions.map((sug) => (
                          <div
                            key={sug.placeId}
                            {...getSuggestionItemProps(sug, {
                              className:
                                "px-3 py-2 cursor-pointer " +
                                (sug.active
                                  ? "bg-gray-100 font-medium"
                                  : "hover:bg-gray-50"),
                            })}
                          >
                            {sug.description}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>

                {/* Detect Button */}
                <button
                  onClick={detectLocation}
                  disabled={loading}
                  className={`flex items-center justify-center w-full mt-4 py-2.5 rounded-md transition ${
                    loading
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#e6002b] text-white hover:bg-red-600"
                  }`}
                >
                  {loading ? (
                    "Detecting..."
                  ) : (
                    <>
                      <FaLocationArrow className="mr-2" /> Detect my location
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative"
          >
            <IoMdNotificationsOutline className="text-3xl text-gray-700 hover:text-red-600 transition" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full" />
          </button>
          <Notification open={showNotifications} userId={userId} />
        </div>
      </header>

      {/* Sidebar Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white sm:bg-gray-100 z-50 transform transition-transform duration-300 font-['Nuinto'] ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 font-bold text-lg">Menu</div>
        <nav className="flex flex-col p-4 space-y-3">
          <a href="/about" className="hover:text-red-600 transition">
            About Page
          </a>
          <a href="/contact" className="hover:text-red-600 transition">
            Contact Us
          </a>
          <a href="/privecypolicy" className="hover:text-red-600 transition">
            Privacy Policy
          </a>
          <a href="/tnc" className="hover:text-red-600 transition">
            T & C
          </a>
          <a href="/shippingPolicy" className="hover:text-red-600 transition">
            Shipping & Delivery Policy
          </a>
          <a href="/refundpolicy" className="hover:text-red-600 transition">
            Refund Policy
          </a>
        </nav>
        <div className="m-2 p-1 border-t-2 font-['Nuinto']">
          <h1 className="text-lg font-bold text-[#e6002b] border-b">Annpurna Dhaba and Family Restaurant</h1>
          <span className="text-gray-500">Main Road Ranchi-835227</span><br/>
          <span className="text-gray-500">Loenga,Kamdara,Gumla</span><br/>
          <div className="flex w-28 gap-3 mt-3">
            <img src={Logo} alt="Logo" className="w-auto h-auto object-contain" />
            <img src={Fssai} alt="fssai" className="w-auto h-auto object-contain" />
          </div>
          <span className="text-gray-600 text-sm justify-center">LIC No: 21124037000007</span>
        </div>
        <img src={Annpurna} alt="Annpurna" className="w-auto h-auto object-contain mt-7 p-2" />
      </div>
    </>
  );
};

export default Header;