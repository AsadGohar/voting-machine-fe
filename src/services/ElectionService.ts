import { AxiosError } from "axios";
import { GET_ACTIVE_ELECTION } from "../utils/consts";
import AxiosInstance from "./axiosInstance";

export const getActiveElection = async () => {
  const response = await AxiosInstance.get(GET_ACTIVE_ELECTION);
  if(response instanceof AxiosError){
    return response.response?.data;
  }
	return response.data;
}