import Problem from "../models/problemModel.js"
import { addProblemToTag } from "./tagController.js";

export const addProblem = async (req,res) => {
    // console.log(req.id);

    const {title,description,constraints,difficultyLevel,tags} = req.body;

    if(!title || !description || !constraints || !difficultyLevel)
    {
        return res.status(400).json({
            messege : "Please provide valid information",
            success : false
        })
    }
    let validTags = [];

    if(tags)
    {
        validTags = tags;
       
    }
    let problem;
    try {
        problem = await Problem.create({
            title,
            description,
            constraints,
            difficultyLevel,
            tags : validTags
        })
    } catch (error) {
        res.status(500).json({
            messege : "Internal serever error",
            success : false
        })
    }

    // console.log(problem);

    //Also do add this problem into the tag so that we can filter problems base on the tags in the UI part.
    if (tags && tags.length > 0) {
        try {
            // Iterate over the tags array and add the problem to each tag
            await Promise.all(tags.map(tag => addProblemToTag(tag, problem)));
        } catch (error) {
            return res.status(500).json({
                message: "Error adding problem to tags",
                success: false
            });
        }
    }

    res.status(200).json({
        messege : "Problem added succesfully",
        success : true
    })
    
}
