import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import { ApiError } from "../utils/ApiHandler.utils.js";
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
    console.log("email: ", email, " Password: ", password);
    const user = await this.UserRepository.checkUserExists(email);
    console.log("Inside user service login user", user);
    console.log(user.password);
    if (!user) {
      throw new ApiError(HttpStatusCodes.UNAUTHORIZED, "User not found");
    }
    const passwordMatch = await AuthService.isPasswordCorrect(
      password,
      user.password
    );
    console.log(passwordMatch);
    if (passwordMatch === "") {
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
}

export { UserService };
