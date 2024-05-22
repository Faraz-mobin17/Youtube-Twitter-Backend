class VideoRepository {
  constructor(db) {
    this.db = db;
  }

  async getAllVideos() {
    try {
      const query = `SELECT * FROM videos`;
      return await this.db.executeQuery(query);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllVideosForChannel(
    page = 1,
    limit = 10,
    searchQuery,
    sortBy = "id",
    sortType = "ASC",
    userId
  ) {
    try {
      const offset = (page - 1) * limit;
      const query = `SELECT * FROM videos WHERE user_id = ? AND title LIKE ? ORDER BY ${sortBy} ${sortType} LIMIT ? OFFSET ?`;
      const values = [userId, `%${searchQuery}%`, limit, offset];
      return await this.db.executeQuery(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getVideoById(videoId, userId) {
    try {
      const query = `SELECT FROM videos WHERE id = ? AND user_id = ?`;
      return await this.db.executeQuery(query, [videoId, userId]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async publishAVideo(videoData) {
    try {
      // Save video data to the database
      const query = `INSERT INTO videos (title, description, url, user_id) VALUES (?, ?, ?, ?)`;
      const values = [
        videoData.title,
        videoData.description,
        videoData.url,
        videoData.user_id,
      ];
      return await this.db.executeQuery(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateVideo(req) {
    try {
      const { videoId } = req.params;
      const { title, description, thumbnail } = req.body;

      // Construct the SQL query to update video details
      const query = `UPDATE videos SET title = ?, description = ?, thumbnail = ? WHERE id = ? AND user_id = ?`;
      const values = [title, description, thumbnail, videoId, req.user.id];

      // Execute the query
      return await this.db.executeQuery(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async togglePublishStatus(videoId, userId) {
    try {
      // First, retrieve the current publication status of the video
      const getStatusQuery = `SELECT is_published FROM videos WHERE id = ? AND user_id = ?`;
      const currentStatus = await this.db.executeQuery(getStatusQuery, [
        videoId,
        userId,
      ]);

      if (currentStatus.length === 0) {
        throw new Error("Video not found");
      }

      // Toggle the publication status
      const newStatus = !currentStatus[0].is_published;

      // Update the publication status in the database
      const updateStatusQuery = `UPDATE videos SET is_published = ? WHERE id = ? AND user_id = ?`;
      await this.db.executeQuery(updateStatusQuery, [
        newStatus,
        videoId,
        userId,
      ]);

      return {
        success: true,
        message: "Publication status toggled successfully.",
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
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
