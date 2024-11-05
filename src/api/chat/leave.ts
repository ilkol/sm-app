import { makeRequest } from "../axios";
import { APIError } from "../APIError";
import { AxiosError } from "axios";

export const leave = async (chat: string, user: number): Promise<true|APIError> => {
	try {
		const res = await makeRequest('post', `/chat/${chat}/leave`, {
			type: 'uid',
			user: user
		});
		return res;
	} catch(e) {
		console.error(e);
		if(e instanceof AxiosError) {
			return e.response?.data;
		} else {
			throw e;
		}
	}
};