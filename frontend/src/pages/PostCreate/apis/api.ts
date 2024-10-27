import axios from "axios";

const BASE_URL = "http://43.200.164.241:8000";

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

interface PostData {
  category: string;
  title: string;
  content: string;
  quote: string;
}

export const createPost = (data: PostData) => {
  return api.post("/posts", data);
};
