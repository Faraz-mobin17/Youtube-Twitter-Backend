import express from "express";

import { Auth, validator } from "../middlewares/index.js";
import { userController } from "../controllers/index.js";

import {
  createAccountLimiter,
  generalLimiter,
} from "../utils/rate.limiting.js";

const router = express.Router();

router.use(generalLimiter);

// GET all users
router.get("/", userController.getAllUsers);

// Register user
router.post("/register", [
  createAccountLimiter,
  validator.validateSignup,
  userController.registerUser,
]);

// Login user
router.post("/login", [validator.validateSignin, userController.loginUser]);

// Logout user
router.post("/logout", [Auth.verifyJWT, userController.logoutUser]);

// Routes for specific user by ID
router
  .route("/:id")
  .get([Auth.verifyJWT, userController.getUser])
  .patch([
    Auth.verifyJWT,
    validator.validateUpdateQuery,
    userController.updateUser,
  ])
  .delete([Auth.verifyJWT, userController.deleteUser]);

export default router;
