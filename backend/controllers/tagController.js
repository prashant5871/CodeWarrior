import Tag from "../models/tagModel.js";

export const addProblemToTag = async (tagId,problem) => {
    try {
        let existingTag = await Tag.findOne({_id : tagId});
        // console.log(existingTag);
        if(existingTag)
        {
            await existingTag.updateOne(
                {_id:tagId},
                {$addToSet : {problems : problem}}
            )
            // existingTag.problems.push(problem);
            // existingTag.save();
            // console.log("Problem added succesfully...",existingTag);
            return existingTag;
            console.log("tag added succefully");
        }


    } catch (error) {
        // console.log("Getting an error...");
        console.log(error);
    }

    return null;
}


export const getTagById = async (req,res) =>
{
    const tagId = req.params.tagId;
    try{
        let tag = await Tag.findOne({_id : tagId});
        if(tag)
        {
            return tag;
        }
    }catch(e){
        console.log(e);
    }

    res.status(400).json({
        message : "tag not found",
        success:false
    })
}
