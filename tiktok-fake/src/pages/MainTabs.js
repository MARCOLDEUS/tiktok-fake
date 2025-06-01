import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PagPrincipal from './PagPrincipal';
import PagUsuario from './PagUsuario';
import MaisVideos from './MaisVideo';
import { Button } from 'react-native';
import { useUser } from '../contexts/UserContext';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { setUser } = useUser();

  const handleLogout = async () => {
    setUser(null); // volta para a tela de login automaticamente
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <Button title="Sair" onPress={handleLogout} />
        ),
      }}
    >
      <Tab.Screen name="Home" component={PagPrincipal} />
      <Tab.Screen name="Meus Vídeos" component={PagUsuario} />
      <Tab.Screen name="Mais Vídeos" component={MaisVideos} />
    </Tab.Navigator>
  );
}
