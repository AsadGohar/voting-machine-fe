import {
	ACCEPT_INVITE,
  GET_INVITES
} from "../utils/consts";
import AxiosInstance from "./axiosInstance";

export const accept = async (id:string) => {
  try {
    const response = await AxiosInstance.post(ACCEPT_INVITE,{
      id
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getInvites = async (id:string) => {
  try {
    const response = await AxiosInstance.post(GET_INVITES,{
      id
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
