import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // Will store { id, name, role }

  // Check if user is already logged in
  const checkLoginState = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      
      if (token && storedUserInfo) {
        setUserToken(token);
        setUserInfo(JSON.parse(storedUserInfo));
      }
    } catch (e) {
      console.log(`Login check error ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginState();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data && response.data.token) {
        const { token, user } = response.data;
        setUserToken(token);
        setUserInfo(user);
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password, role = 'student') => {
    try {
      setIsLoading(true);
      const response = await api.post('/auth/signup', { name, email, password, role });
      
      if (response.data && response.data.token) {
        const { token, user } = response.data;
        setUserToken(token);
        setUserInfo(user);
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ login, signup, logout, isLoading, userToken, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
