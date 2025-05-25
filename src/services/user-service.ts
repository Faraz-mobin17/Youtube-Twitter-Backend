import { UserRepository } from "../repositories/index.js";

const userRepository = new UserRepository();

async function getAllUsers() {
  return await userRepository.getAll();
}

async function getUser(id: number) {
  return await userRepository.getById(id);
}

async function updateUser(params: object, id: number) {
  return await userRepository.update(id, params);
}

async function deleteUser(id: number) {
  return await userRepository.delete(id);
}

async function getUserChannelProfile(username: string) {
  return await userRepository.getUserChannelProfile(username);
}

async function getWatchHistory(username: string) {
  return await userRepository.getWatchHistory(username);
}

async function updateAvatar(id: number, avatar: object) {
  return await userRepository.update(id, avatar);
}
async function updateCoverImage(id: number, coverImage: object) {
  return await userRepository.update(id, coverImage);
}

export {
  deleteUser,
  getAllUsers,
  getUser,
  getUserChannelProfile,
  getWatchHistory,
  updateAvatar,
  updateCoverImage,
  updateUser,
};
