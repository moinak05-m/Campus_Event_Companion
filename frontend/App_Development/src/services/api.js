import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// In a real app, use environment variables. For hackathon, replace with your local IP when testing on a physical device.
// Example: http://192.168.1.5:5000/api
const API_URL = 'http://localhost:5000/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject the JWT token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
