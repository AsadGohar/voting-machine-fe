import axios from "axios";

const endpoint = import.meta.env.VITE_APP_DEV_BASE_URL;

const AxiosInstance = axios.create({
  baseURL: endpoint,
});

AxiosInstance.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;

export default AxiosInstance