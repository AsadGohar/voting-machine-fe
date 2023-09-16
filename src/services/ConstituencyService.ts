import { GET_ALL_CONSTITUENCIES, CREATE_CONSTITUENCIES } from "../utils/consts";
import AxiosInstance from "./axiosInstance";

export const getAll = async () => {
	const response = await AxiosInstance.get(GET_ALL_CONSTITUENCIES);
	return response.data;
};

export const create = async (data: any) => {
	const response = await AxiosInstance.post(CREATE_CONSTITUENCIES, data);
	return response.data;
};
