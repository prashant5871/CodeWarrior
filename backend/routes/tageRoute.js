import  express from "express";
import Tag from "../models/tagModel.js";
import { getTagById } from "../controllers/tagController.js";


const router = express.Router();

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find(); // Fetch all tags
    res.status(200).json(tags); // Send them as a response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tags', error: error.message });
  }
});

router.get("/:tagId",getTagById);

export default router;