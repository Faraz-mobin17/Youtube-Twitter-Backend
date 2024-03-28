import express from "express";
const router = express.Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
} from "../controllers/videos.controller.js";
/* GET users listing. */
router.get("/", verifyJWT, getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router
  .route("/:id")
  .get(verifyJWT, getUser)
  .patch(verifyJWT, updateUser)
  .delete(verifyJWT, deleteUser);

router.get("/videos/:id", verifyJWT, getVideoById);
router.post("/videos", verifyJWT, getAllVideos);
router.delete("/videos/:id", deleteVideo);
export default router;
