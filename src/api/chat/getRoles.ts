import { makeRequest } from "../axios";

export interface Role
{
	name: string;
	level: number;
	emoji: string;
}

export const getRoles = async (id: string): Promise<Role[]> => {
    const res = await makeRequest('get', `/chat/${id}/getRoles?type=uid`);
	if(res.error) {
		if(res.error.error === 917) {
			throw new Error("Менеджер не имеет доступа к этому чату.");
		}
		throw new Error(res.error);
	}
    return res;
};