import { Post } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import { getCategoryPostData, getPostData } from "../apis/postApi";

//전체 및 카테고리별 포스트 목록
export const useGetCategoryPostData = (category: string) => {
  const { data, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["categoryPost", category],
    queryFn: () =>
      category === "전체" ? getPostData() : getCategoryPostData(category),
  });

  return { data, isLoading, isError };
};
