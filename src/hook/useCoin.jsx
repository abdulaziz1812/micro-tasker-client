import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"

const useCoin = (email) => {
    const axiosSecure = useAxiosSecure();
    const { data: user = {}, isLoading, error, refetch } = useQuery({
      queryKey: ['coin', email],
      queryFn: async () => {
        if (!email) return {}; 
        const res = await axiosSecure.get(`/user/${email}`);
        return res.data; 
      },
      enabled: !!email, 
    });
  
    return { user, isLoading, error, refetch };
  };
  
export default useCoin