import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserMe, Post } from "@/types/Types";
import { useAuthStore } from "@/pages/LogInPage/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserProfile,
  deleteUserAccount,
  fetchMyPosts,
  fetchBookmarkedPosts,
} from "../apis/mypage";

export const useMyPage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [menuVisible, setMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(
    localStorage.getItem("profileEditSuccess") === "true",
  );
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { storeLogout } = useAuthStore();
  const queryClient = useQueryClient();

  const menuRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLDivElement>(null);

  // 사용자 프로필 가져오기
  const fetchUserProfileMutation = useMutation<UserMe, Error>({
    mutationFn: fetchUserProfile,
    onSuccess: (profile) => {
      queryClient.setQueryData(["userProfile"], profile);
      fetchMyPostsMutation.mutate(profile);
      fetchBookmarkedPostsMutation.mutate(profile);
    },
    onError: (error) => {
      console.error("사용자 프로필 가져오기 실패:", error);
    },
  });

  // 마이 포스트 가져오기
  const fetchMyPostsMutation = useMutation<Post[], Error, UserMe>({
    mutationFn: (profile) => fetchMyPosts(profile),
    onSuccess: (posts) => {
      const sortedPosts = posts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      queryClient.setQueryData(["myPosts"], sortedPosts);
    },
    onError: (error) => {
      console.error("마이 포스트 가져오기 실패:", error);
    },
  });

  // 북마크한 포스트 가져오기
  const fetchBookmarkedPostsMutation = useMutation<Post[], Error, UserMe>({
    mutationFn: (profile) => fetchBookmarkedPosts(profile),
    onSuccess: (bookmarkedPosts) => {
      queryClient.setQueryData(["bookmarkedPosts"], bookmarkedPosts);
    },
    onError: (error) => {
      console.error("북마크 포스트 가져오기 실패:", error);
    },
  });

  // 계정 탈퇴
  const deleteAccountMutation = useMutation<void, Error>({
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      localStorage.removeItem("token");
      setShowDeleteSuccess(true);
      storeLogout();
      setTimeout(() => {
        setShowDeleteSuccess(false);
        navigate("/");
      }, 3000);
    },
    onError: () => {
      alert("계정 탈퇴 실패. 다시 시도해주세요.");
    },
  });

  useEffect(() => {
    fetchUserProfileMutation.mutate();
  }, []);

  useEffect(() => {
    if (showEditSuccess) {
      setTimeout(() => {
        setShowEditSuccess(false);
        localStorage.removeItem("profileEditSuccess");
      }, 3000);
    }
  }, [showEditSuccess]);

  const toggleMenu = useCallback(() => {
    setMenuVisible((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      menuRef.current &&
      settingsButtonRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !settingsButtonRef.current.contains(event.target as Node)
    ) {
      setMenuVisible(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleUpdateProfile = (
    updatedImage: string,
    updatedNickname: string,
  ) => {
    queryClient.setQueryData<UserMe>(["userProfile"], (prevProfile) => ({
      ...prevProfile!,
      profileImage: `${updatedImage}?timestamp=${new Date().getTime()}`,
      nickname: updatedNickname,
    }));
    localStorage.setItem("profileEditSuccess", "true");
    fetchUserProfileMutation.mutate();
  };

  // 북마크 추가
  const handleAddBookmark = (post: Post) => {
    queryClient.setQueryData<Post[]>(
      ["bookmarkedPosts"],
      (prevBookmarkedPosts) => {
        const existingPost = (prevBookmarkedPosts || []).find(
          (p) => p._id === post._id,
        );

        // 북마크 포스트 목록에만 추가
        return existingPost
          ? prevBookmarkedPosts
          : [post, ...(prevBookmarkedPosts || [])];
      },
    );

    queryClient.setQueryData(["myPosts"], (prevMyPosts: Post[] | undefined) =>
      (prevMyPosts || []).map((p) =>
        p._id === post._id ? { ...p, isBookmarked: true } : p,
      ),
    );
  };

  // 북마크 해제
  const handleRemoveBookmark = (postId: string) => {
    queryClient.setQueryData<Post[]>(
      ["bookmarkedPosts"],
      (prevBookmarkedPosts) =>
        (prevBookmarkedPosts || []).filter((post) => post._id !== postId),
    );

    queryClient.setQueryData(["myPosts"], (prevMyPosts: Post[] | undefined) =>
      (prevMyPosts || []).map((p) =>
        p._id === postId
          ? {
              ...p,
              isBookmarked: false,
              bookMarked: (p.bookMarked || []).filter(
                (user) =>
                  user.userId !==
                  queryClient.getQueryData<UserMe>(["userProfile"])?.id,
              ),
            }
          : p,
      ),
    );
  };

  const handleSelectPost = useCallback((postId: string) => {
    navigate(`/post/${postId}`, { state: { from: "myPage" } });
  }, []);

  return {
    userProfile: queryClient.getQueryData<UserMe>(["userProfile"]),
    myPosts: queryClient.getQueryData<Post[]>(["myPosts"]) || [],
    bookmarkedPosts:
      queryClient.getQueryData<Post[]>(["bookmarkedPosts"]) || [],
    activeTab,
    setActiveTab,
    menuVisible,
    setMenuVisible,
    isModalOpen,
    setIsModalOpen,
    showEditSuccess,
    showDeleteSuccess,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    menuRef,
    settingsButtonRef,
    handleDeleteAccount: deleteAccountMutation.mutate,
    handleUpdateProfile,
    handleAddBookmark,
    handleRemoveBookmark,
    toggleMenu,
    handleSelectPost,
  };
};
