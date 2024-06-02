import { ApiError } from "../utils/ApiHandler.utils.js";
import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import AuthService from "../middlewares/authService.middleware.js";

class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

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
      const userExists = await this.UserRepository.checkRegisteringUserExists(
        username,
        email
      );

      if (userExists) {
        throw new ApiError(HttpStatusCodes.UNAUTHORIZED, "User already exists");
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
      const user = await this.UserRepository.registerUser({
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
          HttpStatusCodes.INTERNAL_SERVER_ERROR,
          "Failed to create user. Please try again later."
        );
      }

      return user;
    } catch (error) {
      throw error; // Re-throw the error for the caller to handle
    }
  }

  async loginUser(email, password) {
    const user = await this.UserRepository.checkLoginUserExists(email);

    if (user.length === 0) {
      throw new ApiError(HttpStatusCodes.UNAUTHORIZED, "User not found");
    }

    const passwordMatch = await AuthService.isPasswordCorrect(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new ApiError(HttpStatusCodes.UNAUTHORIZED, "Password Incorrect");
    }

    const token = await AuthService.generateToken(user);

    user.token = token;
    user.password = undefined;

    return user;
  }

  async getAllUsers() {
    return await this.UserRepository.getAllUsers();
  }

  async getUser(id) {
    return await this.UserRepository.getUser(id);
  }

  async updateUser(params, id) {
    return await this.UserRepository.updateUser(params, id);
  }

  async deleteUser(id) {
    return await this.UserRepository.deleteUser(id);
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

    const currentUser = await this.UserRepository.changeCurrentPassword(id, {
      password: hashPassword,
    });

    if (!currentUser || currentUser.length === 0) {
      throw new ApiError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to create user. Please try again later."
      );
    }

    return currentUser;
  }

  async getUserChannelProfile(username) {
    return await this.UserRepository.getUserChannelProfile(username);
  }

  async getWatchHistory(username) {
    return await this.UserRepository.getWatchHistory(username);
  }

  async updateAvatar(id, avatar) {
    return await this.UserRepository.updateAvatar(id, avatar);
  }
  async updateCoverImage(id, coverImage) {
    return await this.UserRepository.updateCoverImage(id, coverImage);
  }
}

export { UserService };
