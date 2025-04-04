import Signup from "@/Apis/Auth/Signup";
import { useMutation } from "@tanstack/react-query";

function useSignup(){
    const { isPending, isSuccess, error, mutateAsync } = useMutation({
        mutationFn: Signup,
        onSuccess:(response) => {
            if (response.success == false) {
                throw new Error(response.message);
            }
            else{
                console.log(response);
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

export default useSignup;