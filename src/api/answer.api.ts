import http from '@root/utils/axiosConfig';
import { ApiResponse, TAnswer, TAnswerPost, TPagination } from '@type/T-type';

export class AnswerApi {
    static async getAnswers(discussionId: number, pageNumber: number, pageSize: number, sortBy: string): Promise<TPagination<TAnswer[]>> {
        try {
            const response = await http.get(`/answers/${discussionId}/get-by-discussion`, {
                params: {
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    sortBy: sortBy
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async create(body: TAnswerPost): Promise<ApiResponse<TAnswer>> {
        try {
            const response = await http.post('/answers/create', body);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async delete(answerId: number): Promise<ApiResponse<unknown>> {
        try {
            const response = await http.delete(`/answers/${answerId}/delete`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}