import  express  from "express";
import { getProblems } from "../controllers/problemController.js";

const router = express.Router();

router.get("/",getProblems); 

export default router;