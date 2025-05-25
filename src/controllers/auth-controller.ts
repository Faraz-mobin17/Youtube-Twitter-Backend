import { StatusCodes } from "http-status-codes";
import { ApiError, ApiResponse } from "../utils/api-handler.js";
import { AuthService } from "../services/index.js";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { uploadOnCloudinary } from "../middlewares/cloudinary-middleware.js";

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const response = await AuthService.loginUser(
    req.body.email,
    req.body.password
  );

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  return res
    .status(StatusCodes.OK)
    .cookie("token", response.token, options)
    .json(new ApiResponse(StatusCodes.OK, response));
});
const logoutUser = asyncHandler(async (_: Request, res: Response) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(StatusCodes.OK)
    .clearCookie("token", options)
    .json({ msg: "User logged out" });
});

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  console.log("inside user controller", avatarLocalPath, coverImageLocalPath);
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const response = await AuthService.registerUser({
    ...req.body,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  if (!response) {
    throw new ApiError(400, "User not registered");
  }

  return res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        response,
        "User registered successfully"
      )
    );
});

const changeCurrentPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const id = req.user?.id;

    console.log(oldPassword, newPassword);

    if (!(oldPassword && newPassword)) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Password doesn't exists");
    }

    console.log("user id inside user controller", id);

    const user = await AuthService.changeCurrentPassword(
      id,
      oldPassword,
      newPassword
    );

    if (!user || user.length === 0) {
      throw new ApiError(StatusCodes.NOT_MODIFIED, "user password not updated");
    }

    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          user,
          "User Password Updated Successfully"
        )
      );
  }
);

export { changeCurrentPassword, loginUser, logoutUser, registerUser };
