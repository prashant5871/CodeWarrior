import mongoose from 'mongoose';


const problemModel = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    constraints: {
        type: String, 
        required: true
    },
    difficultyLevel: {
        type: String,
        enum: ['easy', 'medium', 'hard'], 
        required: true
    },
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
    }],
    testCases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestCase'
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    contests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest'
    }]
}, { timestamps: true });


const Problem = mongoose.model('Problem', problemModel);

export default Problem;
