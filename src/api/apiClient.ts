import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'https://mira-ai.marioxsoftware.net/karma-user-auth', // 🔁 change this
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Attach token automatically
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;