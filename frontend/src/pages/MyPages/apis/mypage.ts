import { authAxiosClient } from "@/pages/SignUpPage/apis/signUp";
import { UserMe } from "@/types/Types";

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
