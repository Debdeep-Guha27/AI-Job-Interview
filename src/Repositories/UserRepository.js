import User from "../Schemas/User.js";

export async function CreateUser(UserObject){
    try {
        const response = await User.create(UserObject);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function GetUserById(Id){
    try {
        const response = await User.findById(Id).populate('Interviews');
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function findUserByEmail(email) {
    try {
        const response = await User.findOne({ email });
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}