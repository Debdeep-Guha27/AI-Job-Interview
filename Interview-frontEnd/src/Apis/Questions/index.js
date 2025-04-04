import AxiosInstance from "@/utils/AxiosInstance";

export async function Getsuggestions(suggestionsObject) {
    try {
        const token = localStorage.getItem('token');
        const response = await AxiosInstance.get('/Interview/user/samplequestion',
            {
                headers:{
                    'x-access-token':token
                },
                params:suggestionsObject
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error in askOurAi", error);
        return null;
    }
}