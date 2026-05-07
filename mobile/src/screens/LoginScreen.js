import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { COLORS } from '../theme/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email,
        senha,
      });

      if (response.data?.token) {
        await AsyncStorage.setItem('token', response.data.token);

        console.log('TOKEN SALVO:', response.data.token);

        navigation.replace('App');
      } else {
        Alert.alert('Erro', 'Resposta inválida do servidor');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Usuário ou senha inválidos');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>DeskControl</Text>

      <Text style={styles.subtitle}>
        Gestão inteligente de chamados
      </Text>

      <View style={styles.card}>

        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    padding: 24,
  },

  logo: {
    fontSize: 38,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginTop: 8,
    marginBottom: 40,
    fontSize: 16,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 24,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 4,
  },

  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: COLORS.border,

    padding: 16,
    borderRadius: 12,

    marginBottom: 16,

    fontSize: 15,
    color: COLORS.text,
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});