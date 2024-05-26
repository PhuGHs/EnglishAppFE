import http from '@root/utils/axiosConfig';
import { ApiResponse } from '@type/T-type';

export class MissionApi {
    static async getAll(userId: number): Promise<ApiResponse> {
        try {
            const response = await http.get(`/notifications/${userId}/get-all`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getUnread(userId: number): Promise<ApiResponse> {
        try {
            const response = await http.get(`/notifications/${userId}/get-unread`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async markAllAsRead(userId: number): Promise<ApiResponse> {
        try {
            const response = await http.get(`/notifications/${userId}/mark-all-as-read`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
