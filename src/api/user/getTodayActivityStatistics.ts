import { makeRequest } from "../axios";

export interface TodayActivityStatistics
{
	messages: number;
}

export const getTodayActivityStatistics = async (id: number): Promise<TodayActivityStatistics> => {
    const res = await makeRequest('get', `/user/${id}/getTodayActivityStatistics`);
	// console.log(res);
    return res;
};