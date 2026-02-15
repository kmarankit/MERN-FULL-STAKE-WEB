// import React, { useState, useEffect } from "react";
// import { useCart } from "../../CartContext/CartContext";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import axios from "axios";
// import SuccessAnimation from "./SuccessAnimation"; // ✨ 1. Import the animation component

// const CheckoutPage = () => {
//   const { totalAmount, cartItems: rawCart, clearCart } = useCart();
//   const cartItems = rawCart.filter((ci) => ci.item);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [addressData, setAddressData] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("online");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showSummary, setShowSummary] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false); // ✨ 2. Add state to control the animation

//   const token = localStorage.getItem("authToken");
//   const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

//   // ✨ 3. Create a reusable function to handle successful orders
//   const handleOrderSuccess = (orderData) => {
//     setShowSuccess(true); // Trigger the animation
//     clearCart();

//     // Delay navigation to allow the animation to play
//     setTimeout(() => {
//       navigate("/myorder", { state: { order: orderData } });
//     }, 2500); // 2.5 seconds delay
//   };

//   // Fetch address
//   useEffect(() => {
//     const savedAddress = sessionStorage.getItem("selectedAddress");
//     if (savedAddress) {
//       setAddressData(JSON.parse(savedAddress));
//     } else {
//       navigate("/address");
//     }
//   }, [navigate]);

//   // Handle redirect after online payment
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const paymentStatus = params.get("payment_status");
//     const sessionId = params.get("session_id");

//     if (paymentStatus) {
//       setLoading(true);
//       if (paymentStatus === "success" && sessionId) {
//         axios
//           .post(
//             "http://localhost:4000/api/orders/confirm",
//             { sessionId },
//             { headers: authHeaders }
//           )
//           .then(({ data }) => {
//             // ✨ 4. Use the new success handler for online payments
//             handleOrderSuccess(data.order);
//           })
//           .catch(() => setError("Payment confirmation failed."))
//           .finally(() => setLoading(false));
//       } else if (paymentStatus === "cancel") {
//         setError("Payment was cancelled or failed.");
//         setLoading(false);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.search, authHeaders]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (showSuccess) return; // Prevent re-submission while animation is playing
//     if (!addressData) return setError("Address not found.");

//     setLoading(true);
//     setError(null);

//     const subtotal = Number(totalAmount.toFixed(2));
//     const tax = Number((subtotal * 0.05).toFixed(2));
//     const shipping = 0;
//     const total = Number((subtotal + tax + shipping).toFixed(2));

//     const payload = {
//       user: localStorage.getItem("userId"),
//       firstName: addressData.firstName,
//       lastName: addressData.lastName,
//       email: addressData.email,
//       phone: addressData.phone,
//       address: addressData.landmark,
//       city: addressData.city,
//       zipCode: addressData.zip,
//       items: cartItems.map(({ item, quantity }) => ({
//         item: {
//           name: item.name,
//           price: item.price,
//           imageUrl: item.imageUrl || "",
//         },
//         quantity,
//       })),
//       paymentMethod,
//       subtotal,
//       tax,
//       shipping,
//       total,
//     };

//     try {
//       if (!paymentMethod) return setError("Please select a payment method.");
      
//       const { data } = await axios.post(
//         "http://localhost:4000/api/orders",
//         payload,
//         { headers: authHeaders }
//       );

//       if (paymentMethod === "online") {
//         window.location.href = data.checkoutUrl;
//       } else {
//         // ✨ 5. Use the new success handler for COD payments
//         handleOrderSuccess(data.order);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Order submission failed.");
//       setLoading(false); // Only set loading false on error
//     }
//   };

//   if (!addressData) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 pb-28">
//       {/* ✨ 6. Conditionally render the success animation overlay */}
//       {showSuccess && <SuccessAnimation />}

//       <div className="max-w-5xl mx-auto px-4 pt-10">
//         <Link
//           to="/cart"
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
//         >
//           <FaArrowLeft /> Back to Cart
//         </Link>

