class VideoRepository {
  constructor(db) {
    this.db = db;
  }

  async getAllVideos(
    page = 1,
    limit = 10,
    searchQuery,
    sortBy = "id",
    sortType = "ASC",
    userId
  ) {
    try {
      const offset = (page - 1) * limit;
      const query = `SELECT * FROM videos WHERE title LIKE ? ORDER BY ${sortBy} ${sortType} LIMIT ? OFFSET ?`;
      const values = [`%${searchQuery}%`, limit, offset];
      return await this.db.executeQuery(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getVideoById(videoId, userId) {
    try {
      const query = `SELECT * FROM videos WHERE id = ? AND user_id = ?`;
      const values = [videoId, userId];
      return await this.db.executeQuery(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deleteVideo(videoId, userId) {
    try {
      const query = `DELETE FROM videos WHERE id = ? AND user_id = ?`;
      const values = [videoId, userId];
      return await this.db.executeQuery(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async publishAVideo(videoDetails) {
    try {
      const query = `INSERT INTO videos (user_id,videoFile,thumbnail,title,description,duration,views,isPublished) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        videoDetails.userId,
        videoDetails.videoFile,
        videoDetails.thumbnail,
        videoDetails.title,
        videoDetails.description,
        videoDetails.duration,
        videoDetails.views,
        videoDetails.isPublished,
      ];
      return await this.db.executeQuery(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateVideo(videoId, title, description) {
    try {
      const query = `UPDATE videos SET title = ?, description = ? WHERE id = ?`;
      const values = [title, description, videoId];
      return await this.db.executeQuery(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async togglePublishStatus(videoId, isPublished) {
    try {
      const query = `UPDATE videos SET isPublished = ? WHERE id = ?`;
      const values = [isPublished, videoId];
      return await this.db.executeQuery(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export { VideoRepository };
