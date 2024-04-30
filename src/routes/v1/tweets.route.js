import express from "express";
import { verifyJWT } from "../../middlewares/JWTAuth.middleware.js";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../../controllers/tweet.controller.js";
import { validateTweet } from "../../middlewares/validator.middleware.js";

const router = express.Router();

// create tweet
router.post("/create-tweet", validateTweet, createTweet);

// Routes for specific user by ID
router
  .route("/:id")
  .get(verifyJWT, getUserTweets)
  .patch(verifyJWT, validateTweet, updateTweet)
  .delete(verifyJWT, deleteTweet);

export default router;
