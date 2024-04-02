import express from "express";
const router = express.Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
import { VideoController } from "../controllers/videos.controller.js";
import { UserAuthService } from "../service/user.authService.js";
/* GET users listing. */
router.get("/", verifyJWT, getAllUsers);
router.post("/register", UserAuthService.registerUser);
router.post("/login", UserAuthService.loginUser);
router.post("/logout", verifyJWT, UserAuthService.logoutUser);
router
  .route("/:id")
  .get(verifyJWT, getUser)
  .patch(verifyJWT, updateUser)
  .delete(verifyJWT, deleteUser);

router.get("/videos/:id", verifyJWT, VideoController.getVideoById);
router.post("/videos", verifyJWT, VideoController.getAllVideos);
router.delete("/videos/:id", VideoController.deleteVideo);
export default router;
