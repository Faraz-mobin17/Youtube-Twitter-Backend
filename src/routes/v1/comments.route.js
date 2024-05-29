import express from "express";
import { Auth, validator } from "../../middlewares/index.js";
import { commentController } from "../../controllers/index.js";

const router = express.Router();

router.post("/", [validator.validateComment, commentController.addComment]);

router
  .route("/:id")
  .get([Auth.verifyJWT, commentController.getVideoComments])
  .patch([
    Auth.verifyJWT,
    validator.validateComment,
    commentController.updateComment,
  ])
  .delete([Auth.verifyJWT, commentController.deleteComment]);

export default router;
