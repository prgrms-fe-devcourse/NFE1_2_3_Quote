import { authAxiosClient } from "@/pages/SignUpPage/apis/signUp"
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

//로그인 요청
export const loginRequest = async (user: LoginData) => {
  try {
    const res = await authAxiosClient.post('/users/signin', user);

    if (res.status === 200) {
      console.log("Login Success");
      return res.data; 
    } 
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;

      if (status === 401) {
        console.error("Unauthorized");
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

//로그아웃
export const logout = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token does not exist');
    } 
    localStorage.removeItem('token');
  } catch (err) {
    console.error("Logout failed");
  }
}