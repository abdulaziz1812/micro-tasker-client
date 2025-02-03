import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://micro-tasker-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
