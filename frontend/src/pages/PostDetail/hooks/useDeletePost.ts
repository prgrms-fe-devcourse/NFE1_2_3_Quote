import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../apis/postDetailApi";
import { useNavigate } from "react-router-dom";

const useDeletePost = (form: string) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      localStorage.setItem("deleteSuccess", "true");
      if (form === "myPage") {
        navigate("/mypage");
      } else {
        navigate("/");
      }
    },
    onError(error) {
      console.log(error);
    },
  });
  return { mutate };
};

export default useDeletePost;
