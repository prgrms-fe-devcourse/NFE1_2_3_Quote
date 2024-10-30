import { useMutation } from "@tanstack/react-query";
import { createPost } from "../apis/api";
import { useNavigate } from "react-router-dom";

export const useCreatePost = (setShowSuccessMsg: (value: boolean) => void) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setShowSuccessMsg(true);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    },
    onError(error) {
      console.log(error);
    },
  });
  return { mutate };
};

export default useCreatePost;
