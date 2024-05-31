import express from "express";
import { verifyJWT, validateComment } from "../../middlewares/index.js";
import { commentController } from "../../controllers/index.js";

const router = express.Router();

// TODO: USE MIDDLEWARE FOR ALL ROUTES
router.use(verifyJWT);

// TODO: GET ROUTES
router.route("/:videoId").get(commentController.getVideoComments);

// TODO: POST ROUTES
router.route("/:videoId").post(validateComment, commentController.addComment);

// TODO: PATCH ROUTES
router.route("/channel/:commentId").patch(commentController.updateComment);

// TODO: DELETE ROUTES
router.route("/channel/:commentId").delete(commentController.deleteComment);

export default router;
