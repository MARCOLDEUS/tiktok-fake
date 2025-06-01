import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Registrar({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      const userExists = users.find(user => user.email === email);
      if (userExists) {
        Alert.alert('Erro', 'Email já cadastrado');
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
      };

      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      Alert.alert('Sucesso', 'Usuário registrado com sucesso');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      Alert.alert('Erro', 'Erro ao salvar o usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 5 },
});
