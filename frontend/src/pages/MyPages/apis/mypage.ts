import { authAxiosClient } from "@/pages/SignUpPage/apis/signUp";

// 사용자 프로필 인터페이스 정의
export interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  profileImage: string;
  myPosts: any[];
  bookMarkedPosts: any[];
}

// 공통 헤더 설정 함수
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
});

// 사용자 프로필 조회 함수
export async function fetchUserProfile() {
  const response = await authAxiosClient.get("/users/me", {
    headers: getAuthHeaders(),
  });
  validateResponse(response, "사용자 프로필 조회에 실패했습니다.");

  return response.data.data;
}

// 프로필 이미지 업로드 함수
export async function uploadProfileImage(file: File) {
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
export async function updateNickname(nickname: string) {
  const response = await authAxiosClient.patch(
    "/users",
    { nickname },
    { headers: getAuthHeaders() }
  );
  validateResponse(response, "닉네임 변경에 실패했습니다.");
}

// 응답 유효성 검사 함수
const validateResponse = (response: any, errorMessage: string) => {
  if (response.status !== 200 && response.status !== 201) {
    throw new Error(errorMessage);
  }
  if (!response.data?.success) {
    throw new Error(errorMessage);
  }
}

// 파일 형식 검사 함수
const validateFileType = (file: File) => {
  const validTypes = ["image/png", "image/jpeg"];
  if (!validTypes.includes(file.type)) {
    throw new Error("PNG 또는 JPEG 파일만 업로드할 수 있습니다.");
  }
}
