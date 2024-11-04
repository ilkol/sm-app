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

	si_messages: boolean;
	si_smilies: boolean;
	si_stickers: boolean;
	si_reply: boolean;
	si_photo: boolean;
	si_video: boolean;
	si_files: boolean;
	si_audio: boolean;
	si_reposts: boolean;
	si_mats: boolean;
}

export const getSettings = async (id: string): Promise<ChatSettings> => {
    const res = await makeRequest('get', `/chat/${id}/getSettings?type=uid`);
	if(res.error) {
		throw new Error(res.error);
	}
    return res;
};