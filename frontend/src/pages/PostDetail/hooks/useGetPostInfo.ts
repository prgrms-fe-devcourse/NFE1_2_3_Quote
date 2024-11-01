import { useQuery } from "@tanstack/react-query";
import { getPostInfo } from "../apis/postDetailApi";

const useGetPostInfo = (postId: string) => {
  const { data: postInfo, isLoading } = useQuery({
    queryKey: ["postInfo", postId],
    queryFn: () => getPostInfo(postId),
  });
  return { postInfo, isLoading };
};

export default useGetPostInfo;
