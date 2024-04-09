import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import { ApiError, ApiResponse } from "../utils/ApiHandler.utils.js";
import AuthService from "../helper/auth.helper.js";
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
    const userExists = await this.UserRepository.checkUserExists(
      username,
      email
    );
    if (userExists) {
      throw new ApiError(
        HttpStatusCodes.CONFLICT,
        "User with email or username already exists"
      );
    }

    const hashPassword = await AuthService.getHashPassword(password);

    const user = await this.UserRepository.registerUser({
      username,
      email,
      firstname,
      lastname,
      avatar,
      coverImage,
      password: hashPassword,
    });

    if (!user) {
      throw new ApiError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        "User not created"
      );
    }

    return user;
  }

  async loginUser(email, password) {
    const user = await this.UserRepository.loginUser(email, password);
    if (!user) {
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
    return this.UserRepository.getAllUsers();
  }

  async getUser(id) {
    return this.UserRepository.getUser(id);
  }

  async updateUser(params, id) {
    return this.UserRepository.updateUser(params, id);
  }

  async deleteUser(id) {
    return this.UserRepository.deleteUser(id);
  }
}

export { UserService };
