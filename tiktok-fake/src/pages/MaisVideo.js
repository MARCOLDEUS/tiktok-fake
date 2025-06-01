import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useUser } from '../contexts/UserContext';
import { VideoService } from '../services/VideoService';

export default function MaisVideo() {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const { user } = useUser();

  const pickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'video/*' });
    if (result.assets && result.assets.length > 0) {
      setVideoFile(result.assets[0]);
    }
  };

  const handleAddVideo = async () => {
    if (!videoFile || !title) {
      Alert.alert('Erro', 'Preencha o título e selecione um vídeo.');
      return;
    }

    await VideoService.addVideo({
      title,
      uri: videoFile.uri,
      userEmail: user.email,
    });

    Alert.alert('Sucesso', 'Vídeo adicionado com sucesso!');
    setVideoFile(null);
    setTitle('');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Título do Vídeo:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <TouchableOpacity
        onPress={pickVideo}
        style={{
          borderWidth: 2,
          borderColor: '#aaa',
          borderStyle: 'dashed',
          borderRadius: 10,
          padding: 30,
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Text>📂 Toque aqui para carregar o vídeo</Text>
        <Text style={{ fontSize: 12, color: '#555' }}>(Sem limite de tamanho)</Text>
      </TouchableOpacity>

      {videoFile && <Text style={{ marginVertical: 10 }}>{videoFile.name}</Text>}
      <Button title="Adicionar" onPress={handleAddVideo} />
    </View>
  );
}
