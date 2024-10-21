import Problem from "../models/problemModel.js"
import { addProblemToTag } from "./tagController.js";
import { CreateTestCase } from "./testCaseController.js";

export const addProblem = async (req, res) => {

    const { title, description, constraints, difficultyLevel, tags, example } = req.body;

    if (!title || !description || !constraints || !difficultyLevel || !example) {
        return res.status(400).json({
            message: "Please provide valid information",
            success: false
        })
    }
    let validTags = [];

    if (tags && tags.length > 0) {
        validTags = tags;

    }
    let problem;
    try {
        problem = await Problem.create({
            title,
            description,
            constraints,
            difficultyLevel,
            tags: validTags,
            example
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal serever error",
            success: false
        })
    }

    // console.log(problem);

    //Also do add this problem into the tag so that we can filter problems base on the tags in the UI part.
    if (tags && tags.length > 0) {
        try {
            // Iterate over the tags array and add the problem to each tag
            await Promise.all(tags.map(tag => addProblemToTag(tag, problem)));
            //Promise.all([addProblemToTag(tag1,problem),addProblemToTag(tag2,problem)]) <- it will be translated like this
        } catch (error) {
            return res.status(500).json({
                message: "Error adding problem to tags",
                success: false
            });
        }
    }

    res.status(200).json({
        message: "Problem added succesfully",
        success: true
    })

}


export const addTagToProblem = async (req, res) => {
    const { tags, problem } = req.body;

    if (tags && tags.length > 0) {
        const existingProblem = await Problem.findOne({ _id: problem });

        const uniqueTags = [...new Set(existingProblem.tags.concat(tags))];
        // existingProblem.tags = uniqueTags;

        try {
            // console.log("before Await...");
            // Using $addToSet to add unique tags
            await Problem.updateOne(
                { _id: problem },
                { $addToSet: { tags: { $each: uniqueTags } } }
            );

            await Promise.all(tags.map((tagId) => addProblemToTag(tagId, problem)));
            // console.log("AFter await");

            return res.status(200).json({ message: "tag added succesfully", success: true });
        } catch (error) {
            console.log(error);
        }

    }

    res.status(400).json({ message: "can not add tag", success: false });

}

async function findProblemIdByTitle(title) {
    try {
        const problem = await Problem.findOne({ title: title }).select('_id'); // Find the problem by title and select only the _id field

        if (problem) {
            console.log('Problem ID:', problem._id);
            return problem._id;
        } else {
            console.log('Problem not found');
            return null;
        }
    } catch (error) {
        console.error('Error finding problem:', error);
        throw error;
    }
}

export const addTestCase = async (req, res) => {
    const { input, expectedOutput, problem } = req.body;

    if (!input || !expectedOutput || !problem) {
        return res.status(401).json({
            message: "Please provide valid information",
            success: false
        })
    }
    // const problemId = findProblemIdByTitle(problem);
    const testCase = await CreateTestCase(input, expectedOutput, problem);
    console.log(testCase);
    try {
        // const existingProblem = await Problem.findOne({_id:problem});
        await Problem.updateOne(
            { _id: problem },
            { $addToSet: { testCases: testCase._id } }
        )

        return res.status(200).json({
            message: "test case added succesfully!!",
            success: true
        })
    } catch (error) {
        //error handling code
        // return res.status("inside catch");
        console.log(error);
    }
    res.status(400).json({
        message: "something went wrong!!",
        success: false
    })
}

/**
 * Get all the problems 
*/
export const getProblems = async (req, res) => {
    let problems;
    try {
        problems = await Problem.find()
            .populate('tags')
            .populate('testCases');

        // console.log(problems);
    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            message: "Something went wrong!! Please try again later",
            success: false
        })
    }

    res.status(200).json(problems);
}

export const deleteProblemById = async (req, res) => {
    res.status(200).json({ message: "problem deleted succesfully" });
}