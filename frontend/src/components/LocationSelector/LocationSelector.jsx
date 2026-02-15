import React, { useState, useEffect } from "react";
import { FaLocationArrow, FaSearch } from "react-icons/fa";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

// Cookie helpers
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const LocationSelector = () => {
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [distance, setDistance] = useState(null);

  const storeLocation = { lat: 22.895518295476265, lng: 84.8830742134923 };

  // Haversine formula
  const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lng - coords1.lng);
    const lat1 = toRad(coords1.lat);
    const lat2 = toRad(coords2.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) *
        Math.cos(lat1) *
        Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Handle selection from autocomplete
  const handleSelect = async (value) => {
    try {
      setLoading(true);
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      setLocation(value);
      setCoordinates(latLng);

      const dist = haversineDistance(storeLocation, latLng);
      setDistance(dist.toFixed(2));
      setShowLocationOptions(false);
    } catch (error) {
      console.error("Error fetching location details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Detect current location
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
        setCoordinates(latLng);

        const dist = haversineDistance(storeLocation, latLng);
        setDistance(dist.toFixed(2));

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD7chhi8vSrxnnNlKhcOkeYAXr0fro2pgQ`
          );
          const data = await response.json();

          if (data.status === "OK" && data.results.length > 0) {
            setAddress(data.results[0].formatted_address);
            setLocation(data.results[0].formatted_address);
          } else {
            setAddress("Detected Location");
            setLocation("Detected Location");
          }
        } catch (err) {
          console.error("Error fetching address:", err);
          setAddress("Detected Location");
          setLocation("Detected Location");
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

  // Load from cookies
  useEffect(() => {
    const storedLocation = getCookie("userLocation");
    const storedDistance = getCookie("deliveryDistance");
    if (storedLocation) setLocation(storedLocation);
    if (storedDistance) setDistance(storedDistance);
  }, []);

  // Save to cookies
  useEffect(() => {
    if (location && distance !== null) {
      setCookie("userLocation", location, 7);
      setCookie("deliveryDistance", distance, 7);
    }
  }, [location, distance]);

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <div className="relative flex-grow">
          <button
            onClick={() => setShowLocationOptions(!showLocationOptions)}
            className="w-full flex items-center justify-start gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg transition-colors hover:bg-gray-200"
          >
            <FaLocationArrow className="text-red-500 text-2xl" />
            <span className="text-gray-700 font-semibold truncate">
              {location || "Select Your Location"}
            </span>
          </button>

          {showLocationOptions && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
              <div className="p-4 space-y-4">
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                  searchOptions={{
                    componentRestrictions: { country: "in" },
                    types: ["geocode"],
                    location: new window.google.maps.LatLng(23.6102, 85.2799),
                    radius: 200000,
                  }}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <div className="relative">
                        <input
                          {...getInputProps({
                            placeholder: "Enter area, street name...",
                            className:
                              "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700",
                          })}
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>

                      <div className="mt-2 max-h-48 overflow-y-auto">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            {...getSuggestionItemProps(suggestion, {
                              className: `p-2 cursor-pointer transition-colors border-b border-gray-200 text-gray-700 ${
                                suggestion.active
                                  ? "bg-gray-200 font-semibold"
                                  : "hover:bg-gray-100"
                              }`,
                            })}
                          >
                            {suggestion.description}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>

                <button
                  onClick={detectLocation}
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-lg transition-colors ${
                    loading
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Detecting...
                    </div>
                  ) : (
                    <>
                      <FaLocationArrow /> Detect Current Location
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {distance !== null && (
        <div className="pt-2 text-sm text-left font-bold">
          {parseFloat(distance) > 10 ? (
            <p className="text-gray-500 text-center font-mono">
              हमें माफ़ करें! हम आपके घर पर डिलीवरी नहीं पहुंचा सकते हैं। क्योंकि आपके
              घर से ढाबे की दूरी 10 KM से ज़्यादा है।
            </p>
          ) : (
            <p className="text-gray-500 text-center font-mono">
              जी हां! हम आपके घर पर डिलीवरी कर सकते हैं।
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
