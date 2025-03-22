import Technology from "../Schemas/Technology.js";

export async function GetSampleQuestionByTopicName(name){
    try {
        const response = await Technology.findOne({name:name});
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function CreateTechnology(TechnologyObject){
    try {
        const response = await Technology.create(TechnologyObject);
        return response;
    } catch (error) {
        throw error;
    }
}