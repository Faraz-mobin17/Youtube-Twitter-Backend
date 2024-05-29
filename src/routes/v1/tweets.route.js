import express from "express";
import { tweetControler } from "../../controllers/index.js";
import { validator, Auth } from "../../middlewares/index.js";

const router = express.Router();

// create tweet
router.post("/", validator.validateTweet, tweetControler.createTweet);

// Routes for specific user by ID
router
  .route("/:id")
  .get([Auth.verifyJWT, tweetControler.getUserTweets])
  .patch([Auth.verifyJWT, validator.validateTweet, tweetControler.updateTweet])
  .delete([Auth.verifyJWT, tweetControler.deleteTweet]);

export default router;