//         <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8 lg:gap-12">
//           {/* Delivery Address */}
//           <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">
//             <h2 className="text-xl font-semibold text-green-700 text-center">
//               Delivery Address
//             </h2>
//             <div className="space-y-2">
//               <p className="text-gray-600 text-2xl font-bold">
//                 {addressData.firstName} {addressData.lastName}
//               </p>
//               <p className="flex items-center text-gray-700 text-xl">
//                 {addressData.landmark}, {addressData.city} - {addressData.zip}
//               </p>
//               <p className="flex items-center text-gray-700 text-xl">
//                 {addressData.phone}
//               </p>
//               <p className="flex items-center text-gray-700 font-bold">
//                 {addressData.distance} KM
//               </p>
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">
//             <div className="mt-2">
//               <h2 className="text-xl font-semibold text-green-600 mb-3 text-center">
//                 Payment Method
//               </h2>
//               <div className="space-y-6 text-xl">
//                 <label className="flex items-center space-x-3">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="online"
//                     checked={paymentMethod === "online"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="h-4 w-4 text-green-600 focus:ring-green-500"
//                   />
//                   <span className="text-gray-700">UPI / Credit Card / Debit Card</span>
//                 </label>
//                 <label className="flex items-center space-x-3">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="cod"
//                     checked={paymentMethod === "cod"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="h-4 w-4 text-green-600 focus:ring-green-500"
//                   />
//                   <span className="text-gray-700">Cash on Delivery</span>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Payment & Order Summary */}
//           <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 lg:col-span-2">
//             <h2
//               className="text-xl font-semibold text-green-600 cursor-pointer flex justify-between items-center"
//               onClick={() => setShowSummary(!showSummary)}
//             >
//               Order Summary
//               <span className="text-sm text-green-600">
//                 {showSummary ? "Hide" : "Show"}
//               </span>
//             </h2>

//             {showSummary && (
//               <div className="space-y-6 mt-4">
//                 <div className="space-y-4">
//                   {cartItems.map(({ _id, item, quantity }) => (
//                     <div
//                       key={_id}
//                       className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
//                     >
//                       <div>
//                         <p className="text-gray-800 font-medium">{item.name}</p>
//                         <p className="text-sm text-gray-500">x{quantity}</p>
//                       </div>
//                       <span className="text-gray-800 font-semibold">
//                         ₹{(item.price * quantity).toFixed(2)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <PaymentSummary totalAmount={totalAmount} />
//                 {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
//               </div>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* Sticky Footer Checkout Bar */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 flex justify-between items-center">
//         <div
//           className="text-gray-800 font-bold text-lg cursor-pointer"
//           onClick={() => setShowSummary(!showSummary)}
//         >
//           ₹{(totalAmount + totalAmount * 0.05).toFixed(2)}
//           <span className="ml-2 text-green-600 text-sm font-medium hover:underline">
//             {showSummary ? "Hide Detailed Bill" : "View Detailed Bill"}
//           </span>
//         </div>

//         <button
//           onClick={handleSubmit}
//           // ✨ 7. Disable button during loading AND success animation
//           disabled={loading || showSuccess}
//           className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition disabled:bg-green-300 disabled:cursor-not-allowed"
//         >
//           {loading ? "Processing..." : "Proceed to Pay"}
//         </button>
//       </div>
//     </div>
//   );
// };

// const PaymentSummary = ({ totalAmount }) => {
//   const subtotal = Number(totalAmount.toFixed(2));
//   const tax = Number((subtotal * 0.05).toFixed(2));
//   const shipping = 0;
//   const total = Number((subtotal + tax + shipping).toFixed(2));
  
