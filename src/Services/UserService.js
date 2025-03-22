import { CreateUser, findUserByEmail } from "../Repositories/UserRepository.js";
import bcrypt from 'bcrypt';
import { createToken } from "../Utils/Jwt.js";
export async function SignUpService(UserObject) {
    try {
        const response = await CreateUser(UserObject);
        if(!response){
            throw null;
        }
        return response;
    } catch (error) {
        throw error;
    }
}

export async function SigninService(SigninObject){
    try {
        const User = await findUserByEmail(SigninObject.email);
        if(!User) {
            throw null;
        }
        if(User.username != SigninObject.username){
            throw null;
        }

        const response = await bcrypt.compare(SigninObject.password , User.password);
        console.log(response);
        if (!response) {
            throw null;
        }
        const token = await createToken({ ...SigninObject, id: User._id });
        return {
            id: User.id,
            email: User.email,
            username: User.username,
            role: User.role,
            avatar:User.avatar,
            token: token
        }
    } catch (error) {
        throw error;
    }
}