import mongoose from 'mongoose';


const userModel = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName : {
        type:String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
    }],
    contests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest'
    }]
}, { timestamps: true });


const User = mongoose.model('User', userModel);

export default User;
