import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBookmark } from "../apis/bookmarkApi";
import { Post } from "@/types/Types";

//북마크 mutation
//Optimistic Update
export const useBookmarkMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, string, { previousPost: Post | undefined }>({
    mutationFn: (postId: string) => postBookmark(postId),
    //mutation이 시작되기 직전 호출
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["categoryPost"] }); //진행 중인 쿼리 중단 (다른 요청에 의한 변경 방지)
      const previousPost = queryClient.getQueryData<Post>(["categoryPost"]); //현재 해당 쿼리키에 캐싱된 데이터 (실패 시 롤백하기 위함)

      if (previousPost) {
        const isBookmarked = previousPost.bookMarked
          .map((user) => user.userId)
          .includes(userId);

        // optimistic update를 수행, 쿼리 데이터를 수정된 값으로 임시 업데이트
        queryClient.setQueryData<Post>(["categoryPost"], {
          ...previousPost,
          bookMarked: isBookmarked
            ? previousPost.bookMarked.filter((user) => user.userId !== userId)
            : [...previousPost.bookMarked, { userId }],
        });
      }

      //업데이트 이전 값이 담긴 context 객체 리턴
      return { previousPost };
    },
    // mutation 실패했을 때 호출
    onError: (error, data, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(["categoryPost"], context.previousPost);
      }
    },
    // 성공 여부와 상관없이 mutation이 끝난 뒤 호출
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryPost"] }); //쿼리 무효화 => 최신 데이터를 다시 받아옴
    },
  });
};
