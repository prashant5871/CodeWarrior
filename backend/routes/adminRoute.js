import express from "express"
import { addProblem } from "../controllers/problemController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/add-problem",isAuthenticated,addProblem);

export default router;