import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useBuyer = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: isBuyer, isLoading: isBuyerLoading } = useQuery(
    {
      queryKey: [user?.email, "isBuyer"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/buyer/${user?.email}`);
        console.log(res.data);
        return res.data?.buyer;
      },
    }
  );

  return [isBuyer, isBuyerLoading];
};

export default useBuyer;
