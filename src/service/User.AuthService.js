import AuthService from "../helper/auth.helper.js";
import User from "../models/User.model.js";
class UserAuthService {
  static registerUser = asyncHandler(async (req, res) => {
    const {
      username,
      email,
      firstname,
      lastname,
      avatar,
      coverImage,
      password,
    } = req.body;

    if (
      [username, email, password, firstname].some(
        (field) => field.trim() === ""
      )
    ) {
      throw new ApiError(
        HttpStatusCodes.BAD_REQUEST,
        "All fields are required"
      );
    }

    const existsUser = await User.findOne("users", { username, email });

    if (existsUser) {
      throw new ApiError(
        HttpStatusCodes.BAD_REQUEST,
        "User with email or username already exists"
      );
    }

    let hashPassword = await AuthService.getHashPassword(password);

    const user = User.create("users", {
      username,
      email,
      firstname,
      lastname,
      avatar,
      coverImage,
      password: hashPassword,
    });
    if (!user) {
      throw new ApiError(HttpStatusCodes.CONFLICT, "User not created");
    }
    return res
      .status(HttpStatusCodes.OK)
      .json(
        new ApiResponse(
          HttpStatusCodes.OK,
          user,
          "User registered successfully"
        )
      );
  });

  static loginUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!(email && password && username)) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json(
          new ApiError(HttpStatusCodes.UNAUTHORIZED, "All fields are required")
        );
    }
    const user = await User.findOne("users", { username, email });
    if (!user) {
      throw new ApiError(404, "User does not exists");
    }
    const passwordMatch = await AuthService.isPasswordCorrect(
      password,
      user.password
    );
    if (!passwordMatch) {
      throw new ApiError(401, "Password Incorrect");
    }
    const token = await AuthService.generateToken(user);
    // console.log("token: ", token);
    user.token = token;
    user.password = undefined; // dont want to send password to the user
    // send token in user cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };
    return res
      .status(HttpStatusCodes.OK)
      .cookie("token", token, options)
      .json(new ApiResponse(HttpStatusCodes.OK, user));
  });

  static logoutUser = asyncHandler(async (req, res) => {
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(HttpStatusCodes.OK)
      .clearCookie("token", options)
      .json({ user: req.user.firstname, msg: "User logged out" });
  });
}

export { UserAuthService };
