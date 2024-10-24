import axios, { AxiosInstance } from "axios";

const URL = "http://43.200.164.241:8000";
const TOKEN = import.meta.env.TOKEN;

// 사용자 axiosClient
export const userAxiosClient: AxiosInstance = axios.create({
  baseURL: URL,
  timeout: 2000,
  headers: {
    accept: "application/json",
    Authorization: `bearer ${TOKEN}`,
  },
});

export const useGetUserData = async () => {
  try{
    const response = await userAxiosClient.get(`${URL}/users/me`)
    return response.data.data
  }catch(error){
    if (axios.isAxiosError(error)) {
      throw new Error(`서버 통신 실패`);
    } else {
      throw new Error("포스트 불러오기 실패");
    }
  }
}