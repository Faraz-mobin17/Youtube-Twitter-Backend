import express from "express";
const router = express.Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { UserController } from "../controllers/users.controller.js";
import { VideoController } from "../controllers/videos.controller.js";

/* GET users listing. */
router.get("/", verifyJWT, UserController.getAllUsers);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/logout", verifyJWT, UserController.logoutUser);
router
  .route("/:id")
  .get(verifyJWT, UserController.getUser)
  .patch(verifyJWT, UserController.updateUser)
  .delete(verifyJWT, UserController.deleteUser);

router.get("/videos/:id", verifyJWT, VideoController.getVideoById);
router.post("/videos", verifyJWT, VideoController.getAllVideos);
router.delete("/videos/:id", VideoController.deleteVideo);
export default router;
