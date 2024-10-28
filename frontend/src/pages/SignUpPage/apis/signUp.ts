import axios, { AxiosInstance } from "axios";

interface SignUpData {
  nickname: string;
  email: string;
  password: string;
}

const siteUrl = "http://43.200.164.241:8000/"
export const REST_API_KEY = "앱 키";
export const REDIRECT_URI = `http://localhost:8000/auth/kakao`;
export const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

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