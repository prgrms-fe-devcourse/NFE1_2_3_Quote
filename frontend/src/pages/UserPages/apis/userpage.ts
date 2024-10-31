import { authAxiosClient } from "@/pages/SignUpPage/apis/signUp";
import { UserMe, User, Post } from "@/types/Types";

// 공통 헤더 설정 함수
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// 로그인한 사용자 프로필 조회 함수
export async function fetchMyProfile(): Promise<UserMe> {
  const response = await authAxiosClient.get("/users/me", {
    headers: getAuthHeaders(),
  });
  validateResponse(response, "사용자 프로필 조회에 실패했습니다.");

  return response.data.data;
}

// 다른 유저 프로필 조회 함수
export async function fetchUserProfile(userId: string): Promise<User> {
  const response = await authAxiosClient.get(`/users/${userId}`, {
    headers: getAuthHeaders(),
  });
  validateResponse(response, "사용자 정보 조회에 실패했습니다.");
  return response.data.data;
}

// 특정 포스트 조회 함수
export async function fetchPostById(postId: string): Promise<Post> {
  try {
    const response = await authAxiosClient.get(`/posts/${postId}`, {
      headers: getAuthHeaders(),
    });
    validateResponse(response, "포스트 조회에 실패했습니다.");
    return response.data.data;
  } catch (error) {
    console.error(`포스트 ${postId} 조회 중 오류 발생:`, error);
    throw error;
  }
}

// 다른 유저가 작성한 포스트 조회 함수
export async function fetchUserPosts(userMe: User): Promise<Post[]> {
  try {
    const validPostIds = userMe.myPosts.map((post) => {
      if (typeof post === "object" && post._id) {
        return String(post._id);
      }
      return String(post);
    });

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

// 응답 유효성 검사 함수
const validateResponse = (response: any, errorMessage: string) => {
  if (response.status !== 200 && response.status !== 201) {
    throw new Error(errorMessage);
  }
  if (!response.data?.success) {
    throw new Error(errorMessage);
  }
};
