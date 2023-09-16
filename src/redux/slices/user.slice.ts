import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as UserService from "../../services/UserService";
import { IUser } from "../../utils/type";
import { Draft } from "immer";

const initialState: {
	data: Draft<IUser> | null;
	status: string;
	isLoading: boolean;
	accessToken: string | null;
} = {
	data: JSON.parse(localStorage.getItem("user") || "{}") as Draft<IUser> | null,
	status: "",
	isLoading: false,
	accessToken: null,
};

export const login = createAsyncThunk("user/login", async (data: any) => {
	const response = await UserService.login(data);
	return response;
});

export const signup = createAsyncThunk("user/signup", async (data: any) => {
	try {
		const response = await UserService.signup(data);
		return response;
	} catch (error: any) {
		if (error.response) {
			return error.response.data;
		} else {
			return error.response.data;
		}
	}
});

export const upload = createAsyncThunk("user/upload", async (data: any) => {
	try {
		const response = await UserService.uploadProfilePic(data.picture, data.id);
		return response;
	} catch (error: any) {
		if (error.response) {
			return error.response.data;
		} else {
			return error.response.data;
		}
	}
});

export const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem("user");
			localStorage.removeItem("accessToken");
			state.status = "";
			state.data = null;
			state.isLoading = false;
			state.accessToken= null
		},
	},
	extraReducers: {
		[login.pending.type]: (state) => {
			state.isLoading = true;
		},
		[login.fulfilled.type]: (state, { payload }) => {
			localStorage.setItem("accessToken", payload.accessToken)
			state.status = "success";
			state.data = payload.user;
			state.accessToken = payload.accessToken
			state.isLoading = false;
		},
		[login.rejected.type]: (state) => {
			state.status = "failed";
			state.isLoading = false;
		},
		[signup.pending.type]: (state) => {
			state.isLoading = true;
		},
		[signup.fulfilled.type]: (state, { payload }) => {
			state.status = "success";
			localStorage.setItem("accessToken", payload.accessToken)
			state.data = payload.user;
			state.accessToken = payload.accessToken;
			state.isLoading = false;
		},
		[signup.rejected.type]: (state) => {
			state.status = "failed";
			state.isLoading = false;
		},
		[upload.pending.type]: (state) => {
			state.isLoading = true;
		},
		[upload.fulfilled.type]: (state, { payload }) => {
			state.status = "success";
			state.data = payload.user;
			state.isLoading = false;
		},
		[upload.rejected.type]: (state) => {
			state.status = "failed";
			state.isLoading = false;
		},
	},
});

export const { logout } = userSlice.actions;
