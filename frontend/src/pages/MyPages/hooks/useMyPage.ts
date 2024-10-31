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

  const fetchBookmarkedPostsMutation = useMutation<Post[], Error, UserMe>({
    mutationFn: (profile) => fetchBookmarkedPosts(profile),
    onSuccess: (bookmarkedPosts) => {
      queryClient.setQueryData(["bookmarkedPosts"], bookmarkedPosts);
    },
    onError: (error) => {
      console.error("북마크 포스트 가져오기 실패:", error);
    },
  });

  const deleteAccountMutation = useMutation<void, Error>({
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      localStorage.removeItem("token");
      setShowDeleteSuccess(false);
      storeLogout();
      localStorage.setItem("showDeleteMessage", "true");
      navigate("/");
    },
  });

  useEffect(() => {
    fetchUserProfileMutation.mutate();
  }, []);

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
    const isDataUrl = updatedImage.startsWith("data:image");

    queryClient.setQueryData<UserMe>(["userProfile"], (prevProfile) => ({
      ...prevProfile!,
      profileImage: isDataUrl
        ? updatedImage
        : `${updatedImage}?timestamp=${new Date().getTime()}`,
      nickname: updatedNickname,
    }));
    setShowEditSuccess(true);
    setTimeout(() => setShowEditSuccess(false), 3000);
    fetchUserProfileMutation.mutate();
  };

  const handleAddBookmark = (post: Post) => {
    queryClient.setQueryData<Post[]>(
      ["bookmarkedPosts"],
      (prevBookmarkedPosts) => {
        const existingPost = (prevBookmarkedPosts || []).find(
          (p) => p._id === post._id,
        );

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
