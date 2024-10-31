import { Post } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import {
  getCategoryPostData,
  getPostData,
  getSearchPostData,
} from "../apis/postApi";

//전체 및 카테고리별 포스트 목록
export const useGetCategoryPostData = (category: string, search?: string) => {
  const { data, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["categoryPost", category, search],
    queryFn: () => {
      if (search && category === "전체") {
        return getSearchPostData(search, "");
      } else if (search) {
        return getSearchPostData(search, category);
      }
      return category === "전체"
        ? getPostData()
        : getCategoryPostData(category);
    },
  });

  return { data, isLoading, isError };
};
