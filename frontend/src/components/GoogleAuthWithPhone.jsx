// import React, { useState } from "react";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { app } from "../firebase.js";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { CheckCircle2 } from "lucide-react";

// const auth = getAuth(app);

// const GoogleAuthWithPhone = ({ onLoginSuccess }) => {
//   const [userData, setUserData] = useState(null);
//   const [showPhoneInput, setShowPhoneInput] = useState(false);
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   // Google login
//   const handleGoogleSignIn = async () => {
//     setLoading(true);
//     const provider = new GoogleAuthProvider();

//     try {
//       const result = await signInWithPopup(auth, provider);
//       const firebaseUser = result.user;

//       const response = await axios.post(
//         "http://localhost:4000/api/users/googlelogin",
//         {
//           email: firebaseUser.email,
//           username: firebaseUser.displayName,
//         }
//       );

//       if (response.data.newUser) {
//         setUserData({
//           email: firebaseUser.email,
//           username: firebaseUser.displayName,
//         });
//         setShowPhoneInput(true);
//       } else if (response.data.success) {
//         localStorage.setItem("authToken", response.data.token);
//         localStorage.setItem("userId", response.data.userId);
//         localStorage.setItem(
//           "username",
//           response.data.username || firebaseUser.displayName
//         );
//         localStorage.setItem("email", response.data.email || firebaseUser.email);

//         setSuccess(true);
//         setTimeout(() => {
//           if (typeof onLoginSuccess === "function") {
//             onLoginSuccess(response.data);
//           }
//         }, 1500);
//       }
//     } catch (err) {
//       console.error("Google login error:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Phone submit
//   const handlePhoneSubmit = async () => {
//     if (!phone) return alert("Enter your phone number");
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/users/register",
//         {
//           email: userData.email,
//           username: userData.username,
//           phone,
//         }
//       );

//       if (response.data.success) {
//         localStorage.setItem("authToken", response.data.token);
//         localStorage.setItem("userId", response.data.userId);
//         localStorage.setItem("username", userData.username);
//         localStorage.setItem("email", userData.email);
//         localStorage.setItem("phone", phone);

//         setSuccess(true);
//         setTimeout(() => {
//           if (typeof onLoginSuccess === "function") {
//             onLoginSuccess(response.data);
//           }
//         }, 1500);
//       } else {
//         alert(response.data.message);
//       }
//     } catch (err) {
//       console.error("Register error:", err);
//       alert(err.response?.data?.message || "Registration failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center gap-6 p-8 bg-white rounded-2xl shadow-lg w-[350px] mx-auto mt-12 transition-all">
//       <AnimatePresence>
//         {success && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-2xl z-20"
//           >
//             <CheckCircle2 className="text-green-600 w-20 h-20" />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {!showPhoneInput ? (
//         <>
//           <h2 className="text-2xl font-bold text-gray-700">
//             Sign In / Sign Up
//           </h2>
//           <button
//             onClick={handleGoogleSignIn}
//             className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all shadow-md w-full flex items-center justify-center gap-2"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Continue with Google"}
//           </button>
//         </>
//       ) : (
//         <>
//           <h2 className="text-2xl font-semibold text-gray-700 text-center">
//             Enter Your Phone Number
//           </h2>
//           <input
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Phone number"
//             className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
//           />
//           <button
//             onClick={handlePhoneSubmit}
//             className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all shadow-md"
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </>
//       )}
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//     </div>
//   );
// };

// export default GoogleAuthWithPhone;
