import { getToken } from "@/pages/LogInPage/store/authStore";
import axios, { AxiosInstance } from "axios";

const URL = "http://43.200.164.241:8000";

// 사용자 axiosClient
export const userAxiosClient: AxiosInstance = axios.create({
  baseURL: URL,
  timeout: 2000,
  headers: {
    accept: "application/json",
  },
});

// 최신 토큰 가져오도록 함
userAxiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const getUserData = async () => {
  try {
    const response = await userAxiosClient.get(`/users/me`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`서버 통신 실패`);
    } else {
      throw new Error("포스트 불러오기 실패");
    }
  }
};
