/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// TELAS
import Home from './src/screens/Home';
import NovoChamado from './src/screens/NovoChamado';
import Clientes from './src/screens/Clientes';
import NovoCliente from './src/screens/NovoCliente';
import EditarChamado from './src/screens/EditarChamado';
import EditarCliente from './src/screens/EditarCliente';

// NOVAS TELAS
import LoginScreen from './src/screens/LoginScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';

const Stack = createNativeStackNavigator();

// 🔒 APP (LOGADO)
function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chamados" component={Home} />
      <Stack.Screen name="NovoChamado" component={NovoChamado} />
      <Stack.Screen name="Clientes" component={Clientes} />
      <Stack.Screen name="NovoCliente" component={NovoCliente} />
      <Stack.Screen name="EditarCliente" component={EditarCliente} />
      <Stack.Screen name="EditarChamado" component={EditarChamado} />
    </Stack.Navigator>
  );
}

// 🔓 LOGIN
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">

        <Stack.Screen 
          name="AuthLoading" 
          component={AuthLoadingScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="App" 
          component={AppStack} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="Auth" 
          component={AuthStack} 
          options={{ headerShown: false }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}