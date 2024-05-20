class VideoRepository {
  constructor(db) {
    this.db = db;
  }

  async getAllVideos(userId, isPremium) {
    let query = `SELECT * FROM videos WHERE is_deleted = FALSE`;
    if (isPremium) {
      query = `SELECT * FROM videos`;
    }
    return await this.db.executeQuery(query);
  }

  async getVideoById(videoId, userId, isPremium) {
    let query = `SELECT * FROM videos WHERE id = ? AND is_deleted = FALSE`;
    if (isPremium) {
      query = `SELECT * FROM videos WHERE id = ?`;
    }
    return await this.db.executeQuery(query, [videoId]);
  }

  async deleteVideo(videoId, userId) {
    // TODO: delete a video with userid and videoid
    try {
      const query = `DELETE FROM Videos WHERE id = ? AND user_id = ? AND is_premium = FALSE`;
      return this.db.executeQuery(query, [videoId, userId]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async softDeleteVideo(videoId, userId) {
    try {
      const query = `UPDATE videos SET is_deleted = TRUE WHERE id = ? AND user_id = ?`;
      return await this.db.executeQuery(query, [videoId, userId]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async restoreVideo(videoId, userId) {
    try {
      const query = `UPDATE videos SET is_deleted = FALSE WHERE id = ? AND user_id = ?`;
      return await this.db.executeQuery(query, [videoId, userId]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export { VideoRepository };
