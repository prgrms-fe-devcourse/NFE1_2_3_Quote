import { authAxiosClient } from "@/pages/SignUpPage/apis/signUp";

export interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  profileImage: string;
  myPosts: any[];
  bookMarkedPosts: any[];
}

export const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem("authToken");
    const res = await authAxiosClient.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200 || !res.data.success) {
      throw new Error("Failed to fetch user profile.");
    }

    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
};

// 프로필 이미지 업로드
export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("Image", file); 

  try {
    const token = localStorage.getItem("authToken");
    const res = await authAxiosClient.patch("/users/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed to upload profile image.");
    }

    return res.data.profileImage;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

// 닉네임 변경
export const updateNickname = async (nickname: string): Promise<void> => {
  try {
    const token = localStorage.getItem("authToken");
    const res = await authAxiosClient.patch(
      "/users",
      { nickname },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed to update nickname.");
    }
  } catch (error) {
    console.error("Failed to update nickname:", error);
    throw error;
  }
};
