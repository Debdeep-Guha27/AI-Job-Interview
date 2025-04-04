import { Analaysis } from "@/Apis/AI";
import { useMutation } from "@tanstack/react-query";

export function useAnalysis(){
    const { isPending, isSuccess, error, mutateAsync } = useMutation({
        mutationFn: Analaysis,
        onSuccess: (data) => {
            if (data.success == false) {
                throw new Error(data.message);
            }
            console.log(data);
            return data;
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