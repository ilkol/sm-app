import { makeRequest } from "../axios";

export interface ActiveChatInfo
{
	id: string;
	title: string;
	count: number;
	avatar?: string;
}

export const getActiveChatsList = async (id: number): Promise<ActiveChatInfo[]> => {
    const res = await makeRequest('get', `/user/${id}/getActiveChatsList`);
    return res;
};