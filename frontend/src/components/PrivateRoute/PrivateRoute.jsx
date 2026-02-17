// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//     const isAuthenticated = Boolean(localStorage.getItem('loginData'));
//     return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Check for token (new manual auth) or loginData (old Firebase auth)
  const token = localStorage.getItem('token') || localStorage.getItem('authToken');
  const isAuthenticated = Boolean(token);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
