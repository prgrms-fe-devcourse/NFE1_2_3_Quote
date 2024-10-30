import { useEffect } from "react";
import SignUpRoutePage from "./components/SignUpRoutePage";
import { KAKAO_API_KEY } from "./apis/signUp";

const SignUpPage = () => {
  return (
    <div>
      <SignUpRoutePage />
    </div>
  );
};

export default SignUpPage;
