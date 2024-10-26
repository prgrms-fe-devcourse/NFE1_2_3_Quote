import axios from "axios";
import { authAxiosClient } from "@/pages/SignUpPage/apis/signUp";

const URL = "http://43.200.164.241:8000";

export const postBookmark = async (postId: string) => {
  try {
    const response = await authAxiosClient.post(`${URL}/posts/${postId}/like`);
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
