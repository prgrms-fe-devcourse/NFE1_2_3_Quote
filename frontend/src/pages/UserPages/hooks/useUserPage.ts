import { useCallback, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { User, Post, UserMe } from "@/types/Types";
import {
  fetchUserProfile,
  fetchUserPosts,
  fetchMyProfile,
} from "../apis/userpage";

export const useUserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);
  const [postsState, setPostsState] = useState<Post[]>([]);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [myProfile, setMyProfile] = useState<UserMe | null>(null);

  const sortPostsByDate = (posts: Post[]): Post[] => {
    return [...posts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  };

  const fetchMyProfileMutation = useMutation<UserMe, Error>({
    mutationFn: async () => fetchMyProfile(),
    onSuccess: (profile) => {
      setMyProfile(profile);
      const bookmarkedIds = profile.bookMarkedPosts.map((post) => post._id);
      setBookmarkedPosts(bookmarkedIds);
    },
    onError: (error) => {
      console.error("내 프로필을 가져오는 중 오류 발생:", error);
    },
  });

  const fetchUserProfileMutation = useMutation<User, Error>({
    mutationFn: async () => {
      if (!userId) throw new Error("유효한 사용자 ID가 없습니다.");
      return fetchUserProfile(userId);
    },
    onSuccess: (profile) => {
      setUserProfile(profile);
    },
    onError: (error) => {
      console.error("사용자 프로필을 가져오는 중 오류 발생:", error);
    },
  });

  const fetchPostsMutation = useMutation<Post[], Error>({
    mutationFn: async () => {
      if (!userProfile) throw new Error("사용자 정보가 없습니다.");
      return fetchUserPosts(userProfile);
    },
    onSuccess: (fetchedPosts) => {
      const sortedPosts = sortPostsByDate(fetchedPosts);
      setPostsState(sortedPosts);
    },
    onError: (error) => {
      console.error("포스트를 가져오는 중 오류 발생:", error);
    },
  });

  useEffect(() => {
    fetchMyProfileMutation.mutate();
    fetchUserProfileMutation.mutate();
  }, [userId]);

  useEffect(() => {
    if (userProfile) {
      fetchPostsMutation.mutate();
    }
  }, [userProfile]);

  const handleAddBookmark = useCallback(
    (post: Post) => {
      const updatedBookmarks = [...bookmarkedPosts, post._id];
      setBookmarkedPosts(updatedBookmarks);

      setPostsState((prevPosts) =>
        prevPosts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                bookMarked: [...p.bookMarked, { userId: myProfile?.id || "" }],
              }
            : p,
        ),
      );
    },
    [bookmarkedPosts, myProfile],
  );

  const handleRemoveBookmark = useCallback(
    (postId: string) => {
      const updatedBookmarks = bookmarkedPosts.filter((id) => id !== postId);
      setBookmarkedPosts(updatedBookmarks);

      setPostsState((prevPosts) =>
        prevPosts.map((p) =>
          p._id === postId
            ? {
                ...p,
                bookMarked: p.bookMarked.filter(
                  (b) => b.userId !== myProfile?.id,
                ),
              }
            : p,
        ),
      );
    },
    [bookmarkedPosts, myProfile],
  );

  const isBookmarked = useCallback(
    (postId: string) => {
      const post = postsState.find((p) => p._id === postId);
      return post
        ? post.bookMarked.some((b) => b.userId === myProfile?.id)
        : false;
    },
    [postsState, myProfile],
  );

  const handleSelectPost = useCallback(
    (postId: string) =>
      navigate(`/post/${postId}`, {
        state: { from: "UserPage", user: userId },
      }),
    [navigate],
  );

  return {
    user: userProfile,
    posts: postsState,
    isBookmarked,
    handleAddBookmark,
    handleRemoveBookmark,
    handleSelectPost,
  };
};
