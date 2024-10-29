import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserMe, Post } from "@/types/Types";
import { useAuthStore } from "@/pages/LogInPage/store/authStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserProfile,
  deleteUserAccount,
  fetchMyPosts,
  fetchBookmarkedPosts,
} from "../apis/mypage";

export const useMyPage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [bookmarkedPostsState, setBookmarkedPostsState] = useState<Post[]>([]);
  const [myPostsState, setMyPostsState] = useState<Post[]>([]);
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

  const { data: userProfile, isLoading: profileLoading } = useQuery<
    UserMe,
    Error
  >({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const { data: myPosts = [], isLoading: postsLoading } = useQuery<
    Post[],
    Error
  >({
    queryKey: ["myPosts", userProfile?.id],
    queryFn: () => fetchMyPosts(userProfile!),
    enabled: !!userProfile,
  });

  const { data: bookmarkedPosts = [], isLoading: bookmarksLoading } = useQuery<
    Post[],
    Error
  >({
    queryKey: ["bookmarkedPosts", userProfile?.id],
    queryFn: () => fetchBookmarkedPosts(userProfile!),
    enabled: !!userProfile,
  });

  useEffect(() => {
    const sortedPosts = [...myPosts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    setMyPostsState(sortedPosts);
  }, [myPosts]);

  useEffect(() => {
    setBookmarkedPostsState(bookmarkedPosts);
  }, [bookmarkedPosts]);

  const deleteAccountMutation = useMutation<void, Error, void>({
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
      alert("탈퇴에 실패했습니다. 다시 시도해 주세요.");
    },
  });

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

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        menuRef.current &&
        settingsButtonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !settingsButtonRef.current.contains(event.target as Node)
      ) {
        setMenuVisible(false);
      }
    },
    [menuRef, settingsButtonRef],
  );

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
    window.location.reload();
  };

  const handleAddBookmark = (post: Post) => {
    const updatedBookmarks = [post, ...bookmarkedPostsState];
    setBookmarkedPostsState(updatedBookmarks);

    const updatedMyPosts = myPostsState.map((p) =>
      p._id === post._id ? { ...p, isBookmarked: true } : p,
    );
    setMyPostsState(updatedMyPosts);

    queryClient.setQueryData(["bookmarkedPosts"], updatedBookmarks);
  };

  const handleRemoveBookmark = (postId: string) => {
    const updatedBookmarks = bookmarkedPostsState.filter(
      (post) => post._id !== postId,
    );
    setBookmarkedPostsState(updatedBookmarks);

    const updatedMyPosts = myPostsState.map((p) =>
      p._id === postId
        ? {
            ...p,
            isBookmarked: false,
            bookMarked: (p.bookMarked || []).filter(
              (user) => user.userId !== userProfile?.id,
            ),
          }
        : p,
    );
    setMyPostsState(updatedMyPosts);

    queryClient.setQueryData(["bookmarkedPosts"], updatedBookmarks);
  };

  return {
    userProfile,
    myPosts: myPostsState,
    bookmarkedPosts: bookmarkedPostsState,
    loading: profileLoading || postsLoading || bookmarksLoading,
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
  };
};
