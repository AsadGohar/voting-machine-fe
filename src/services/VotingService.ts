import { AxiosError } from "axios";
import { CAST_VOTE, GET_RESULT_BY_CONSTITUENCY, GET_ALL_RESULTS, GET_RESULT_BY_CONSTITUENCY_NAME } from "../utils/consts";
import AxiosInstance from "./axiosInstance";

export const castVote = async (data:any) => {
  const response = await AxiosInstance.post(CAST_VOTE, data);
  if(response instanceof AxiosError){
    return response.response?.data;
  }
	return response.data;
}

export const getResultsByConstituency = async (data:any) => {
  const response = await AxiosInstance.post(GET_RESULT_BY_CONSTITUENCY, data);
	return response.data;
}

export const getResultsByConstituencyName = async (data:any) => {
  const response = await AxiosInstance.post(GET_RESULT_BY_CONSTITUENCY_NAME, data);
	return response.data;
}

export const getAllResults= async () => {
  const response = await AxiosInstance.get(GET_ALL_RESULTS);
	return response.data;
}


