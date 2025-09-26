import express from "express";
import { getOlts, insertOlt } from "../controllers/oltsController.js";

const router = express.Router();

router.get("/", getOlts);
router.post("/", insertOlt);

export default router;