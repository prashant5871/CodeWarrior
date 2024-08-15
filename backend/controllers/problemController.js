import Problem from "../models/problemModel.js"
import { addProblemToTag } from "./tagController.js";
import { CreateTestCase } from "./testCaseController.js";

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
            //Promise.all([addProblemToTag(tag1,problem),addProblemToTag(tag2,problem)]) <- it will be translated like this
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


export const addTagToProblem =async (req,res) => {
    const {tags,problem} = req.body;

    if(tags && tags.length > 0)
    {
        const existingProblem = await Problem.findOne({_id : problem});

        const uniqueTags = [...new Set(existingProblem.tags.concat(tags))];
        // existingProblem.tags = uniqueTags;
        
        try {
            // console.log("before Await...");
            // Using $addToSet to add unique tags
            await Problem.updateOne(
                { _id: problem },
                { $addToSet: { tags: { $each: uniqueTags } } }
            );
  
            await Promise.all(tags.map((tagId)=>addProblemToTag(tagId,problem)));
            // console.log("AFter await");

            return res.status(200).json({message:"tag added succesfully",success:true});
        } catch (error) {
            console.log(error);
        }
        
    }

    res.status(400).json({message:"can not add tag",success:false});

}

export const addTestCase =async (req,res) => {
    const {input,expectedOutput,problem} = req.body;

    if(!input || !expectedOutput || !problem)
    {
        return res.status(401).json({
            messege : "Please provide valid information",
            success : false
        })
    }
    
    const testCase = await CreateTestCase(input,expectedOutput,problem);
    console.log(testCase);
    try {
        // const existingProblem = await Problem.findOne({_id:problem});
        await Problem.updateOne(
            {_id:problem},
            {$addToSet : {testCases : testCase._id }}
        )

        return res.status(200).json({
            messege:"test case added succesfully!!",
            success : true
        })
    } catch (error) {
        //error handling code
    }
    res.status(400).json({
        messege:"something went wrong!!",
        success : false
    })
}