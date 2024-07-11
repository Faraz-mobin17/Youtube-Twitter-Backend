import { CommentRepository } from "../repositories/comment-repository.js";

const commentRepository = new CommentRepository();

async function getCommentById() {
  return await commentRepository.getById();
}

async function getVideoComments() {
  return await commentRepository.getVideoComments();
}

async function addComment() {
  return await commentRepository.create();
}
async function updateComment() {
  return await commentRepository.update();
}

async function deleteComment() {
  return await commentRepository.delete();
}

export {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
  getCommentById,
};
