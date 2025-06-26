import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './auth';

const ProtectedRoute = ({ children }) => {
    console.log(" getToken() -->"+getToken());
  return getToken() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
