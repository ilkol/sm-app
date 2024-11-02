import { makeRequest } from "../axios";

export interface BannedUser
{
	id: number;
	avatar?: string;
	name: string;
	
	admin: number;
	unban: number;
	bantime: number;
	reason: string|null;
}

export const getBannedUsers = async (id: string): Promise<BannedUser[]> => {
    const res = await makeRequest('get', `/chat/${id}/getBannedUsers?type=uid`);
	if(res.error) {
		if(res.error.error === 917) {
			throw new Error("Менеджер не имеет доступа к этому чату.");
		}
		throw new Error(res.error);
	}
    return res;
};