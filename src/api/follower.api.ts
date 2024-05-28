import http from '@root/utils/axiosConfig';
import { ApiResponse, TPostMessage, TReview, TReviewPostDto } from '@type/T-type';

export class FollowerApi {
    static async follow(
        currentUserId: number,
        userIdToFollow: number
    ): Promise<ApiResponse<unknown>> {
        try {
            const response = await http.post(
                `/followers/${currentUserId}/follow/${userIdToFollow}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async unfollow(
        currentUserId: number,
        userIdToUnFollow: number
    ): Promise<ApiResponse<unknown>> {
        try {
            const response = await http.delete(
                `/followers/${currentUserId}/unfollow/${userIdToUnFollow}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getFollowing(
        currentUserId: number,
        pageNumber: number,
        pageSize: number,
        sortBy: string
    ) {
        try {
            const response = await http.get(`/followers/${currentUserId}/get-following`, {
                params: {
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    sortBy: sortBy,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getFollowers(
        currentUserId: number,
        pageNumber: number,
        pageSize: number,
        sortBy: string
    ) {
        try {
            const response = await http.get(`/followers/${currentUserId}/get-followers`, {
                params: {
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    sortBy: sortBy,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getReviews(userId: number): Promise<ApiResponse<TReview[]>> {
        try {
            const response = await http.get(`/reviews/${userId}/get`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async addReview(data: TReviewPostDto): Promise<ApiResponse<TReview>> {
        try {
            const response = await http.post('/reviews/add-review', data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async checkIfExist(
        currentUserId: number,
        followedId: number
    ): Promise<ApiResponse<unknown>> {
        try {
            const response = await http.get(
                `/followers/${currentUserId}/${followedId}/check-if-exist`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
