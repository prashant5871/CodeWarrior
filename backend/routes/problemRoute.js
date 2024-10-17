import  express  from "express";
import { deleteProblemById, getProblems } from "../controllers/problemController.js";

const router = express.Router();

router.get("/",getProblems); 
router.delete("/:id",deleteProblemById);

export default router;