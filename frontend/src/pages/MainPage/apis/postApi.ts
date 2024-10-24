import { Post } from "@/types/Types";
import axios, { AxiosInstance } from "axios";

const URL = "http://43.200.164.241:8000";

// 포스트 전용 axiosClient
export const postAxiosClient: AxiosInstance = axios.create({
  baseURL: URL,
  timeout: 2000,
  headers: {
    accept: "application/json",
  },
});

//포스트 목록 불러오기
export const getPostData = async (): Promise<Post[]> => {
  try {
    const response = await postAxiosClient.get(`${URL}/posts/all`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`서버 통신 실패`);
    } else {
      throw new Error("포스트 불러오기 실패");
    }
  }
};

//특정 카테고리 포스트 목록 불러오기
export const getCategoryPostData = async (
  category: string,
): Promise<Post[]> => {
  try {
    const response = await postAxiosClient.get(
      `${URL}/posts/quote/${category}`,
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`서버 통신 실패`);
    } else {
      throw new Error("포스트 불러오기 실패");
    }
  }
};