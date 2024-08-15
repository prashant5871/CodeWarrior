import  express  from "express";
import { login, register } from "../controllers/userController.js";
import { getProblems } from "../controllers/problemController.js";

const router = express.Router();


router.post("/register",register);
router.post("/login",login);

router.get("/problems",getProblems); 

export default router;