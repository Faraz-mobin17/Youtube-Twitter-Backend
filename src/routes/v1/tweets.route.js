import express from "express";
import { tweetControler } from "../../controllers/index.js";
import { validateTweet, verifyJWT } from "../../middlewares/index.js";

const router = express.Router();

// TODO: use middleware to validate JWT on all routes
router.use(verifyJWT);

// TODO: GET ROUTES

router.route("/user/:id").get(tweetControler.getUserTweets);

// TODO: POST ROUTES

router.post("/", validateTweet, tweetControler.createTweet);

// TODO: PATCH ROUTES
router.route("/:id").patch(tweetControler.updateTweet);

// TODO: DELETE ROUTES
router.route("/:id").delete(tweetControler.deleteTweet);

export default router;
