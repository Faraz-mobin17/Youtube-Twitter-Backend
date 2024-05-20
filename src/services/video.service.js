class VideoService {
  constructor(VideoRepository) {
    this.VideoRepository = VideoRepository;
  }
  async deleteVideo(videoId, userId) {
    return this.VideoRepository.deleteVideo(videoId, userId);
  }
  async softDeleteVideo(videoId, userId) {
    return this.VideoRepository.softDeleteVideo(videoId, userId);
  }

  async restoreVideo(videoId, userId) {
    return this.VideoRepository.restoreVideo(videoId, userId);
  }
}

export { VideoService };
