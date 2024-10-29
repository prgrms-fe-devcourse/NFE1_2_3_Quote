import axios, { AxiosInstance } from "axios";

interface SignUpData {
  nickname: string;
  email: string;
  password: string;
}

declare global {
  interface Window {
    Kakao: any;
  }
}

const siteUrl = "http://43.200.164.241:8000/"
export const KAKAO_API_KEY = import.meta.env.VITE_APP_KAKAO_JS_KEY;
export const REDIRECT_URI = import.meta.env.VITE_APP_REDIRECT_URI;

//회원가입과 로그인에 사용할 axiosClient
export const authAxiosClient: AxiosInstance = axios.create({
  baseURL: siteUrl,
  timeout: 2000,
  headers: {
    accept: 'application/json'
  }
});

//회원가입 요청
export const signUpRequest = async (newUser: SignUpData) => {
  try {
    const res = await authAxiosClient.post('/users/signup', newUser);

    if (res.status === 200) {
      console.log("SignUp Success");
      return res.data;
    } 
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;

      if (status === 400) {
        console.error("Duplicate error");
      } 
      if (status === 500) {
        console.error("Server error");
      }

      throw err;
    } else {
      console.error("Unexpected Error");
      throw err;
    }
  }
}

//카카오 로그인 및 회원가입
