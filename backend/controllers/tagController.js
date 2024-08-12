import Tag from "../models/tagModel.js";

export const addProblemToTag = async (tag,problem) => {
    try {
        let existingTag = await Tag.findOne({_id : tag});
        console.log(existingTag);
        if(existingTag)
        {
            existingTag.problems.push(problem);
            existingTag.save();
            // console.log("Problem added succesfully...",existingTag);
            return existingTag;
        }


    } catch (error) {
        // console.log("Getting an error...");
        console.log(error);
    }

    return null;
}
