import express from "express";
import { healthcheck } from "../../controllers/healthcheck.controller";
const router = express.Router();

router.get("/ping", healthcheck);

export default router;
