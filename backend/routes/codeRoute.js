import  express  from "express";
import { runCpp, submitCpp } from "../controllers/codeController.js";

const router = express.Router();

router.post("/cpp/submit",submitCpp); 
router.post("/cpp/run",runCpp);
export default router;