import { authAxiosClient } from "@/pages/SignUpPage/apis/signUp"
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

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

      if (status === 500) {
        console.error("Server error");
      }

      return null;
    }
  }
}