import { useEffect } from "react";
import { KAKAO_API_KEY } from "../SignUpPage/apis/signUp";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_API_KEY);
    }
  });

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
