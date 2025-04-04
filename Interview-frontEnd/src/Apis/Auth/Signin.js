import AxiosInstance from '../../utils/AxiosInstance';

async function Signin(LoginObject){
    try {
        const response = await AxiosInstance.post('/user/Signin' , LoginObject);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default Signin;