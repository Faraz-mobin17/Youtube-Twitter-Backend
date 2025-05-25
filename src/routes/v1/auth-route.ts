import express, { Router } from "express";
import { AuthController } from "../../controllers/index.js";
import {
  upload,
  validateSignin,
  validateSignup,
  verifyJWT,
} from "../../middlewares/index.js";

const router: Router = express.Router();

router.route("/login").post(validateSignin, AuthController.loginUser);
router.route("/logout").post(verifyJWT, AuthController.logoutUser);
router
  .route("/change-current-password")
  .patch(verifyJWT, AuthController.changeCurrentPassword);

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
  AuthController.registerUser
);

export default router;
