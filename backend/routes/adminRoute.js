import express from "express"
import { addProblem, addTagToProblem } from "../controllers/problemController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/add-problem",isAuthenticated,addProblem);
router.post("/add-tag",isAuthenticated,addTagToProblem);

export default router;