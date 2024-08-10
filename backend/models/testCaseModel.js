import mongoose from 'mongoose';


const testCaseModel = new mongoose.Schema({
    input: {
        type: String,
        required: true
    },
    expectedOutput: {
        type: String,
        required: true
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    }
}, { timestamps: true });


const TestCase = mongoose.model('TestCase', testCaseModel);

export default TestCase;
