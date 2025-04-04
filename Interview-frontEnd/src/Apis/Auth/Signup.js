import AxiosInstance from '../../utils/AxiosInstance';

async function Signup(SignupObject) {
    try {
        const response = await AxiosInstance.post('/user/Signup', SignupObject);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default Signup;