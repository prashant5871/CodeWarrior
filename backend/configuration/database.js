import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Connected to MongoDB");
        })
        .catch(()=>{
            console.log("Error while connecting to the MongoDB");
        })
}

export default connectDB;