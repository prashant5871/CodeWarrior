import  express  from "express";
import { getResultOfCpp } from "../controllers/codeController.js";

const router = express.Router();

router.post("/cpp",getResultOfCpp); 

export default router;