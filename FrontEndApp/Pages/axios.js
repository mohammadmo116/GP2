import axios from "axios";

let api = () => {
  const api = axios.create({
    //baseURL: "http://192.168.1.8:8000/api",
    baseURL: "http://192.168.43.86:8000/api",
    withCredentials: true,
  });

  return api;
};
export default api;