import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBookmark } from "../apis/bookmarkApi";
import { Post } from "@/types/Types";

//북마크 mutation
export const useBookmarkMutation = (
  post: Post,
  bookmark: boolean,
  userId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postBookmark(postId),
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["categoryPost"] });
      const previousPost = queryClient.getQueryData<Post>([
        "categoryPost",
      ]);

      if (previousPost) {
        queryClient.setQueryData(["categoryPost"], {
          ...previousPost,
          bookMarked: bookmark
            ? previousPost.bookMarked.filter((user) => user.userId !== userId)
            : [...previousPost.bookMarked, { userId }],
        });
      }
      return { previousPost: previousPost || post };
    },
    onError: (error, data, context?: { previousPost: Post }) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          ["categoryPost"],
          context.previousPost,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryPost"] });
    },
  });
};
