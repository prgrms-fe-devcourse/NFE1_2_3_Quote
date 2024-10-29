import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../apis/postDetailApi";

const useGetLoggedInUser = () => {
  const { data: loggedInUser } = useQuery({
    queryKey: ["LoggedInUser"],
    queryFn: getLoggedInUser,
  });
  return { loggedInUser };
};

export default useGetLoggedInUser;
