import { useMutation } from "@tanstack/react-query";
import { modifyPost } from "../apis/postModifyApi";
import { useNavigate } from "react-router-dom";

const useModifyPost = (
  setShowSuccessMsg: (value: boolean) => void,
  postId: string,
  from: string,
) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: modifyPost,
    onSuccess: () => {
      setShowSuccessMsg(true);
      setTimeout(() => {
        navigate(`/post/${postId}`, { state: { from: from } });
      }, 2000);
    },
    onError(error) {
      console.log(error);
    },
  });
  return { mutate };
};

export default useModifyPost;
