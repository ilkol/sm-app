import { makeRequest } from "../axios";

export interface ChatInfo
{
	uid: string;
	status: boolean;
	title: string;
	avatar: string;
	messages: number;
	membersCount: number;
	bannedUsersCount: number;
}

export const getInfo = async (id: string): Promise<ChatInfo> => {
    const res = await makeRequest('get', `/chat/${id}/getInfo?type=uid`);
	if(res.error) {
		throw new Error(res.error);
	}
    return res;
};