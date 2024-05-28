import express from "express";

import { Auth, validator } from "../../middlewares/index.js";
import { userController } from "../../controllers/index.js";
import { multer } from "../../middlewares/index.js";
import {
  createAccountLimiter,
  generalLimiter,
} from "../../utils/rate.limiting.js";

const router = express.Router();

router.use(generalLimiter);

// TODO: get requests

router.route("/current-user").get(Auth.verifyJWT, userController.getUser);
router
  .route("/channel/:username")
  .get(Auth.verifyJWT, userController.getUserChannelProfile);
router.route("/history").get(Auth.verifyJWT, userController.getWatchHistory);

//TODO:  post requrest

router.route("/register").post(
  multer.upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  createAccountLimiter,
  // validator.validateSignup,
  userController.registerUser
);
router.route("/login").post(validator.validateSignin, userController.loginUser);
router.route("/logout").post(Auth.verifyJWT, userController.logoutUser);

// TODO: patch requests

router
  .route("/update-account")
  .patch(
    validator.validateUpdateQuery,
    Auth.verifyJWT,
    userController.updateUser
  );
router
  .route("/change-current-password")
  .patch(Auth.verifyJWT, userController.changeCurrentPassword);

router.route("/avatar").patch(Auth.verifyJWT, userController.updateAvatar);
router
  .route("/cover-image")
  .patch(Auth.verifyJWT, userController.updateCoverImage);

//TODO: delete request

router
  .route("/delete-account")
  .delete(Auth.verifyJWT, userController.deleteUser);

export default router;
