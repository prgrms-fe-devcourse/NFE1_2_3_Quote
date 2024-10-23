import { Post } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import { getPostData } from "../apis/mainPageApi";

//포스트 목록
export const useGetPostData = () => {
  const { data, isError, isLoading } = useQuery<Post[]>({
    queryKey: ["postList"],
    queryFn: () => getPostData(),
  });

  return { data, isLoading, isError };
};
