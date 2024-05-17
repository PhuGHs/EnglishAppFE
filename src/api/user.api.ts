import http from '@root/utils/axiosConfig';
import { ApiResponse } from '@type/T-type';

export class UserApi {
    static async getUserProfile(userId: number) : Promise<ApiResponse> {
        try {
            const response = await http.get(`/users/${userId}/get-user-profile`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
