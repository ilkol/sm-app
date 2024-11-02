import { makeRequest } from "../axios";

export interface ChatSettings
{
	uid: string;
	toggleFeed: boolean;
	kickMenu: boolean;
	leaveMenu: boolean;
	hideUsers: boolean;
	nameType: boolean;
	unPunishNotify: boolean;
	unRoleAfterKick: boolean;
	autounban: boolean;
	roleLevelStats: boolean;
}

export const getSettings = async (id: string): Promise<ChatSettings> => {
    const res = await makeRequest('get', `/chat/${id}/getSettings?type=uid`);
	if(res.error) {
		throw new Error(res.error);
	}
    return res;
};