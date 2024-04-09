import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
import {
  userRegisterValidator,
  userLoginValidator,
} from "../middlewares/validator.middleware.js";

const router = express.Router();

// GET all users
router.get("/", verifyJWT, getAllUsers);

// Register user
router.post("/register", userRegisterValidator, registerUser);

// Login user
router.post("/login", userLoginValidator, loginUser);

// Logout user
router.post("/logout", verifyJWT, logoutUser);

// Routes for specific user by ID
router
  .route("/:id")
  .get(verifyJWT, getUser)
  .patch(verifyJWT, updateUser)
  .delete(verifyJWT, deleteUser);

export default router;
