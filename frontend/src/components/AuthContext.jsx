import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the AuthProvider component using a NAMED EXPORT
export const AuthProvider = ({ children }) => {
    // Initialize token state from localStorage
    const [token, setToken] = useState(localStorage.getItem("authToken"));

    // This effect runs whenever the token changes.
    // It updates the default authorization header for all future axios requests.
    useEffect(() => {
        if (token) {
            localStorage.setItem("authToken", token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem("authToken");
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // Function to handle successful login
    const login = (authToken) => {
        setToken(authToken);
    };

    // Function to handle logout
    const logout = () => {
        setToken(null);
    };

    // The value provided to consuming components
    const value = {
        token,
        login,
        logout,
        isAuthenticated: !!token, // A boolean flag for convenience
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Create a custom hook to easily use the auth context in other components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

