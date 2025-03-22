import Interview from "../Schemas/Interview.js";

export async function CreateInterview(InterviewObject){
    try {
        const response = await Interview.create(InterviewObject);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function GetInterviewById(Id){
    try {
        const response = await Interview.findById(Id);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function GetInterviewByUserId(userId){
    try {
        const response = await Interview.find({ user : userId}).populate('user');
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}