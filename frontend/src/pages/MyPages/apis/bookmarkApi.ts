import axios from "axios";
import { authAxiosClient } from "@/pages/SignUpPage/apis/signUp";

const URL = "http://43.200.164.241:8000";

// 북마크 API 호출 함수
export const postBookmark = async (postId: string) => {
  try {
    const response = await authAxiosClient.post(
      `${URL}/posts/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error);
      throw new Error("서버 통신 실패");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("포스트 불러오기 실패");
    }
  }
};
