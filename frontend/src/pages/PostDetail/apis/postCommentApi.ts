import { userAxiosClient } from "@/pages/MainPage/apis/userApi";
import { Comment } from "@/types/Types";
import axios from "axios";

const URL = "http://43.200.164.241:8000";

export const getPostComment = async (): Promise<Comment[]> => {
  try {
    const response = await userAxiosClient.get(`/comments`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`서버 통신 실패`);
    } else {
      throw new Error("댓글 불러오기 실패");
    }
  }
};

export const postComment = async (
  postId: string,
  data: { contents: string },
): Promise<Comment> => {
  try {
    const response = await userAxiosClient.post(`/comments/${postId}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`서버 통신 실패`);
    } else {
      throw new Error("댓글 작성 실패");
    }
  }
};
