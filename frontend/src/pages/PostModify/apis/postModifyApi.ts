import { PostData } from "@/pages/PostCreate/apis/api";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");

  if (accessToken) {
    config.headers["Authorization"] = `bearer ${accessToken}`;
  }

  return config;
});

interface modifyForm {
  data: PostData;
  postId: string;
}

export const modifyPost = (modifyForm: modifyForm) => {
  return api.patch(`/posts/${modifyForm.postId}`, modifyForm.data);
};
