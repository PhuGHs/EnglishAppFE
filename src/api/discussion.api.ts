import http from '@root/utils/axiosConfig';
import { ApiResponse, TPostMessage } from '@type/T-type';

export class DiscussionApi {
    static async getTop5() {
        try {
            const response = await http.get('/discussions/popular-discussions');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getUserDiscussions(userId: number, pageNumber: number, pageSize: number, sortBy: 'id' | 'createdDate'): Promise<ApiResponse> {
        try {
            const response = await http.get(`/discussions/user/${userId}`, {
                params: {
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    sortBy: sortBy
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
