import mongoose from 'mongoose';

const contestModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startTime: {
        type: Date, 
        required: true
    },
    endTime: {
        type: Date, 
        required: true
    },
    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem' 
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }]
}, { timestamps: true });

const Contest = mongoose.model('Contest', contestModel);

export default Contest;
