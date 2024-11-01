import { useMutation } from "@tanstack/react-query";
import { modifyPost } from "../apis/postModifyApi";
import { useNavigate } from "react-router-dom";

const useModifyPost = (postId: string, from: string) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: modifyPost,
    onSuccess: () => {
      navigate(`/post/${postId}`, { state: { from: from } });
    },
    onError(error) {
      console.log(error);
    },
  });
  return { mutate };
};

export default useModifyPost;
