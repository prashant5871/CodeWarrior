import mongoose from 'mongoose';


const submissionModel = new mongoose.Schema({
    language: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    submissionDate: {
        type: Date,
        default: Date.now,  // Automatically sets the date when a new submission is created
        required: true
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });


const Submission = mongoose.model('Submission', submissionModel);

export default Submission;
