import express from "express";
import { healthcheck } from "../../controllers/healthcheck-controller.js";
const router = express.Router();

router.get("/", healthcheck);

export default router;
