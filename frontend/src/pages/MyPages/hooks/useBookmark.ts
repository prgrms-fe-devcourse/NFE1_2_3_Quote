import { useCallback, useState, useEffect } from "react";
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { Post } from "@/types/Types";
import { postBookmark } from "@/pages/MainPage/apis/bookmarkApi";

interface UseBookmarkProps {
  post: Post;
  isBookmarked: boolean;
  onAddBookmark: (post: Post) => void;
  onRemoveBookmark: (postId: string) => void;
}

export const useBookmark = ({
  post,
  isBookmarked: initialIsBookmarked,
  onAddBookmark,
  onRemoveBookmark,
}: UseBookmarkProps) => {
  const queryClient = useQueryClient();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [bookmarkCount, setBookmarkCount] = useState<number>(
    post.bookMarked?.length || 0,
  );

  useEffect(() => {
    setIsBookmarked(initialIsBookmarked);
  }, [initialIsBookmarked]);

  const mutation: UseMutationResult<void, Error, void> = useMutation({
    mutationFn: async () => {
      await postBookmark(post._id);
    },
    onSuccess: () => {
      const newIsBookmarked = !isBookmarked;
      setIsBookmarked(newIsBookmarked);
      setBookmarkCount((prev) =>
        newIsBookmarked ? prev + 1 : Math.max(prev - 1, 0),
      );

      if (newIsBookmarked) {
        onAddBookmark(post);
      } else {
        onRemoveBookmark(post._id);
      }

      queryClient.setQueryData<Post[]>(["bookmarkedPosts"], (prev) =>
        newIsBookmarked
          ? [...(prev || []), post]
          : prev?.filter((p) => p._id !== post._id) || [],
      );

      queryClient.setQueryData<Post[]>(
        ["myPosts"],
        (prev) =>
          prev?.map((p) =>
            p._id === post._id ? { ...p, isBookmarked: newIsBookmarked } : p,
          ) || [],
      );
    },
    onError: (error) => {
      console.error("Bookmark error:", error);
      alert("북마크 작업에 실패했습니다.");
    },
  });

  const toggleBookmark = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return { bookmarkCount, isBookmarked, toggleBookmark };
};
