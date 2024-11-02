import { makeRequest } from "../axios";

export interface ChatMember
{
	id: number;
	role: number;
	avatar?: string;
	name: string;
	roleName: string;
	nick: string|null;
}

export const getMembers = async (id: string): Promise<ChatMember[]> => {
    const res = await makeRequest('get', `/chat/${id}/getMembers?type=uid`);
	if(res.error) {
		if(res.error.error === 917) {
			throw new Error("Менеджер не имеет доступа к этому чату.");
		}
		throw new Error(res.error);
	}
    return res;
};