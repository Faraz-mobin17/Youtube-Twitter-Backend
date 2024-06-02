class VideoService {
  constructor(VideoRepository) {
    this.VideoRepository = VideoRepository;
  }
  async getAllVideos(page = 1, limit = 10, query, sortBy, sortType, userId) {
    return await this.VideoRepository.getAllVideos(
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
  async publishAVideo(videoDetails) {
    return await this.VideoRepository.publishAVideo(videoDetails);
  }
  async updateVideo(videoId, title, description) {
    return await this.VideoRepository.updateVideo(videoId, title, description);
  }

  async togglePublishStatus(videoId, isPublished) {
    return await this.VideoRepository.togglePublishStatus(videoId, isPublished);
  }
}

export { VideoService };
