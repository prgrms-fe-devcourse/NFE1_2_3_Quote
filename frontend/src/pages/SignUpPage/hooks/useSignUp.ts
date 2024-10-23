import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { signUpRequest } from "../apis/signUp";

export const useSignUp = () => {
  const signUpMutation = useMutation({
    mutationFn: signUpRequest,

    onSuccess: (result) => {
      console.log("SignUp Success: ", result);
    },
    onError: (error) => {
      console.error("Error: ", error);
    }
  })
  return signUpMutation;
}