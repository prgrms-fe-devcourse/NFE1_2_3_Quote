import axios from "axios";
import { userAxiosClient } from "./userApi";
import { Post } from "@/types/Types";

export const postBookmark = async (postId: string): Promise<Post> => {
  try {
    const response = await userAxiosClient.post(`/posts/${postId}/like`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`서버 통신 실패`);
    } else {
      throw new Error("포스트 불러오기 실패");
    }
  }
};
