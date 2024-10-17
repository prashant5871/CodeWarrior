import mongoose from 'mongoose';

const tagModel = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }]
}, { timestamps: true });

// Create and export the Tag model
const Tag = mongoose.model('Tag', tagModel);

export default Tag;
