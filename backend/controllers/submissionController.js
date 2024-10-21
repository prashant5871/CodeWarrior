import Submission from "../models/submissionModel.js";

export const getSubmissionByUserId = async (req, res) => {
    let submissions;
    const {userId} = req.params;
    console.log(userId);
    try {
        submissions = await Submission.find({user:userId})
        .populate("problem")
        .populate("user");

        // console.log(submissions);
    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            message: "Something went wrong!! Please try again later",
            success: false
        })
    }

    res.status(200).json(submissions);
}

