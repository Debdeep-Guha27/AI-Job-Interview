import { findUserByEmail } from "../Repositories/UserRepository.js";
import { VerifyToken } from "../Utils/Jwt.js";

export async function IsAuthenticated(req , res , next){
    try {
        const Token = req.headers['x-access-token'];
        if (!Token) {
            return res.json({
                success: false,
                message: "Token is missing"
            });
        }
        const user = await VerifyToken(Token);
        const VerifyUser = await findUserByEmail(user.email);
        if(!VerifyUser){
            return res.json({
                success:false,
                message:"Unauthorised user"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.json({
            success: false,
            message:"Unauthorised user"
        })
    }
}