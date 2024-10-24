import { Post } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import { getCategoryPostData, getPostData } from "../apis/mainPageApi";

//포스트 목록
export const useGetPostData = () => {
  const { data, isError, isLoading } = useQuery<Post[]>({
    queryKey: ["postList"],
    queryFn: () => getPostData(),
  });

  return { data, isLoading, isError };
};

//카테고리별 목록
// export const useGetCategoryPostData = (category: string) => {
//   const { data, isLoading, isError } = useQuery<Post[]>({
//     queryKey: ["categoryPost", category],
//     queryFn: () => getCategoryPostData(category),
//   });

//   return { data, isLoading, isError };
// };

export const useGetCategoryPostData = (category: string) => {
  console.log('넘겨온 카테고리', category)
  const { data, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["categoryPost", category],
    queryFn: () =>
      category === "전체" ? getPostData() : getCategoryPostData(category),
  });

  return { data, isLoading, isError };
};
