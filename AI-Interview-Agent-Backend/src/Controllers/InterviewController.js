import { GetInterviewByUserIdService } from "../Services/InterviewService.js";


export async function GetUserInterviewController(req , res){
    try {
        const userId = req?.user?.id;
        const response = await GetInterviewByUserIdService(userId);
        return res.json({
            success:true,
            message:"Data fetched successfully",
            data:response
        });
    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}     