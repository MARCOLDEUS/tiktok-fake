import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  // Carrega o usuário salvo no AsyncStorage ao iniciar o app
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('loggedUser');
        if (storedUser) {
          setUserState(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao carregar usuário do AsyncStorage:', error);
      }
    };

    loadUser();
  }, []);

  // Salva ou remove o usuário no AsyncStorage e atualiza o estado
  const setUser = async (userData) => {
    try {
      if (userData) {
        await AsyncStorage.setItem('loggedUser', JSON.stringify(userData));
      } else {
        await AsyncStorage.removeItem('loggedUser');
      }
      setUserState(userData);
    } catch (error) {
      console.error('Erro ao atualizar o usuário no AsyncStorage:', error);
    }
  };

  // Remove o usuário do AsyncStorage e limpa o estado
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('loggedUser');
      setUserState(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
