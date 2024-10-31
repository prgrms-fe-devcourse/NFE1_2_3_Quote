import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;;

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

export interface PostData {
  category: string;
  title: string;
  content: string;
  quote: string;
}

export const createPost = (data: PostData) => {
  return api.post("/posts", data);
};
