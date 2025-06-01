import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useUser } from '../contexts/UserContext';
import { VideoService } from '../services/VideoService';

export default function PagUsuario({ navigation }) {
  const { user } = useUser();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const userVideos = await VideoService.getVideosByUser(user.email);
      setVideos(userVideos);
    };
    fetchVideos();
  }, []);

  const handleDelete = async (videoId) => {
    await VideoService.deleteVideo(videoId, user.email);
    const updated = await VideoService.getVideosByUser(user.email);
    setVideos(updated);
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Meus Vídeos</Text>
      <FlatList
        data={videos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
            <Text>Curtidas: {item.likes.length}</Text>
            <Button title="Excluir" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: 'red',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginTop: 20
        }}
      >
        <Text style={{ color: '#fff' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
