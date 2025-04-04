import { GetIntervirewQuestions } from "@/Apis/AI";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useInterview(){
    const { isPending, isSuccess, error, mutateAsync } = useMutation({
        mutationFn:GetIntervirewQuestions,
        onSuccess: (response) => {
            if (response.success == false) {
                throw new Error(response.message);
            }
            else {
                console.log(response);
                return response;
            }
        },
        onError: (data) => {
            console.log(data);
            return data;
        }
    });
    return {
        isPending, 
        isSuccess, 
        error, 
        mutateAsync
    }
}