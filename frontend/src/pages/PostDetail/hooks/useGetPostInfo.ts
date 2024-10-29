import { useQuery } from "@tanstack/react-query";
import { getPostInfo } from "../apis/postDetailApi";

const useGetPostInfo = (postId: string) => {
  const { data: postInfo } = useQuery({
    queryKey: ["postInfo"],
    queryFn: () => getPostInfo(postId),
  });
  return { postInfo };
};

export default useGetPostInfo;
