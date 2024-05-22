class VideoService {
  constructor(VideoRepository) {
    this.VideoRepository = VideoRepository;
  }
  async getAllVideos() {
    return await this.VideoRepository.getAllVideos();
  }
  async getAllVideosForChannel(
    page = 1,
    limit = 10,
    query,
    sortBy,
    sortType,
    userId
  ) {
    return await this.VideoRepository.getAllVideosForChannel(
      page,
      limit,
      query,
      sortBy,
      sortType,
      userId
    );
  }
  async getVideoById(videoId, userId) {
    return await this.VideoRepository.getVideoById(videoId, userId);
  }
  async deleteVideo(videoId, userId) {
    return await this.VideoRepository.deleteVideo(videoId, userId);
  }
  async softDeleteVideo(videoId, userId) {
    return await this.VideoRepository.softDeleteVideo(videoId, userId);
  }

  async restoreVideo(videoId, userId) {
    return await this.VideoRepository.restoreVideo(videoId, userId);
  }

  async publishAVideo(videoData) {
    return await this.VideoRepository.publishAVideo(videoData);
  }

  async updateVideo(videoId) {
    return await this.VideoRepository.updateVideo(videoId);
  }
  async togglePublishStatus(videoId) {
    return await this.VideoRepository.togglePublishStatus(videoId);
  }
}

export { VideoService };
