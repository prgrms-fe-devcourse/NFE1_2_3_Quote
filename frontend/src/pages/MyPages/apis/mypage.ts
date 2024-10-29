import { authAxiosClient } from "@/pages/SignUpPage/apis/signUp";
import { UserMe, Post } from "@/types/Types";
import axios from "axios";

// 공통 헤더 설정 함수
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// 사용자 프로필 조회 함수
export async function fetchUserProfile(): Promise<UserMe> {
  const response = await authAxiosClient.get("/users/me", {
    headers: getAuthHeaders(),
  });
  validateResponse(response, "사용자 프로필 조회에 실패했습니다.");

  return response.data.data;
}

// 프로필 이미지 업로드 함수
export async function uploadProfileImage(file: File): Promise<string> {
  validateFileType(file);

  const formData = new FormData();
  formData.append("image", file);

  const response = await authAxiosClient.patch("/users/upload", formData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });
  validateResponse(response, "프로필 이미지 업로드에 실패했습니다.");

  return response.data.profileImage;
}

// 닉네임 변경 함수
export async function updateNickname(nickname: string): Promise<void> {
  const response = await authAxiosClient.patch(
    "/users",
    { nickname },
    { headers: getAuthHeaders() },
  );
  validateResponse(response, "닉네임 변경에 실패했습니다.");
}

// 닉네임 중복 검사 함수
export async function checkNicknameAvailability(nickname: string): Promise<void> {
  try {
    const response = await authAxiosClient.get(
      `/users/check/nickname/${nickname}`,
      { headers: getAuthHeaders() }
    );

    if (response.status === 200) {
    } else {
      throw new Error("닉네임 중복 검사에 실패했습니다.");
    }
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error("이미 사용중인 닉네임입니다.");
    } else {
      console.error("API 요청 실패:", error);
      throw new Error("닉네임 중복 검사 중 오류가 발생했습니다.");
    }
  }
}

// 회원탈퇴 함수
export async function deleteUserAccount(): Promise<void> {
  try {
    const response = await authAxiosClient.delete("/users", {
      headers: getAuthHeaders(),
    });

    if (response.status !== 200) {
      console.error("응답 상태 코드:", response.status);
      throw new Error("회원 탈퇴에 실패했습니다.");
    }
  } catch (error) {
    console.error("회원 탈퇴 요청 실패:", error);
    throw error;
  }
}

// 특정 포스트 조회 함수
export async function fetchPostById(postId: string): Promise<Post> {
  const response = await authAxiosClient.get(`/posts/${postId}`, {
    headers: getAuthHeaders(),
  });
  validateResponse(response, "포스트 조회에 실패했습니다.");
  return response.data.data;
}

// 내가 작성한 포스트 조회 함수
export async function fetchMyPosts(userMe: UserMe): Promise<Post[]> {
  try {
    const validPostIds = userMe.myPosts.map((postId) => String(postId));

    if (validPostIds.length === 0) {
      console.warn("유효한 포스트 ID가 없습니다.");
      return [];
    }

    const posts = await Promise.all(
      validPostIds.map((postId) => fetchPostById(postId)),
    );

    const validPosts = posts.filter((post) => post !== null);
    return validPosts;
  } catch (error) {
    console.error("내 포스트를 가져오는 중 오류 발생:", error);
    throw error;
  }
}

// 북마크한 포스트 조회 함수
export async function fetchBookmarkedPosts(userMe: UserMe): Promise<Post[]> {
  try {
    const validBookmarkedIds = userMe.bookMarkedPosts.map((postId) =>
      String(postId),
    );

    if (validBookmarkedIds.length === 0) {
      console.warn("유효한 북마크 포스트 ID가 없습니다.");
      return [];
    }

    const posts = await Promise.all(
      validBookmarkedIds.map((postId) => fetchPostById(postId)),
    );

    const validPosts = posts.filter((post) => post !== null);
    return validPosts;
  } catch (error) {
    console.error("북마크한 포스트를 가져오는 중 오류 발생:", error);
    throw error;
  }
}

// 응답 유효성 검사 함수
const validateResponse = (response: any, errorMessage: string) => {
  if (response.status !== 200 && response.status !== 201) {
    throw new Error(errorMessage);
  }
  if (!response.data?.success) {
    throw new Error(errorMessage);
  }
};

// 파일 형식 검사 함수
const validateFileType = (file: File) => {
  const validTypes = ["image/png", "image/jpeg"];
  if (!validTypes.includes(file.type)) {
    throw new Error("PNG 또는 JPEG 파일만 업로드할 수 있습니다.");
  }
};
