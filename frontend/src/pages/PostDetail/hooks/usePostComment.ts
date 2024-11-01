import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Comment } from "@/types/Types";
import { AxiosResponse } from "axios";
import {
  deleteComment,
  getPostComment,
  patchComment,
  postComment,
} from "../apis/postCommentApi";

type PostCommentType = { postId: string; contents: string };
type ModifyCommentType = { commentId: string; contents: string };
type DeleteCommentType = { commentId: string };

export const useGetComment = (postId: string) => {
  const { data, isError } = useQuery<Comment[]>({
    queryKey: ["comment", postId],
    queryFn: () => getPostComment(postId),
  });

  return { data, isError };
};

export const useCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Comment, Error, PostCommentType>({
    mutationFn: ({ postId, contents }) => postComment(postId, { contents }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onError(error) {
      console.log(error);
    },
  });
};

export const useModifyCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Comment, Error, ModifyCommentType>({
    mutationFn: ({ commentId, contents }) =>
      patchComment(commentId, { contents }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, Error, DeleteCommentType>({
    mutationFn: ({ commentId }) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
