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

export interface userInfoResponse {
  data: {
    id: string;
    createdAt: string;
    email: string;
    nickname: string;
    profileImage: string;
    myPosts: string[];
    bookMarkedPosts: string[];
  };
}

export interface postInfo {
  data: {
    _id: string;
    category: string;
    title: string;
    content: string;
    quote: string;
    authorId: {
      _id: string;
      nickname: string;
      profileImage: string;
    };
    bookMarked: [
      {
        userId: string;
      },
    ];
    createdAt: string;
    updatedAt: string;
  };
}

export const getLoggedInUser = async () => {
  try {
    const response = await api.get<userInfoResponse>("/users/me");
    return response.data.data;
  } catch (error) {
    console.error("유저 데이터를 불러오기 실패");
    throw error;
  }
};

export const getPostInfo = async (postId: string) => {
  try {
    const response = await api.get<postInfo>(`/posts/${postId}`);
    return response.data.data;
  } catch (error) {
    console.error("포스트 데이터 불러오기 실패");
    throw error;
  }
};

export const deletePost = (postId: string) => {
  return api.delete(`/posts/${postId}`);
};

export const bookMarked = (postId: string) => {
  return api.post(`/posts/${postId}/like`);
};
