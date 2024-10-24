import { useMutation } from "@tanstack/react-query";
import { signUpRequest } from "../apis/signUp";
import React, { Dispatch } from "react";
import axios from "axios";
import { ErrorMessage } from "../components/SignUpForm";

interface setFunc {
  showAlert: () => void;
  setError: Dispatch<React.SetStateAction<ErrorMessage>>;
}

export const useSignUp = ({showAlert, setError}: setFunc) => {
  const signUpMutation = useMutation({
    mutationFn: signUpRequest,

    onSuccess: () => {
      console.log("SignUp Success");
      showAlert();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const { nickname, email, message } = error.response?.data;
        const errors: ErrorMessage = {
          nicknameErr: "",
          emailErr: "",
          message: ""
        }

        if (nickname) {
          errors.nicknameErr = "이미 존재하는 닉네임입니다.";
        } 
        if (email) {
          errors.emailErr = "이미 가입된 이메일입니다.";
        }
        if (message === "nickname already taken") {
          errors.nicknameErr = "이미 존재하는 닉네임입니다."
        } else if (message === "email already in use") {
          errors.emailErr = "이미 가입된 이메일입니다.";
        }

        return setError(errors);
      }
      console.error("Error: ", error);
    }
  })
  return signUpMutation;
}