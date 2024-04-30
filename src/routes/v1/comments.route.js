import express from "express";
import { verifyJWT } from "../../middlewares/JWTAuth.middleware.js";
import {
  addComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../../controllers/comments.controller.js";
import { validateComment } from "../../middlewares/validator.middleware.js";
const router = express.Router();

// create comment
router.post("/add-comment", validateComment, addComment);

// Routes for specific user by ID
router
  .route("/:id")
  .get(verifyJWT, getVideoComments)
  .patch(verifyJWT, validateComment, updateComment)
  .delete(verifyJWT, deleteComment);

export default router;
