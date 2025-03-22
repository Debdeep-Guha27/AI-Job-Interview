import { Analysis } from "../Apis/Answeranalysis.js";
import { GetquestionAnswerGPT, GetQuestionsInterview } from "../Apis/Gptapi.js";
import { CreateInterview } from "../Repositories/InterviewRepository.js";
import { CreateTechnology, GetSampleQuestionByTopicName } from "../Repositories/QuestionRepository.js";
import { GetUserById } from "../Repositories/UserRepository.js";

export async function QuestionService({ topic, experience }, userId){
    try {
        const response = await GetQuestionsInterview(topic , experience);
        if (!response) {
            throw null;
        }
        const arr = response.split("\n");
        const InterviewObject = {
            Topic:topic,
            level:experience,
            user:userId,
            questions:arr
        }
        const InterviewResponse = await CreateInterview(InterviewObject);
        const User = await GetUserById(userId);
        User.Interviews.push(InterviewResponse._id);
        await User.save();
        const Technology = await GetSampleQuestionByTopicName(topic);
        if (!Technology) {
            const Object = {
                name:topic,
                questions:arr
            }
            await CreateTechnology(Object);
        }
        else{
            Technology.questions = [...Technology.questions, ...arr];
            await Technology.save();
        }
        return arr;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function GetsampleQuestionsService({name}){
    try {
        const response = await GetSampleQuestionByTopicName(name);
        if(!response){
            throw null;
        }
        return response;
    } catch (error) {
        throw error;
    }
}

export async function AnalyseService(Object){
    try {
        const response = await Analysis(Object);
        if(!response) throw null;
        const arr = response.split("\n");
        return arr;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function AskOurAiService(Question){
    try {
        const response = await GetquestionAnswerGPT(Question);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}