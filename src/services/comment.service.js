class CommentService {
  constructor(CommentRepository) {
    this.CommentRepository = CommentRepository;
  }

  getCommentRepository() {
    return this.CommentRepository;
  }

  async getCommentById(commentId, user_id) {
    return await this.CommentRepository.getCommentById(commentId, user_id);
  }

  async getVideoComments(videoId, page, limit) {
    return await this.CommentRepository.getVideoComments(videoId, page, limit);
  }

  async addComment(content, videoId, userId) {
    return await this.CommentRepository.addComment(content, videoId, userId);
  }
  async updateComment(userId, commentId, content) {
    return await this.CommentRepository.updateComment(
      userId,
      commentId,
      content
    );
  }

  async deleteComment(commentId, userId) {
    return await this.CommentRepository.deleteComment(commentId, userId);
  }
}

export { CommentService };
