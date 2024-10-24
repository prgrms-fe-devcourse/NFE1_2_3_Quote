import { useMutation } from "@tanstack/react-query"
import { loginRequest } from "../apis/loginAndLogout"
import { useNavigate } from "react-router-dom"
import { Dispatch } from "react";
import axios from "axios";

interface ErrorMessage {
  emailErr?: string;
  passwordErr?: string;
}

export const useLogin = (setError: Dispatch<React.SetStateAction<ErrorMessage>>) => {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: loginRequest,

    onSuccess: () => {
      console.log("Login Success");
      navigate('/');
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        const {message} = err.response?.data;
        const error: ErrorMessage = {
          emailErr: "",
          passwordErr: ""
        }

        if (message === "This email is not registered") {
          error.emailErr = "등록되지 않은 이메일입니다."
        } else if (message === "You entered your password incorrectly") {
          error.passwordErr = "잘못된 비밀번호입니다."
        }

        return setError(error);
      }
      console.error("Error: ", err);
    }
  })
  return loginMutation;
}