import express from "express";
import { pingCheckController } from "../../controllers/index.js";
const router = express.Router();

router.get("/", pingCheckController.pingcheck);

export default router;
