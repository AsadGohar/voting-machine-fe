import { BECOME_CANDIDATE } from "../utils/consts";
import AxiosInstance from "./axiosInstance";

export const upgrade = async (data:any) => {
	const response = await AxiosInstance.post(BECOME_CANDIDATE, data);
	return response.data;
};
