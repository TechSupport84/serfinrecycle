import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "../constants/API_URL";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Fetched user:", response.data);
            setUser(response.data.user);
        } catch (error) {
            console.error("Error fetching user:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };
    
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token, user } = response.data;
            setToken(token);
            setUser(user);
            localStorage.setItem("token", token);
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await axios.post(`${API_URL}/auth/register`, userData);
        } catch (error) {
            console.error("Registration failed:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    const updateUserProfile = async (userId, updatedData) => {
        try {
            const response = await axios.put(`${API_URL}/auth/user/${userId}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data.user);
        } catch (error) {
            console.error("Profile update failed:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    const modifyPassword = async (userId, oldPassword, newPassword) => {
        try {
            await axios.put(`${API_URL}/auth/user/${userId}/password`, { oldPassword, newPassword }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error("Password update failed:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${API_URL}/auth/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            logout();
        } catch (error) {
            console.error("User deletion failed:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    const logout = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, updateUserProfile, modifyPassword, deleteUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
