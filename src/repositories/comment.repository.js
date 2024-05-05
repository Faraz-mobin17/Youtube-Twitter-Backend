class CommentRepository {
  constructor(db) {
    this.db = db;
  }

  // Retrieve all comments for a given video by its ID
  async getVideoComments(id) {
    try {
      const comments = await this.db.executeQuery(
        "SELECT content FROM comments WHERE video_id = ?",
        [id]
      );
      return comments;
    } catch (error) {
      console.error("Failed to get comments:", error);
      throw error;
    }
  }

  // Add a new comment
  async addComment(user_id, content, video_id) {
    try {
      const result = await this.db.executeQuery(
        "INSERT INTO comments (user_id, content, video_id) VALUES (?, ?, ?)",
        [user_id, content, video_id]
      );
      return result;
    } catch (error) {
      console.error("Failed to add comment:", error);
      throw error;
    }
  }

  // Update an existing comment by its ID
  async updateComment(content, id) {
    try {
      const result = await this.db.executeQuery(
        "UPDATE comments SET content = ? WHERE id = ?",
        [content, id]
      );
      return result;
    } catch (error) {
      console.error("Failed to update comment:", error);
      throw error;
    }
  }

  // Delete a comment by its ID
  async deleteComment(id) {
    try {
      const result = await this.db.executeQuery(
        "DELETE FROM comments WHERE id = ?",
        [id]
      );
      return result;
    } catch (error) {
      console.error("Failed to delete comment:", error);
      throw error;
    }
  }
}
export { CommentRepository };
