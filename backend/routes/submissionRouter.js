import express from 'express';
import Submission from '../models/submissionModel.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Get all submissions for a specific user and problem
router.get('/submissions/:userId/:problemId', async (req, res) => {
    const { userId, problemId } = req.params;

    try {
        // Fetch submissions from the database
        const submissions = await Submission.find({ user: userId, problem: problemId }).lean();

        // Add code content for each submission from filePath
        const submissionsWithCode = await Promise.all(submissions.map(async (submission) => {
            const filePath = path.resolve(submission.filePath);
            const code = await fs.promises.readFile(filePath, 'utf8'); // Read the code from the file
            return { ...submission, code };  // Include the code in the response
        }));

        res.status(200).json(submissionsWithCode);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submissions' });
    }
});

export default router;
