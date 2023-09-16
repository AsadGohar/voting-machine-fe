import {
	SIGNUP,
	LOGIN,
	GET_ALL_CANDIDATES_BY_USER,
	UPLOAD_USER_PROFILE_PIC,
} from "../utils/consts";
import AxiosInstance from "./axiosInstance";
import { AxiosError } from "axios";
import { ILogin, ISignup } from "../utils/interfaces";

export const signup = async (data: ISignup) => {
	const response = await AxiosInstance.post(SIGNUP, data);
	if (response instanceof AxiosError) {
		localStorage.setItem("user", JSON.stringify(response.data.user));
		return response.response?.data;
	}
	return response.data;
};

export const login = async (data: ILogin) => {
	try {
		const response = await AxiosInstance.post(LOGIN, data);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const getCandidatesByUserId = async (id: string) => {
	const response = await AxiosInstance.get(`${GET_ALL_CANDIDATES_BY_USER}/${id}`);
	return response.data;
};

export const uploadProfilePic = async (picture: any, id: string) => {
	const response = await AxiosInstance.post(UPLOAD_USER_PROFILE_PIC, {
		picture,
		id,
	});
	return response.data;
};
