import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
    Topic:{
        type:String,
        required:[true , "Topic is required"]
    },
    level:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    questions: {
        type: [String], 
        required: true
    },
    score:{
        type:Number,
    }
} , {timestamps:true});

const Interview = mongoose.model("Interview" , InterviewSchema);

export default Interview;