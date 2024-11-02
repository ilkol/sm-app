import { makeRequest } from "../axios";

export interface ChatUserStatistics
{
	id: number;
	role: number;
	avatar?: string;
	name: string;
	roleName: string;
	nick: string|null;
	mute: number;
	warns: number;
	togglenotify: boolean;
	immunity: number;
	immunityRole: string;
	join_date: number;
	
	messages: number;
	smilies: number;
	stickers: number;
	reply: number;
	reposts: number;
	audio: number;
	photo: number;
	video: number;
	files: number;
	mats: number;
}

export const getMemberStats = async (chat: string, user: number): Promise<ChatUserStatistics> => {
    const res = await makeRequest('get', `/chat/${chat}/user/${user}/getStats?type=uid`);
	if(res.error) {
		if(res.error.error === 917) {
			throw new Error("Менеджер не имеет доступа к этому чату.");
		}
		throw new Error(res.error);
	}
    return res;
};