import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../apis/userApi";
import { UserMe } from "@/types/Types";

export const useGetUserData = async () => {
  const { data, isLoading, isError } = useQuery<UserMe>({
    queryKey: ["user"],
    queryFn: () => getUserData(),
  });

  return { data, isLoading, isError };
};
