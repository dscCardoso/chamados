import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          navigation.replace('Auth');
          return;
        }

        // valida token no backend (opcional mas profissional)
        await api.get('/health', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        navigation.replace('App');

      } catch (error) {
        console.log('Token inválido');
        await AsyncStorage.removeItem('token');
        navigation.replace('Auth');
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}