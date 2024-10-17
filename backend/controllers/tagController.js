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

