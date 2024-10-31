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
    queryClient.refetchQueries({ queryKey: ["posts", post._id] });
  }, [post._id, queryClient]);

  useEffect(() => {
    const cachedPost = queryClient.getQueryData<Post>(["posts", post._id]);
    if (cachedPost) {
      const currentlyBookmarked = cachedPost.bookMarked.some(
        (b) => b.userId === post.authorId._id,
      );
      setIsBookmarked(currentlyBookmarked);
    } else {
      setIsBookmarked(initialIsBookmarked);
    }
  }, [post, queryClient, initialIsBookmarked]);

  const mutation: UseMutationResult<void, Error, void> = useMutation({
    mutationFn: async () => {
      await postBookmark(post._id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts", post._id] });

      const newIsBookmarked = !isBookmarked;
      setIsBookmarked(newIsBookmarked);
      setBookmarkCount((prev) =>
        newIsBookmarked ? prev + 1 : Math.max(prev - 1, 0),
      );

      queryClient.setQueryData<Post>(["posts", post._id], (oldPost) => {
        if (!oldPost) return oldPost;

        const updatedBookMarked = newIsBookmarked
          ? [...oldPost.bookMarked, { userId: post.authorId._id }]
          : oldPost.bookMarked.filter((b) => b.userId !== post.authorId._id);

        return { ...oldPost, bookMarked: updatedBookMarked };
      });

      if (newIsBookmarked) {
        onAddBookmark(post);
      } else {
        onRemoveBookmark(post._id);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts", post._id] });
      await queryClient.invalidateQueries({ queryKey: ["userPosts"] });
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
