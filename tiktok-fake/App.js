import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import Registrar from './src/pages/Registrar';
import PagPrincipal from './src/pages/PagPrincipal';
import MainTabs from './src/pages/MainTabs';
import { UserProvider, useUser } from './src/contexts/UserContext';

const Stack = createNativeStackNavigator();

function AppRoutes() {
  const { user } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registrar" component={Registrar} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </UserProvider>
  );
}
