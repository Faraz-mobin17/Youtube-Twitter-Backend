import * as AuthService from "./authService.middleware.js";
import * as uploadOnCloudinary from "./cloudinary.middleware.js";
import * as Auth from "./JWTAuth.middleware.js";
import * as multer from "./multer.middleware.js";
import * as validator from "./validator.middleware.js";
import * as verifyPremium from "./verifyPremiumUser.middlewares.js";

export {
  AuthService,
  multer,
  uploadOnCloudinary,
  validator,
  Auth,
  verifyPremium,
};
