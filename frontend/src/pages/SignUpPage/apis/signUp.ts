import axios, { AxiosInstance } from "axios";

interface SignUpData {
  nickname: string;
  email: string;
  password: string;
}

const siteUrl = "http://43.200.164.241:8000/"

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
    const res = await authAxiosClient.post('/signup', newUser);

    if (res.status === 200) {
      console.log("SignUp Success");
      return res.data;
    } 
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;

      if (status === 500) {
        console.error("Server error");
      }

      return null;
    }
  }
}