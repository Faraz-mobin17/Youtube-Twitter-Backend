import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/api-handler.js";
import { UserRepository } from "../repositories/user-repository.js";

async function registerUser({
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

async function loginUser(email, password) {
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

async function changeCurrentPassword(id, oldPassword, newPassword) {
  const user = await userRepository.getUser(id);
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

  const currentUser = await UserRepository.changeCurrentPassword(id, {
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

export { registerUser, loginUser };
