
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
// import { app } from '../../firebase';
// import axios from 'axios';
// import {
//   FaEnvelope,
//   FaLock,
//   FaArrowRight,
//   FaEye,
//   FaEyeSlash,
//   FaCheckCircle,
//   FaGoogle,
// } from 'react-icons/fa';

// // Toast Component
// const AwesomeToast = ({ message, icon, isError }) => (
//   <div
//     className={`animate-slide-in fixed bottom-6 right-6 flex items-center px-6 py-4 rounded-lg shadow-lg border-2 ${
//       isError ? 'bg-red-600 border-red-400 text-white' : 'bg-green-500 border-green-400 text-white'
//     }`}
//   >
//     <span className="text-2xl mr-3">{icon}</span>
//     <span className="font-semibold">{message}</span>
//   </div>
// );

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [ setFormData] = useState({ email: '', name: '', mobile:''});
//  const [mobileNumber, setMobileNumber] = useState('');
//   const [toast, setToast] = useState({ visible: false, message: '', icon: null, isError: false });
//   const navigate = useNavigate();
//   const auth = getAuth(app);

//   // Load remembered login data
//   useEffect(() => {
//     const stored = localStorage.getItem('loginData');
//     if (stored) setFormData(JSON.parse(stored));
//   }, []);

//   const toggleAuthMode = () => setIsLogin(prev => !prev);

//   const showToast = (message, isError = false) => {
//     setToast({ visible: true, message, icon: <FaCheckCircle />, isError });
//     setTimeout(() => setToast({ visible: false, message: '', icon: null, isError: false }), 2500);
//   };

 

//   // Google Login
//   const handleGoogleAuth = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const idToken = await result.user.getIdToken();

//       // Send Firebase ID token to backend
//       const res = await axios.post('http://localhost:4000/api/auth/google', { idToken });

//       // Store backend JWT & loginData
//       localStorage.setItem('authToken', res.data.token);
//       localStorage.setItem('loginData', JSON.stringify({ loggedIn: true }));
//        localStorage.setItem('UserId', result.user.uid);
//  if (additionalInfo.isNewUser) {
//         // User is new, ask for mobile number
//         showToast('Welcome! Just one more step.');
//         setTempAuthData({ idToken, user: result.user });
//         setAuthState('newUserMobileEntry');
//       } else {
//         // Existing user, log them in directly
//         const res = await axios.post('http://localhost:4000/api/auth/google', { idToken });
//         handleSuccessfulAuth(res.data.token, result.user);
//       }
// //       showToast('Google Authentication Successful!');
//       setTimeout(() => navigate('/'), 1000);
//     } catch (err) {
//       console.error('Google auth error:', err);
//       showToast(err.response?.data?.message || 'Google Authentication Failed', true);
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
//       {toast.visible && <AwesomeToast message={toast.message} icon={toast.icon} isError={toast.isError} />}

//       <div className="w-full max-w-md backdrop-blur-2xl bg-gradient-to-br from-white to-gray-400 p-8 rounded-xl shadow-lg border-4 border-gray-500 transition-all duration-300 hover:shadow-2xl">
//            {authState === 'newUserMobileEntry' ? (
//           --- New User - Mobile Entry View ---
//           <>
//             <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">One Last Step</h1>
//             <p className="text-center text-gray-500 mb-6">Please provide your mobile number to complete your profile.</p>
//             <form onSubmit={handleCompleteSignUp}>
//                 <FormInput 
//                     icon={<FaMobileAlt />}
//                     type="tel"
//                     placeholder="10-Digit Mobile Number"
//                     value={mobileNumber}
//                     onChange={(e) => setMobileNumber(e.target.value)}
//                 />
//                 <button
//                   type="submit"
//                   className="w-full py-3 mt-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
//                 >
//                   Complete Sign Up
//                 </button>
//             </form>
//           </>
//         ) : (
//           // --- Default Login View ---
//           <>
//             <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
//               Welcome Back!
//             </h1>
//             <button
//               onClick={handleGoogleAuth}
//               className="w-full py-3 bg-white text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-3 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all"
//             >
//               <FaGoogle className="text-red-500" /> Continue with Google
//             </button>
//              <div className="mt-6 text-center">
//                <p className="text-sm text-gray-400">
//                  By continuing, you agree to our Terms of Service.
//                </p>
//              </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Auth;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { app } from '../../firebase';
// import axios from 'axios';
// import { FaCheckCircle, FaGoogle } from 'react-icons/fa';
// import { apiUrl } from '../../config/api';

// // Toast Component
// const AwesomeToast = ({ message, icon, isError }) => (
//   <div
//     className={`animate-slide-in fixed bottom-6 right-6 flex items-center px-6 py-4 rounded-lg shadow-lg border-2 ${
//       isError ? 'bg-red-600 border-red-400 text-white' : 'bg-green-500 border-green-400 text-white'
//     }`}
//   >
//     <span className="text-2xl mr-3">{icon}</span>
//     <span className="font-semibold">{message}</span>
//   </div>
// );

// const Auth = () => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [toast, setToast] = useState({ visible: false, message: '', icon: null, isError: false });
//   const [authState, setAuthState] = useState('login'); // login | newUserMobileEntry
//   const [tempAuthData, setTempAuthData] = useState(null);

//   const navigate = useNavigate();
//   const auth = getAuth(app);

