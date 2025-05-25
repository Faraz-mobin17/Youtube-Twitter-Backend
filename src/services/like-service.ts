class LikeService {
  constructor(LikeRepository) {
    this.LikeRepository = LikeRepository;
  }
  async toggleVideoLike(videoId, userId) {
    return this.LikeRepository.toggleVideoLike(videoId, userId);
  }
  async toggleCommentLike(commentId, userId) {
    return this.LikeRepository.toggleCommentLike(commentId, userId);
  }
  async getLikedVideos(userId) {
    return this.LikeRepository.getLikedVideos(userId);
  }
}

export { LikeService };
