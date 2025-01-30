import axios from "axios";

const axiosSecure = axios.create({
<<<<<<< HEAD
    baseURL: 'http://localhost:5000/'
=======
    baseURL: 'http://localhost:5000'
>>>>>>> b0f9f31 (add new task added)
})

const useAxiosSecure = () =>{
    return axiosSecure
}

export default useAxiosSecure