import axios from "axios";

const BASE_URL = "http://43.200.164.241:8000/";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  // const accessToken = localStorage.get("accessToken");
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ5ZW9uZ1Rlc3RAZ21haWwuY29tIiwic3ViIjoiNjcxOWU4NzM1YzZhYTFjMGM2MzIyNzJlIiwiaWF0IjoxNzI5NzUxMzE1LCJleHAiOjE3Mjk4Mzc3MTV9.ZikSiCQ9tNVD0W4otKmJuPXOY2oQ09SccPd9YJtxTxM";

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
