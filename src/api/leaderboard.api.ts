import http from '@root/utils/axiosConfig';
import { ApiResponse, TLeaderboardDto, TUserNecessary } from '@type/T-type';

export class LeaderboardApi {
    static async getYear(startRank: number, endRank): Promise<ApiResponse<TLeaderboardDto[]>> {
        try {
            const response = await http.get('/leaderboard/year', {
                params: {
                    startRank: startRank,
                    endRank: endRank,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async getMonth(startRank: number, endRank): Promise<ApiResponse<TLeaderboardDto[]>> {
        try {
            const response = await http.get('/leaderboard/month', {
                params: {
                    startRank: startRank,
                    endRank: endRank,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async getWeek(startRank: number, endRank): Promise<ApiResponse<TLeaderboardDto[]>> {
        try {
            const response = await http.get('/leaderboard/week', {
                params: {
                    startRank: startRank,
                    endRank: endRank,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
