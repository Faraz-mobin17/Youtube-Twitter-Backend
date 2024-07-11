import { ApiError } from "../utils/api-handler.js";
import AuthService from "../middlewares/authservice-middleware.js";
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../repositories/index.js";

const userRepository = new UserRepository();

class UserService {
  async registerUser({
    username,
    email,
    firstname,
    lastname,
    avatar,
    coverImage,
    password,
  }) {
    try {
      const userExists = await userRepository.checkRegisteringUserExists(
        username,
        email
      );

      if (userExists) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "User already exists");
      }

      const hashPassword = await AuthService.getHashPassword(password);
      console.log(
        "Inside registerUser method in user service:",
        username,
        email,
        firstname,
        lastname,
        avatar,
        coverImage,
        password
      );
      const user = await userRepository.registerUser({
        username,
        email,
        firstname,
        lastname,
        avatar,
        coverImage,
        password: hashPassword,
      });

      if (!user || user.length === 0) {
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Failed to create user. Please try again later."
        );
      }

      return user;
    } catch (error) {
      throw error; // Re-throw the error for the caller to handle
    }
  }

  async loginUser(email, password) {
    const user = await userRepository.checkLoginUserExists(email);

    if (user.length === 0) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "User not found");
    }

    const passwordMatch = await AuthService.isPasswordCorrect(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Password Incorrect");
    }

    const token = await AuthService.generateToken(user);

    user.token = token;
    user.password = undefined;

    return user;
  }

  async getAllUsers() {
    return await userRepository.getAllUsers();
  }

  async getUser(id) {
    return await userRepository.getUser(id);
  }

  async updateUser(params, id) {
    return await userRepository.updateUser(params, id);
  }

  async deleteUser(id) {
    return await userRepository.deleteUser(id);
  }

  async changeCurrentPassword(id, oldPassword, newPassword) {
    const user = await this.getUser(id);
    console.log(user);
    const passwordMatch = await AuthService.isPasswordCorrect(
      oldPassword,
      user.password
    );

    if (!passwordMatch) {
      throw new ApiError(400, "Password doesn't match");
    }

    // if password matched then hash the new password generate the token and return

    const hashPassword = await AuthService.getHashPassword(newPassword);

    const currentUser = await userRepository.changeCurrentPassword(id, {
      password: hashPassword,
    });

    if (!currentUser || currentUser.length === 0) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to create user. Please try again later."
      );
    }

    return currentUser;
  }

  async getUserChannelProfile(username) {
    return await userRepository.getUserChannelProfile(username);
  }

  async getWatchHistory(username) {
    return await userRepository.getWatchHistory(username);
  }

  async updateAvatar(id, avatar) {
    return await userRepository.updateAvatar(id, avatar);
  }
  async updateCoverImage(id, coverImage) {
    return await userRepository.updateCoverImage(id, coverImage);
  }
}

export { UserService };
