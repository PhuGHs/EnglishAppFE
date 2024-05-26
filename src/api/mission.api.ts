import http from '@root/utils/axiosConfig';
import { ApiResponse } from '@type/T-type';

export class MissionApi {
    static async getUserMissions(userId: number): Promise<ApiResponse> {
        try {
            const response = await http.get(`/missions/${userId}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getPercentage(userId: number): Promise<ApiResponse> {
        try {
            const response = await http.get(`/missions/${userId}/get-percentage`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async doMission(mission_id: number, user_id: number): Promise<ApiResponse> {
        try {
            const response = await http.put('/missions/do-missions', { mission_id, user_id });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
