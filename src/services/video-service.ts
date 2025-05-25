import { VideoRepository } from "../repositories/video-repository.js";

const videoRepository = new VideoRepository();

async function getAllVideos(
  page = 1,
  limit = 10,
  query,
  sortBy,
  sortType,
  userId
) {
  return await videoRepository.getAllVideos(
    page,
    limit,
    query,
    sortBy,
    sortType,
    userId
  );
}
async function getVideoById(videoId, userId) {
  return await videoRepository.getVideoById(videoId, userId);
}
async function deleteVideo(videoId, userId) {
  return await videoRepository.deleteVideo(videoId, userId);
}
async function publishAVideo(videoDetails) {
  return await videoRepository.publishAVideo(videoDetails);
}
async function updateVideo(videoId, title, description) {
  return await videoRepository.updateVideo(videoId, title, description);
}

async function togglePublishStatus(videoId, isPublished) {
  return await videoRepository.togglePublishStatus(videoId, isPublished);
}

export {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
};
