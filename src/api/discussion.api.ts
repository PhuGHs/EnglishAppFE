import http from '@root/utils/axiosConfig';
import {
    ApiResponse,
    TDiscussionDto,
    TDiscussionPost,
    TDiscussionTopicDto,
    TPagination,
    TPostMessage,
} from '@type/T-type';

export class DiscussionApi {
    static async getTop5() {
        try {
            const response = await http.get('/discussions/popular-discussions');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getUserDiscussions(
        userId: number,
        pageNumber: number,
        pageSize: number,
        sortBy: 'id' | 'createdDate'
    ): Promise<TPagination<TDiscussionDto[]>> {
        try {
            const response = await http.get(`/discussions/user/${userId}`, {
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

    static async create(data: TDiscussionPost): Promise<ApiResponse<TDiscussionDto>> {
        try {
            const response = await http.post('/discussions/create-new-discussion', data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async update(id: number, data: TDiscussionPost): Promise<ApiResponse<TDiscussionDto>> {
        try {
            const response = await http.put(`/discussions/${id}/edit-discussion`, data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteDiscussion(discussionId: number): Promise<ApiResponse<string>> {
        try {
            const response = await http.delete(`/discussions/${discussionId}/delete`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getAllTopics(): Promise<ApiResponse<TDiscussionTopicDto[]>> {
        try {
            const response = await http.get('/discussion-topics');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getOne(discussionId: number): Promise<ApiResponse<TDiscussionDto>> {
        try {
            const response = await http.get(`/discussions/${discussionId}/get`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
