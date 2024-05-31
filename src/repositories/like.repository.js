class LikeRepository {
  constructor(db) {
    this.db = db;
  }

  async toggleVideoLike(videoId, userId) {
    try {
      const fetchLikes =
        "SELECT likedBy from likes WHERE video_id = ? AND user_id = ?";
      let likes = await this.db.executeQuery(fetchLikes, [videoId, userId]);
      console.log(likes);
      likes = likes[0].likedBy === 0 ? 1 : 0;
      const query = `UPDATE likes SET likedBy = ? WHERE video_id = ? AND user_id = ?`;
      const response = await this.db.executeQuery(query, [
        likes,
        videoId,
        userId,
      ]);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async toggleCommentLike(commentId, userId) {
    try {
      const fetchLikes =
        "SELECT likedBy from likes WHERE comment_id = ? AND user_id = ?";
      let likes = await this.db.executeQuery(fetchLikes, [commentId, userId]);
      console.log(likes);
      likes = likes[0].likedBy === 0 ? 1 : 0;
      const query = `UPDATE likes SET likedBy = ? WHERE comment_id = ? AND user_id = ?`;
      const response = await this.db.executeQuery(query, [
        likes,
        commentId,
        userId,
      ]);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getLikedVideos(userId) {
    try {
      const query = `SELECT video_id from likes WHERE user_id = ? AND likedBy = 1`;
      const response = await this.db.executeQuery(query, [userId]);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export { LikeRepository };
