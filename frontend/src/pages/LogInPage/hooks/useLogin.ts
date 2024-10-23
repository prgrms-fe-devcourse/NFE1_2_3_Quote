import { useMutation } from "@tanstack/react-query"
import { loginRequest } from "../apis/login"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: loginRequest,

    onSuccess: () => {
      console.log("Login Success");
      navigate('/');
    },
    onError: (err) => {
      console.error("Error: ", err);
    }
  })
  return loginMutation;
}