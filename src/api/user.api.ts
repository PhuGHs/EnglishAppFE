import http from '@root/utils/axiosConfig';
import { ApiResponse, TSearch, TUserNecessary, TUserProfile } from '@type/T-type';

export class UserApi {
    static async getUserProfile(userId: number): Promise<ApiResponse<TUserProfile>> {
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
    ): Promise<ApiResponse<TUserNecessary>> {
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

    static async recommendBasedOnLevel(
        userId: number,
        pageNumber: number,
        pageSize: number
    ): Promise<ApiResponse<TSearch[]>> {
        try {
            const response = await http.get(
                `/users/${userId}/recommend-user-based-on-englishLevel`,
                {
                    params: {
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async recommendBasedOnCommonInterests(
        userId: number,
        pageNumber: number,
        pageSize: number
    ): Promise<ApiResponse<TSearch[]>> {
        try {
            const response = await http.get(
                `/users/${userId}/recommend-user-based-on-common-interests`,
                {
                    params: {
                        page: pageNumber,
                        size: pageSize,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
