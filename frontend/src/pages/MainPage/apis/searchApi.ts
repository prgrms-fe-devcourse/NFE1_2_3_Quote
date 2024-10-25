import axios from "axios";
import { postAxiosClient } from "./postApi";

const URL = "http://43.200.164.241:8000";

export const getSearchPost = async (title: string, category : string) => {
  try {
    const response = await postAxiosClient.get(`${URL}/posts/search?title=${title}&category=${category}`);
    console.log(response)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`서버 통신 실패`);
    } else {
      throw new Error("포스트 불러오기 실패");
    }
  }
};
