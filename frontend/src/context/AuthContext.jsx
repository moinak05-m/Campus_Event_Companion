import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (e.g., fetch user profile using stored token)
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // You might want to create a /api/auth/me route in backend for this
          // For now, we assume token presence = logged in, until API fails
          setUser({ email: 'user@example.com' }); // Mock user until backend /me exists
        } catch (error) {
          console.error("Token verification failed", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.data); // Assuming response.data.data is the user object
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during login' };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const response = await api.post('/auth/signup', { name, email, password, role });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during registration' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
