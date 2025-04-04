import { Getsuggestions } from "@/Apis/Questions";
import { useMutation } from "@tanstack/react-query";

export function useGetsampleQuestion(){
    const {  isPending, isSuccess, error, mutateAsync } = useMutation({
        mutationFn: Getsuggestions,
        onSuccess:(response) => {
            
            return response;
        },
        onError:(response) => {
            console.log(response);
            return response;
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        mutateAsync
    }
}