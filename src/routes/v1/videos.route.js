import express from "express";
import { Auth, verifyPremium } from "../middlewares/index.js";
import { videoController } from "../controllers/index.js";

const router = express.Router();

router.delete("/:id", [
  Auth.verifyJWT,
  verifyPremium.verifyPremiumUser,
  videoController.deleteVideo,
]);
router.post("/:id/restore", [
  Auth.verifyJWT,
  verifyPremium.verifyPremiumUser,
  videoController.restoreVideo,
]);

export default router;
