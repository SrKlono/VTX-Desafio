import express from "express";
import { getOnus, insertOnus } from "../controllers/onusController.js";

const router = express.Router();

router.get("/", getOnus);
router.post("/", insertOnus);

export default router;