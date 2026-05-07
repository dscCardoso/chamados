import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000'
});

api.interceptors.response.use(
  response => response,
  async error => {

    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
    }

    return Promise.reject(error);
  }
);

export default api;