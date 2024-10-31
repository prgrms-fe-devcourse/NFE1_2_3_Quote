import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../apis/postDetailApi";
import { useNavigate } from "react-router-dom";

const useDeletePost = (
  setDeleteSuccessMsg: (value: boolean) => void,
  form: string,
) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      setDeleteSuccessMsg(true);
      setTimeout(() => {
        if (form === "myPage") {
          navigate("/mypage");
        } else {
          navigate("/");
        }
      }, 2000);
    },
    onError(error) {
      console.log(error);
    },
  });
  return { mutate };
};

export default useDeletePost;
