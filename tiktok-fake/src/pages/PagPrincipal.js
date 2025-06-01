import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useIsFocused } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { VideoService } from '../services/VideoService';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

export default function PagPrincipal() {
  const [videos, setVideos] = useState([]);
  const { user } = useUser();
  const isFocused = useIsFocused();
  const videoRefs = useRef({});
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const [pausedIndexes, setPausedIndexes] = useState({});

  useEffect(() => {
    async function loadVideos() {
      const data = await VideoService.getAllVideos();
      setVideos(data);
    }

    if (isFocused) {
      loadVideos();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) {
      Object.values(videoRefs.current).forEach(async (ref) => {
        if (ref?.pauseAsync) await ref.pauseAsync();
      });
    }
  }, [isFocused]);

  const togglePlayPause = async (index) => {
    const ref = videoRefs.current[index];
    if (!ref) return;

    const isPaused = pausedIndexes[index];

    if (isPaused) {
      await ref.playAsync();
    } else {
      await ref.pauseAsync();
    }

    setPausedIndexes((prev) => ({
      ...prev,
      [index]: !isPaused,
    }));
  };

  const onViewableItemsChanged = React.useRef(async ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;

      if (videoRefs.current[currentVisibleIndex]?.pauseAsync) {
        await videoRefs.current[currentVisibleIndex].pauseAsync();
      }

      if (videoRefs.current[newIndex]?.playAsync && !pausedIndexes[newIndex]) {
        await videoRefs.current[newIndex].playAsync();
      }

      setCurrentVisibleIndex(newIndex);
    }
  }).current;

  const viewabilityConfig = { itemVisiblePercentThreshold: 80 };

  const toggleLike = async (videoId) => {
    await VideoService.toggleLike(videoId, user.id);
    const updated = await VideoService.getAllVideos();
    setVideos(updated);
  };

  const renderItem = ({ item, index }) => {
    const isPaused = pausedIndexes[index];
    const isOwner = item.userId === user.id;
    const userLiked = item.likes.includes(user.id);

    return (
      <TouchableWithoutFeedback onPress={() => togglePlayPause(index)}>
        <View style={styles.videoContainer}>
          <Video
            ref={(ref) => (videoRefs.current[index] = ref)}
            source={{ uri: item.uri }}
            style={styles.video}
            resizeMode="cover"
            shouldPlay={false}
            isLooping
          />

          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => toggleLike(item.id)}>
                <Icon name={userLiked ? 'heart' : 'heart-outline'} size={30} color="red" />
              </TouchableOpacity>

              {/* Removei o navigation.navigate para perfil pois agora tem aba Perfil fixa */}
            </View>

            <Text style={styles.likes}>Curtidas: {item.likes.length}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <FlatList
      data={videos}
      keyExtractor={(item, index) => item.id || index.toString()}
      renderItem={renderItem}
      pagingEnabled
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    height: height,
    width: width,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  likes: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
    alignItems: 'center',
  },
});
