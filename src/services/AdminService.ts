import {
	GET_ALL_VOTERS,
	GET_ALL_REQUESTS,
	APPROVE_CANDIDATE,
	SEND_INVITE,
	CREATE_ELECTION,
	EDIT_ELECTION
} from "../utils/consts";
import AxiosInstance from "./axiosInstance";

export const getAllVoters = async () => {
	const response = await AxiosInstance.get(GET_ALL_VOTERS);
	return response.data;
};

export const getAllRequests = async () => {
	const response = await AxiosInstance.get(GET_ALL_REQUESTS);
	return response.data;
};

export const approveCandidate = async (id: string) => {
	const response = await AxiosInstance.post(APPROVE_CANDIDATE, {
		id,
	});
	return response.data;
};

export const sendInvite = async (data: any) => {
	const { constituency, cnic } = data;
	const response = await AxiosInstance.post(SEND_INVITE, {
		constituency,
		cnic,
	});
	return response.data;
};

export const startElection = async (data:any) => {
	const response = await AxiosInstance.post(CREATE_ELECTION, data);
	return response.data;
}

export const editElection = async (data:any) => {
	const response = await AxiosInstance.put(EDIT_ELECTION, data);
	return response.data;
}
