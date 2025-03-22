import { GetInterviewByUserId } from "../Repositories/InterviewRepository.js";

export async function GetInterviewByUserIdService(userId){
    try {
        const response = await GetInterviewByUserId(userId);
        return response;
    } catch (error) {
        throw error;
    }
}