//   return (
//     <div className="space-y-2 text-gray-700">
//       <div className="flex justify-between">
//         <span>Subtotal:</span>
//         <span>₹{subtotal.toFixed(2)}</span>
//       </div>
//       <div className="flex justify-between">
//         <span>Shipping:</span>
//         <span>₹{shipping.toFixed(2)}</span>
//       </div>
//       <div className="flex justify-between font-bold border-t pt-2">
//         <span>Total:</span>
//         <span>₹{total.toFixed(2)}</span>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

import React, { useState, useEffect } from "react";
import { useCart } from "../../CartContext/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import SuccessAnimation from "./SuccessAnimation";

// ✨ NEW: A stylish checkmark icon for our custom checkbox
const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
  </svg>
);

const CheckoutPage = () => {
  const { totalAmount, cartItems: rawCart, clearCart } = useCart();
  const cartItems = rawCart.filter((ci) => ci.item);
  const navigate = useNavigate();
  const location = useLocation();

  const [addressData, setAddressData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // ✨ 1. Add state to manage the terms and conditions checkbox
  const [termsAccepted, setTermsAccepted] = useState(false);

  const token = localStorage.getItem("authToken");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const handleOrderSuccess = (orderData) => {
    setShowSuccess(true);
    clearCart();
    setTimeout(() => {
      navigate("/myorder", { state: { order: orderData } });
    }, 2500);
  };

  // Fetch address
  useEffect(() => {
    const savedAddress = sessionStorage.getItem("selectedAddress");
    if (savedAddress) {
      setAddressData(JSON.parse(savedAddress));
    } else {
      navigate("/address");
    }
  }, [navigate]);

  // Handle redirect after online payment
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get("payment_status");
    const sessionId = params.get("session_id");

    if (paymentStatus) {
      setLoading(true);
      if (paymentStatus === "success" && sessionId) {
        axios
          .post(
            "http://localhost:4000/api/orders/confirm",
            { sessionId },
            { headers: authHeaders }
          )
          .then(({ data }) => {
            handleOrderSuccess(data.order);
          })
          .catch(() => setError("Payment confirmation failed."))
          .finally(() => setLoading(false));
      } else if (paymentStatus === "cancel") {
        setError("Payment was cancelled or failed.");
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, authHeaders]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✨ 2. Add a check to ensure terms are accepted before proceeding
    if (!termsAccepted) {
      setError("Please accept the Terms & Conditions to place your order.");
      // Vibrate the button or show a toast for better UX (optional)
      return;
    }

    if (showSuccess) return;
    if (!addressData) return setError("Address not found.");

    setLoading(true);
    setError(null);

    const subtotal = Number(totalAmount.toFixed(2));
    const tax = Number((subtotal * 0.05).toFixed(2));
    const shipping = 0;
    const total = Number((subtotal + tax + shipping).toFixed(2));

    const payload = {
      user: localStorage.getItem("userId"),
      firstName: addressData.firstName,
      lastName: addressData.lastName,
      email: addressData.email,
      phone: addressData.phone,
      address: addressData.landmark,
      city: addressData.city,
      zipCode: addressData.zip,
      items: cartItems.map(({ item, quantity }) => ({
        item: {
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl || "",
        },
        quantity,
      })),
      paymentMethod,
      subtotal,
      tax,
      shipping,
      total,
    };

    try {
      if (!paymentMethod) return setError("Please select a payment method.");
      
      const { data } = await axios.post(
        "http://localhost:4000/api/orders",
        payload,
        { headers: authHeaders }
      );

      if (paymentMethod === "online") {
        window.location.href = data.checkoutUrl;
      } else {
        handleOrderSuccess(data.order);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Order submission failed.");
      setLoading(false);
    }
  };

  if (!addressData) return null;

  return (
    <div className="min-h-screen bg-gray-100 pb-40 sm:pb-28">
      {showSuccess && <SuccessAnimation />}

      <div className="max-w-5xl mx-auto px-4 pt-10">
        <Link
          to="/cart"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <FaArrowLeft /> Back to Cart
        </Link>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Delivery Address */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">
            <h2 className="text-xl font-semibold text-green-700 text-center">
              Delivery Address
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600 text-2xl font-bold">
                {addressData.firstName} {addressData.lastName}
              </p>
              <p className="flex items-center text-gray-700 text-xl">
                {addressData.landmark}, {addressData.city} - {addressData.zip}
              </p>
              <p className="flex items-center text-gray-700 text-xl">
                {addressData.phone}
              </p>
              <p className="flex items-center text-gray-700 font-bold">
                {addressData.distance} KM
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">
            <div className="mt-2">
              <h2 className="text-xl font-semibold text-green-600 mb-3 text-center">
                Payment Method
              </h2>
              <div className="space-y-6 text-xl">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="text-gray-700">UPI / Credit Card / Debit Card</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="text-gray-700">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Payment & Order Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 lg:col-span-2">
            <h2
              className="text-xl font-semibold text-green-600 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSummary(!showSummary)}
            >
              Order Summary
              <span className="text-sm text-green-600">
                {showSummary ? "Hide" : "Show"}
              </span>
            </h2>

            {showSummary && (
              <div className="space-y-6 mt-4">
                <div className="space-y-4">
                  {cartItems.map(({ _id, item, quantity }) => (
                    <div
                      key={_id}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
                    >
                      <div>
                        <p className="text-gray-800 font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">x{quantity}</p>
                      </div>
                      <span className="text-gray-800 font-semibold">
                        ₹{(item.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <PaymentSummary totalAmount={totalAmount} />
              </div>
            )}
             {error && <p className="text-red-500 mt-4 text-sm font-semibold text-center">{error}</p>}
          </div>
        </form>
      </div>

      {/* ✨ 3. UPDATED Sticky Footer with Terms & Conditions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 shadow-lg p-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Left Side: Checkbox and Price */}
            <div className="w-full sm:w-auto flex flex-col items-start gap-3">
                 <label htmlFor="terms-checkbox" className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        id="terms-checkbox"
                        className="peer hidden" // Hide default checkbox
                        checked={termsAccepted}
                        onChange={() => setTermsAccepted(!termsAccepted)}
                    />
                    {/* Custom Checkbox UI */}
                    <div className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-300 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-green-500 ${termsAccepted ? 'bg-green-600 border-green-600' : 'bg-white border-gray-300'}`}>
                        {termsAccepted && <CheckIcon />}
                    </div>
                    <span className="text-sm text-gray-700 select-none">
                        I agree to the{' '}
                        <Link to="/tnc" target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium hover:underline">
                            Terms & Conditions
                        </Link>
                    </span>
                </label>
                
                <div
                    className="text-gray-800 font-bold text-lg cursor-pointer"
                    onClick={() => setShowSummary(!showSummary)}
                >
                    Total: ₹{(totalAmount + totalAmount * 0.05).toFixed(2)}
                    <span className="ml-2 text-green-600 text-sm font-medium hover:underline">
                        {showSummary ? "Hide Bill" : "View Bill"}
                    </span>
                </div>
            </div>

            {/* Right Side: Button */}
            <div className="w-full sm:w-auto">
                <button
                    onClick={handleSubmit}
                    disabled={loading || showSuccess || !termsAccepted}
                    className="w-full bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-green-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? "Processing..." : "Proceed to Pay"}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

const PaymentSummary = ({ totalAmount }) => {
  const subtotal = Number(totalAmount.toFixed(2));
  const tax = Number((subtotal * 0.05).toFixed(2));
  const shipping = 0;
  const total = Number((subtotal + tax + shipping).toFixed(2));
  
  return (
    <div className="space-y-2 text-gray-700 border-t pt-4 mt-4">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
       <div className="flex justify-between">
        <span>Taxes (5%):</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping:</span>
        <span className="text-green-600 font-medium">FREE</span>
      </div>
      <div className="flex justify-between font-bold text-lg text-black border-t pt-2 mt-2">
        <span>Total Payable:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CheckoutPage;