//   const showToast = (message, isError = false) => {
//     setToast({ visible: true, message, icon: <FaCheckCircle />, isError });
//     setTimeout(() => setToast({ visible: false, message: '', icon: null, isError: false }), 2500);
//   };

//   const handleGoogleAuth = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const idToken = await result.user.getIdToken();

//       // check new user
//       const isNewUser = result._tokenResponse?.isNewUser;

//    if (isNewUser) {
//   showToast('Welcome! Please provide your mobile number.');
//   setTempAuthData({
//     idToken,
//     user: {
//       uid: result.user.uid,
//       username: result.user.displayName, // ✅ match backend field
//       email: result.user.email,
//     },
//   });
//   setAuthState('newUserMobileEntry');
//   return;
// }


//       // Existing user → send to backend
//       // const res = await axios.post(apiUrl('/api/auth/google'), { idToken });
//       const res= await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google`, { idToken })

//       localStorage.setItem('authToken', res.data.token);
//       localStorage.setItem('loginData', JSON.stringify({ loggedIn: true }));
//       localStorage.setItem('UserId', res.data.userId);

//       showToast('Google Authentication Successful!');
//       setTimeout(() => navigate('/'), 1000);
//     } catch (err) {
//       console.error('Google auth error:', err);
//       showToast(err.response?.data?.message || 'Google Authentication Failed', true);
//     }
//   };

//   // complete signup with mobile, name, email
// const handleCompleteSignUp = async (e) => {
//   e.preventDefault();
//   if (!tempAuthData) return;

//   try {
//     const res = await axios.post(apiUrl("/api/users/register"), {
//       username: tempAuthData.user.username,
//       email: tempAuthData.user.email,
//       mobile: mobileNumber,
//       firebaseId: tempAuthData.user.uid,   // ✅ Firebase UID
//     });

//     localStorage.setItem("authToken", res.data.token);
//     localStorage.setItem("loginData", JSON.stringify({ loggedIn: true }));
//     localStorage.setItem('UserId', res.data.userId);

//     showToast("Profile completed successfully!");
//     setTimeout(() => navigate("/"), 1000);
//   } catch (err) {
//     console.error("Complete signup error:", err);
//     showToast(err.response?.data?.message || "Failed to complete signup", true);
//   }
// };
// return (
//     <div className="flex items-center justify-center  p-4">
//       {toast.visible && <AwesomeToast message={toast.message} icon={toast.icon} isError={toast.isError} />}

//       <div className="w-full max-w-md backdrop-blur-2xl bg-gradient-to-br from-white to-gray-400 p-8 rounded-xl shadow-lg border-2 border-white">
//         {authState === 'newUserMobileEntry' ? (
//           <>
//             <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">One Last Step</h1>
//             <p className="text-center text-gray-500 mb-6">Please provide your mobile number.</p>
//             <form onSubmit={handleCompleteSignUp}>
//               <input
//                 type="tel"
//                 placeholder="10-Digit Mobile Number"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 className="w-full border p-3 rounded-lg mb-4"
//               />
//               <button
//                 type="submit"
//                 className="w-full py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-all"
//               >
//                 Complete Sign Up
//               </button>
//             </form>
//           </>
//         ) : (
//           <>
//             <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-[#e6002b] font-['Nunito']">
//               Welcome Back!
//             </h1>
//             <button
//               onClick={handleGoogleAuth}
//               className="w-full py-3 bg-white text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-3 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all"
//             >
//               <FaGoogle className="text-red-500" /> Continue with Google
//             </button>
//             <div className="mt-6 text-center">
//               {/* <p className="text-sm text-gray-900">By continuing, you agree to our Terms of Service.</p> */}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Auth;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mpin, setMpin] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isSignup
        ? `${import.meta.env.VITE_API_URL}/api/auth/signup`
        : `${import.meta.env.VITE_API_URL}/api/auth/login`;

      const payload = isSignup
        ? { name, phone, mpin }
        : { phone, mpin };

      const res = await axios.post(url, payload);

      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      // Success animation trigger
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1800);
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-white to-orange-200 px-4">

      {/* Success Animation Overlay */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-green-500 animate-successSpread z-50">
          <div className="bg-white rounded-full p-8 animate-popIn shadow-2xl">
            <FaCheck className="text-green-500 text-6xl" />
          </div>
        </div>
      )}

      <div className="w-full max-w-md backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-8 transition-all duration-500">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <p className="text-center text-gray-500 mb-6">
          {isSignup
            ? "Sign up to continue ordering delicious food 🍛"
            : "Login with your mobile & MPIN"}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">

          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none transition"
              required
            />
          )}

          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none transition"
            required
          />

          <input
            type="password"
            maxLength="4"
            placeholder="4 Digit MPIN"
            value={mpin}
            onChange={(e) => setMpin(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none transition tracking-widest text-center text-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Sign Up"
              : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-amber-600 hover:underline font-medium"
          >
            {isSignup
              ? "Already have an account? Login"
              : "New user? Create account"}
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes successSpread {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-successSpread {
          animation: successSpread 0.6s ease-out forwards;
        }

        @keyframes popIn {
          0% { transform: scale(0); }
          80% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .animate-popIn {
          animation: popIn 0.5s ease-out forwards;
        }
      `}</style>

    </div>
  );
};

export default Auth;
