import mongoose from "mongoose";

const TechnologySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    questions: {
        type: [String],
        required: true
    }
} , {timestamps:true});

const Technology = mongoose.model("Technology" , TechnologySchema);

export default  Technology;