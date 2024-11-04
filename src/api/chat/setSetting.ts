import { makeRequest } from "../axios";
import { APIError } from "../APIError";
import { AxiosError } from "axios";

export type ChatSettingsField = 
	'togglefeed' | 
	'kickmenu' |
	'leavemenu' |
	'hideusers' |
	'nameType' |
	'unPunishNotify' |
	'unRoleAfterKick' |
	'autounban' |
	'roleLevelStats' |
	'muteType' |
	'si_messages' |
	'si_smilies' |
	'si_stickers' |
	'si_reply' |
	'si_photo' |
	'si_video' |
	'si_files' |
	'si_audio' |
	'si_reposts' |
	'si_mats'
;

export const setSetting = async (chat: string, user: number, setting: ChatSettingsField, value: boolean): Promise<true|APIError> => {
	try {
		const res = await makeRequest('post', `/chat/${chat}/setSetting`, {
			type: 'uid',
			setting,
			value,
			user_id: user
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