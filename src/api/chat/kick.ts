import { makeRequest } from "../axios";
import { APIError } from "../APIError";
import { AxiosError } from "axios";

export const kick = async (chat: string, user: number, punisher: number, reason?: string): Promise<true|APIError> => {
	try {
		const res = await makeRequest('post', `/chat/${chat}/kick`, {
			type: 'uid',
			user: user,
			punisher,
			reason: reason === '' ? undefined : reason
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