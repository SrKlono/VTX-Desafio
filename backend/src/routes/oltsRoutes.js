import express from "express";
import { getOlts, insertOlts } from "../controllers/oltsController.js";

const router = express.Router();

router.get("/", getOlts);
router.post("/", insertOlts);

export default router;