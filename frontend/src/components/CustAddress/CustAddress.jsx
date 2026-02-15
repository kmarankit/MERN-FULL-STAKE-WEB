import React, { useState, useEffect } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import api from "../../axiosConfig";
import { FaHome, FaPlus, FaTrash, FaLocationArrow, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

// Haversine formula for distance
const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);
  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Store location (example)
const storeLocation = { lat: 22.895518295476265, lng: 84.8830742134923 };

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block mb-1 font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-3 py-2"
    />
  </div>
);

export default function AddressPage() {
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [distance, setDistance] = useState(null);
  const [distanceStatus, setDistanceStatus] = useState(null);
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
 const navigate = useNavigate();

const ArrowLeftIcon = () => (
    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
    </svg>
    
);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    zip: "",
    landmark: "",
    latitude: null,
    longitude: null,
  });

  const userId = localStorage.getItem("UserId");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Fetch addresses
  const fetchAddresses = async () => {
    if (!userId) return;
    try {
      console.log("ankit Kumar:" + userId)
      const res = await api.get(`/users/${userId}/addresses`);
      if (res.data.success) setAddresses(res.data.addresses || []);
      else showToast(res.data.message || "Could not fetch addresses");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Error fetching addresses");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  // Select existing address
  const handleSelectAddress = (addr) => {
    if (addr.distance > 10) {
      showToast("Delivery not available: distance > 10 KM");
      return;
    }
    setSelectedAddressId(addr._id);
  };

  const handleProceedToCheckout = () => {
    const selectedAddress = addresses.find(addr => addr._id === selectedAddressId);
    if (!selectedAddress) {
      showToast("Please select an address!");
      return;
    }
    sessionStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    window.location.href = "/checkout";
  };

  // Autocomplete select
  const handleSelect = async (value) => {
    try {
      setLoading(true);
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      setFormData(prev => ({ ...prev, landmark: value, latitude: latLng.lat, longitude: latLng.lng }));
      setCoordinates(latLng);

      const dist = haversineDistance(storeLocation, latLng);
      setDistance(dist.toFixed(2));
      if (dist > 10) {
        setIsDeliveryAvailable(false);
        setDistanceStatus("invalid");
        showToast("Delivery not available for distances over 10 KM");
      } else {
        setIsDeliveryAvailable(true);
        setDistanceStatus("valid");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Detect current location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      showToast("Geolocation not supported");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const latLng = { lat: latitude, lng: longitude };
      setCoordinates(latLng);
      setFormData(prev => ({ ...prev, latitude, longitude }));

      const dist = haversineDistance(storeLocation, latLng);
      setDistance(dist.toFixed(2));
      if (dist > 10) {
        setIsDeliveryAvailable(false);
        setDistanceStatus("invalid");
        showToast("Delivery not available for distances over 10 KM");
      } else {
        setIsDeliveryAvailable(true);
        setDistanceStatus("valid");
      }

      // Reverse geocode
      try {
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD7chhi8vSrxnnNlKhcOkeYAXr0fro2pgQ`);
        const data = await res.json();
        if (data.status === "OK" && data.results.length > 0) {
          setAddress(data.results[0].formatted_address);
          setFormData(prev => ({ ...prev, landmark: data.results[0].formatted_address }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, (err) => { console.error(err); setLoading(false); }, { enableHighAccuracy: true });
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSave = async () => {
//     if (!userId) return showToast("Not logged in");
//     // if (!formData.city || !formData.zip) return showToast("City and ZIP are required");
//  const requiredFields = ["firstName", "lastName", "phone", "email", "city", "zip", "landmark"];
//   for (let field of requiredFields) {
//     if (!formData[field] || formData[field].trim() === "") {
//       showToast("Please fill all the details");
//       return;
//     }
//   }
//     try {
//       const payload = { userId, ...formData, distance };
//       const res = await api.post("/users/add-address", payload);
//       if (res.data.success) {
//         showToast("✅ Address saved successfully!");
//         setFormData({ firstName: "", lastName: "", phone: "", email: "", city: "", zip: "", landmark: "", latitude: null, longitude: null });
//         setAddress(""); setShowForm(false);
//         await fetchAddresses();
//       } else showToast("❌ Failed to save address: " + res.data.message);
//     } catch (err) {
//       console.error(err);
//       showToast(err.response?.data?.message || "❌ Something went wrong.");
//     }
//   };
const handleSave = async () => {
  if (!userId) return showToast("Not logged in");

  const { firstName, lastName, phone, email, city, zip, landmark } = formData;

  // Validate required fields
  const requiredFields = { firstName, lastName, phone, email, city, zip, landmark };
  for (let [key, value] of Object.entries(requiredFields)) {
    if (!value || value.trim() === "") {
      showToast("Please fill all the details");
      return;
    }
  }

  // Validate phone number (10 digits)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    showToast("Please enter a valid 10-digit phone number");
    return;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Please enter a valid email address");
    return;
  }

  // Validate ZIP code (numeric, 5-6 digits)
  const zipRegex = /^\d{5,6}$/;
  if (!zipRegex.test(zip)) {
    showToast("Please enter a valid ZIP code");
    return;
  }

  // Validate delivery distance
  if (!isDeliveryAvailable) {
    showToast("Delivery not available at this location");
    return;
  }

  try {
    const payload = { userId, ...formData, distance };
    const res = await api.post("/users/add-address", payload);

    if (res.data.success) {
      showToast("✅ Address saved successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        city: "",
        zip: "",
        landmark: "",
        latitude: null,
        longitude: null,
      });
      setAddress("");
      setShowForm(false);
      await fetchAddresses();
    } else {
      showToast("❌ Failed to save address: " + res.data.message);
    }
  } catch (err) {
    console.error(err);
    showToast(err.response?.data?.message || "❌ Something went wrong.");
  }
};

  const handleDelete = async (id) => {
    if (!userId || !id) return;
    try {
      await api.delete(`/users/${userId}/addresses/${id}`);
      showToast("✅ Address deleted successfully");
      await fetchAddresses();
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "❌ Failed to delete address");
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-50 md:p-12 md:flex md:items-center md:justify-center">
       <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 z-10 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label="Go back"
                >
                    <ArrowLeftIcon />
        </button>
      <div className="container mx-auto p-4 md:grid md:grid-cols-2 md:gap-8 bg-gray-50 ">
      
        
        <div className="md:col-span-1">
          <h1 className="text-2xl font-bold mb-10 text-center text-gray-500 mt-10">Saved Addresses</h1>
          <div className="space-y-4">
            {addresses.map(addr => (
              <div
                key={addr._id}
                className={`bg-white rounded-xl shadow p-4 flex justify-between items-start cursor-pointer ${selectedAddressId === addr._id ? "border-2 border-green-500" : ""} ${addr.distance > 10 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handleSelectAddress(addr)}
              >
                <div className="flex items-start gap-2">
                  <input type="radio" name="selectedAddress" checked={selectedAddressId === addr._id} readOnly />
                  <div>
                    <div className="flex items-center gap-2">
                      <FaHome className="text-gray-600" />
                      <span className="font-semibold">{addr.firstName} {addr.lastName}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{addr.landmark}, {addr.city} - {addr.zip}</p>
                    <p className="text-gray-500 text-sm">📞 {addr.phone}</p>
                    <p className="text-gray-500 text-sm">📧 {addr.email}</p>
                    <p className="text-gray-500 text-sm">Distance: {addr.distance} KM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="text-red-600 hover:text-red-800 text-2xl" onClick={() => handleDelete(addr._id)}><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>

          {selectedAddressId && (
            <button onClick={handleProceedToCheckout} className="mt-4 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-900">
              Proceed to Checkout
            </button>
          )}

          <button onClick={() => setShowForm(true)} className="mt-6 md:hidden flex items-center gap-2 w-full bg-gray-600 text-white py-3 rounded-xl justify-center hover:bg-gray-700">
            <FaPlus /> Add New Address
          </button>
        </div>

        <div className="hidden md:block md:col-span-1">
          <h1 className="text-2xl font-bold mb-6">Add New Address</h1>
          <AddressForm
            formData={formData} handleInputChange={handleInputChange} address={address} setAddress={setAddress}
            handleSelect={handleSelect} detectLocation={detectLocation} loading={loading} distanceStatus={distanceStatus}
            isDeliveryAvailable={isDeliveryAvailable} distance={distance} handleSave={handleSave}
          />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setShowForm(false)}></div>
          <div className="bg-white w-full p-6 rounded-t-3xl shadow-lg relative animate-slide-up">
            <AddressForm
              formData={formData} handleInputChange={handleInputChange} address={address} setAddress={setAddress}
              handleSelect={handleSelect} detectLocation={detectLocation} loading={loading} distanceStatus={distanceStatus}
              isDeliveryAvailable={isDeliveryAvailable} distance={distance} handleSave={handleSave}
            />
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg pointer-events-auto animate-fade-in-out">{toastMessage}</div>
        </div>
      )}
    </div>
  );
}

const AddressForm = ({ formData, handleInputChange, address, setAddress, handleSelect, detectLocation, loading, distanceStatus, isDeliveryAvailable, distance, handleSave }) => (
  <div className="space-y-2">
    <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
    <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
    <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
    <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />

    <div>
      <label className="block mb-1 font-medium text-gray-700">Address</label>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div className="relative">
            <input {...getInputProps({ placeholder: "Enter your address...", className: "w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-600 pr-10", name: 'address' })} />
            {distanceStatus === "valid" && <FaCheckCircle className="absolute right-3 top-3 text-green-500 text-xl" />}
            {distanceStatus === "invalid" && <FaTimesCircle className="absolute right-3 top-3 text-red-500 text-xl" />}
            <div className="absolute mt-1 w-full bg-white shadow rounded-lg z-10 max-h-48 overflow-y-auto">
              {loading && <div className="p-2 text-sm">Loading...</div>}
              {suggestions.map((s, i) => <div key={i} {...getSuggestionItemProps(s, { className: "p-2 cursor-pointer hover:bg-gray-100 text-sm" })}>{s.description}</div>)}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <button type="button" onClick={detectLocation} className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-gray-800 transition">
        <FaLocationArrow /> Detect Current Location
      </button>
    </div>

    {distance && (
      <p className="text-sm mt-2 text-center font-bold">
        Distance: {distance} KM{" "}
        {!isDeliveryAvailable && <span className="text-red-500 font-bold ml-2">Delivery Unavailable</span>}
      </p>
    )}

    <Input label="City" name="city" value={formData.city} onChange={handleInputChange} />
    <Input label="ZIP" name="zip" value={formData.zip} onChange={handleInputChange} />

    <div className="flex gap-4 mt-4">
      <button onClick={handleSave} className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Save</button>
      <button className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
    </div>
  </div>
);
