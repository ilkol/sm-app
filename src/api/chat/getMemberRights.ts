import { makeRequest } from "../axios";

export interface ChatUserRights
{
	user_id: number;
	chat_id: number;

	help: boolean;
	banlist: boolean;
	roles: boolean;
	settings: boolean;
	selfstats: boolean;
	getstats: boolean;
}

export const getMemberRights = async (chat: string, user: number): Promise<ChatUserRights> => {
    const res = await makeRequest('get', `/chat/${chat}/user/${user}/getRights?type=uid`);
	if(res.error) {
		throw new Error(res.error);
	}
    return res;
};