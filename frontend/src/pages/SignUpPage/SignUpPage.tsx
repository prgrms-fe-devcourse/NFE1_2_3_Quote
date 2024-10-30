import { useEffect } from "react";
import SignUpRoutePage from "./components/SignUpRoutePage";
import { KAKAO_API_KEY } from "./apis/signUp";

const SignUpPage = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_API_KEY);
    }
  });

  return (
    <div>
      <SignUpRoutePage />
    </div>
  );
};

export default SignUpPage;
