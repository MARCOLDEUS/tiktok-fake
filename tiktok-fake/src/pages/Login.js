import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../contexts/UserContext';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    try {
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        Alert.alert('Erro', 'Email ou senha incorretos');
        return;
      }

      setUser(foundUser);
      navigation.reset({ index: 0, routes: [{ name: 'PagPrincipal' }] });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Erro ao acessar os dados');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Registrar-se" onPress={() => navigation.navigate('Registrar')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 5 },
});
