import { SigninService, SignUpService } from "../Services/UserService.js";

export async function SignUpController(req , res){
    try {
        const Object = {
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
        };
        const response = await SignUpService(Object);
        if(!response){
            throw null;
        }
        return res.json({
            success:true,
            message:"Signed up successfully",
            data:response
        });
    } catch (error) {
        return res.json({
            success:false,
            message:"Signed up failed"
        });
    }
}

export async function SigninController(req , res){
    try {
        const SignInObject = {
            email:req.body.email,
            password:req.body.password,
            username:req.body.username
        };
        const response = await SigninService(SignInObject);
        if(!response){
            throw null;
        }
        return res.json({
            success:true,
            message:"Signed In successfully",
            data:response
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "Signed In failed",
        });
    }
}