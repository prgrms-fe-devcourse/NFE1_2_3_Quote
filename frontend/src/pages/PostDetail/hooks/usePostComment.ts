import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../apis/postCommentApi";

export const useCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, contents }: { postId: string; contents: string }) =>
      postComment(postId, { contents }),
    onSuccess: () => {
      console.log("성공");
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onError(error) {
      console.log(error);
    },
  });
};
