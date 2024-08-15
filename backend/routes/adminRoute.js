import express from "express"
import { addProblem, addTagToProblem, addTestCase } from "../controllers/problemController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/add-problem",isAuthenticated,addProblem);
router.post("/add-tag",isAuthenticated,addTagToProblem);
router.post("/add-test-case",isAuthenticated,addTestCase);

export default router;