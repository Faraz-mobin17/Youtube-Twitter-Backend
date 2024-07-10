import express from "express";

import {
  verifyJWT,
  validateSignup,
  validateSignin,
  validateUpdateQuery,
} from "../../middlewares/index.js";
import { userController } from "../../controllers/index.js";
import { upload } from "../../middlewares/index.js";

const router = express.Router();

// TODO: get requests

router.route("/current-user").get(verifyJWT, userController.getUser);
router.route("/channel/:username").get(userController.getUserChannelProfile);
router.route("/history").get(verifyJWT, userController.getWatchHistory);

//TODO:  post requrest

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  validateSignup,
  userController.registerUser
);
router.route("/login").post(validateSignin, userController.loginUser);
router.route("/logout").post(verifyJWT, userController.logoutUser);

// TODO: patch requests

router
  .route("/update-account")
  .patch(validateUpdateQuery, verifyJWT, userController.updateUser);
router
  .route("/change-current-password")
  .patch(verifyJWT, userController.changeCurrentPassword);

router.route("/avatar").patch(verifyJWT, userController.updateAvatar);
router.route("/cover-image").patch(verifyJWT, userController.updateCoverImage);

//TODO: delete request

router.route("/delete-account").delete(verifyJWT, userController.deleteUser);

export default router;
