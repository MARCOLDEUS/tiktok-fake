// src/services/VideoService.js
let videos = [];

export const VideoService = {
  addVideo(video) {
    const newVideo = {
      ...video,
      id: Date.now().toString(),
      likes: [],
    };
    videos.push(newVideo);
    return Promise.resolve(newVideo);
  },

  getAllVideos() {
    return Promise.resolve(videos);
  },

  getVideosByUser(email) {
    return Promise.resolve(videos.filter(v => v.userEmail === email));
  },

  deleteVideo(id, userEmail) {
    const index = videos.findIndex(v => v.id === id && v.userEmail === userEmail);
    if (index !== -1) {
      videos.splice(index, 1);
    }
    return Promise.resolve();
  },

  likeVideo(videoId, userEmail) {
    const video = videos.find(v => v.id === videoId);
    if (video && !video.likes.includes(userEmail)) {
      video.likes.push(userEmail);
    }
    return Promise.resolve();
  },

  unlikeVideo(videoId, userEmail) {
    const video = videos.find(v => v.id === videoId);
    if (video) {
      video.likes = video.likes.filter(email => email !== userEmail);
    }
    return Promise.resolve();
  },
};
