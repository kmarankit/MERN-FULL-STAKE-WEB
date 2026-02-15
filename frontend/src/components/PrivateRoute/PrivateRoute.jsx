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
  const isAuthenticated = Boolean(localStorage.getItem('loginData'));

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
