import { Post } from "@/types/Types";
import axios from "axios";

const URL = "http://43.200.164.241:8000";

//포스트 목록 불러오기
export const getPostData = async (): Promise<Post[]> => {
  try {
    const response = await axios.get(`${URL}/posts/all`);
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
