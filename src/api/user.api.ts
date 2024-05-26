import http from '@root/utils/axiosConfig';
import { ApiResponse, TSearch } from '@type/T-type';

export class UserApi {
    static async getUserProfile(userId: number): Promise<ApiResponse> {
        try {
            const response = await http.get(`/users/${userId}/get-user-profile`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async searchUsers(fullName: string, userId: number): Promise<TSearch[]> {
        try {
            const response = await http.get('/users/find-by-fullName', {
                params: { fullName: fullName, currentUserId: userId },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async changeInfo(
        userId: number,
        profile_picture: string,
        full_name: string
    ): Promise<ApiResponse> {
        try {
            const response = await http.put(`/users/${userId}/change-info`, {
                profile_picture: profile_picture,
                full_name: full_name,
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
