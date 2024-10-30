import { userAxiosClient } from "@/pages/MainPage/apis/userApi";
import { Comment } from "@/types/Types";
import axios, { AxiosResponse } from "axios";

export const getPostComment = async (postId: string): Promise<Comment[]> => {
  try {
    const response = await userAxiosClient.get(`/comments/${postId}`);
    return response.data.data;
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

export const patchComment = async (
  commentId: string,
  data: { contents: string },
): Promise<Comment> => {
  try {
    const response = await userAxiosClient.patch(
      `/comments/${commentId}`,
      data,
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`서버 통신 실패`);
    } else {
      throw new Error("댓글 수정 실패");
    }
  }
};

export const deleteComment = async (commentId: string): Promise<AxiosResponse> => {
  try {
    const response = await userAxiosClient.delete(`/comments/${commentId}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`서버 통신 실패`);
    } else {
      throw new Error("댓글 삭제 실패");
    }
  }
};
