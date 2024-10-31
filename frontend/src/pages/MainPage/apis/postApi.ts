import { Post } from "@/types/Types";
import axios, { AxiosInstance } from "axios";

const URL = import.meta.env.VITE_APP_SERVER_URL;

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
    const response = await postAxiosClient.get(`/posts/all`);
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
    const response = await postAxiosClient.get(`/posts/quote/${category}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`서버 통신 실패`);
    } else {
      throw new Error("포스트 불러오기 실패");
    }
  }
};

//검색된 목록 불러오기
export const getSearchPostData = async (
  title: string,
  category: string,
): Promise<Post[]> => {
  try {
    const response = await postAxiosClient.get(
      `/posts/search?title=${title}&category=${category}`,
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`서버 통신 실패`);
    } else {
      throw new Error("포스트 불러오기 실패");
    }
  }
};
