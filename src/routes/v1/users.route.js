import express from "express";
import { verifyJWT } from "../../middlewares/JWTAuth.middleware.js";
import {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
} from "../../controllers/users.controller.js";
import {
  // userRegisterValidator,
  // userLoginValidator,
  validateSignin,
  validateSignup,
  validateUpdateQuery,
} from "../../middlewares/validator.middleware.js";

const router = express.Router();

// GET all users
router.get("/", getAllUsers);

// Register user
router.post("/register", validateSignup, registerUser);

// Login user
router.post("/login", validateSignin, loginUser);

// Logout user
router.post("/logout", verifyJWT, logoutUser);

// Routes for specific user by ID
router
  .route("/:id")
  .get(verifyJWT, getUser)
  .patch(verifyJWT, validateUpdateQuery, updateUser)
  .delete(verifyJWT, deleteUser);

export default router;
