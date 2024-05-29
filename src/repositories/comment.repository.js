class CommentRepository {
  constructor(db) {
    this.db = db;
  }

  getDb() {
    return this.db;
  }

  async getCommentById(commentId, userId) {
    try {
      const result = await this.db.executeQuery(
        "SELECT * FROM comments WHERE id = ? AND user_id = ?",
        [commentId, userId]
      );
      return result;
    } catch (error) {
      console.error("Failed to get comment:", error);
      throw error;
    }
  }

  // TODO: Get all the comments for a video by its ID and page and limit
  async getVideoComments(videoId, page, limit) {
    try {
      console.log("video id: ", videoId, "page: ", page, " limit: ", limit);
      const offset = (page - 1) * limit;
      console.log(offset);
      const query = `SELECT * FROM comments WHERE video_id = ? LIMIT ${limit} OFFSET ${offset}`;
      const params = [videoId];

      const result = await this.db.executeQuery(query, params);
      return result;
    } catch (error) {
      console.error("Failed to get comments:", error);
      throw error;
    }
  }

  // Add a new comment
  async addComment(content, video_id, user_id) {
    try {
      const result = await this.db.executeQuery(
        "INSERT INTO comments (user_id,video_id,content) VALUES (?, ?, ?)",
        [user_id, video_id, content]
      );
      return result;
    } catch (error) {
      console.error("Failed to add comment:", error);
      throw error;
    }
  }

  // Update an existing comment by its ID
  async updateComment(userId, commentId, content) {
    try {
      const result = await this.db.executeQuery(
        "UPDATE comments SET content = ? WHERE id = ? AND  user_id = ?;",
        [content, commentId, userId]
      );
      return result;
    } catch (error) {
      console.error("Failed to update comment:", error);
      throw error;
    }
  }

  // Delete a comment by its ID
  async deleteComment(commentId, userId) {
    try {
      const result = await this.db.executeQuery(
        "DELETE FROM comments WHERE id = ? AND user_id = ?",
        [commentId, userId]
      );
      return result;
    } catch (error) {
      console.error("Failed to delete comment:", error);
      throw error;
    }
  }
}
export { CommentRepository };
