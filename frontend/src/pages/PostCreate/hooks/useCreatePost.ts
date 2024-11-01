import { useMutation } from "@tanstack/react-query";
import { createPost } from "../apis/api";
import { useNavigate } from "react-router-dom";

export const useCreatePost = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      localStorage.setItem("postSuccessMessage", "글 작성이 완료되었습니다.");
        navigate(-1);
    },
    onError(error) {
      console.log(error);
    },
  });
  return { mutate };
};

export default useCreatePost;
