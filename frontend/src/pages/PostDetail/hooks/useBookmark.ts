import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookMarked } from "../apis/postDetailApi";

const useBookmark = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: bookMarked,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postInfo"] });
    },
    onError(error) {
      console.log(error);
    },
  });
  return { mutate };
};

export default useBookmark;
