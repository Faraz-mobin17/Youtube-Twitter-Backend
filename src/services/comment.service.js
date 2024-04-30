class CommentService {
  constructor(CommentRepository) {
    this.CommentRepository = CommentRepository;
  }

  async getVideoComments(videoId, page, limit) {
    return await this.CommentRepository.getVideoComments(videoId, page, limit);
  }

  async addComment(content) {
    return await this.CommentRepository.addComment(content);
  }
  async updateComment(commentId, commentData) {
    return await this.CommentRepository.updateComment(commentId, commentData);
  }

  async deleteComment(commentId) {
    return await this.CommentRepository.deleteComment(commentId);
  }
}

export { CommentService };
