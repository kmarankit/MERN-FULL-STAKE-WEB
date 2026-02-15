// import React, { useState } from "react";
// import GoogleAuthWithPhone from "./GoogleAuthWithPhone";
// import { useNavigate } from "react-router-dom"; // Import the hook

// const LoginSignUp = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate(); // ✅ Initialize navigate here

//   // Called when login/register succeeds
//   const handleLoginSuccess = (data) => {
//     console.log("✅ User logged in:", data);

//     // Store token/user in localStorage
//     if (data?.token) {
//       localStorage.setItem("authToken", data.token);
//     }
//     localStorage.setItem("user", JSON.stringify(data.user || data));

//     setUser(data.user || data);

//     // Redirect to dashboard
//     navigate("/"); // ✅ Now this works
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       {!user ? (
//         <GoogleAuthWithPhone onLoginSuccess={handleLoginSuccess} />
//       ) : (
//         <div className="bg-white p-6 rounded shadow-md">
//           <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
//           <p className="text-gray-600">{user.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginSignUp;
