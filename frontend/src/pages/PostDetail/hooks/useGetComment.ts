import { Comment, Post } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import { getPostComment } from "../apis/postCommentApi";

//전체 및 카테고리별 포스트 목록
export const useGetComment = (postId : string) => {
  const { data, isLoading, isError } = useQuery<Comment[]>({
    queryKey: ["comment"],
    queryFn: () => getPostComment(postId)
  });

  return { data, isLoading, isError };
};
