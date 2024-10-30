import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, patchComment, postComment } from "../apis/postCommentApi";

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

export const useModifyCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      contents,
    }: {
      commentId: string;
      contents: string;
    }) => patchComment(commentId, { contents }),
    onSuccess: () => {
      console.log("수정 성공");
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: { commentId: string }) =>
      deleteComment(commentId),
    onSuccess: () => {
      console.log("삭제 성공");
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
