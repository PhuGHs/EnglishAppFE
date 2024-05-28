import http from '@root/utils/axiosConfig';
import {
    ApiResponse,
    ShortStoryDto,
    TSearch,
    TShortStoryPost,
    TUserNecessary,
    TUserProfile,
} from '@type/T-type';

export class ShortStoryApi {
    static async create(data: TShortStoryPost): Promise<ApiResponse<ShortStoryDto>> {
        try {
            const response = await http.post('/short-stories/create-new-short-story', data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async update(id: number, data: TShortStoryPost): Promise<ApiResponse<ShortStoryDto>> {
        try {
            const response = await http.put(`/short-stories/${id}/update-short-story`, data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async delete(id: number): Promise<ApiResponse<unknown>> {
        try {
            const response = await http.delete(`/short-stories/${id}/delete`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async get(
        pageNumber: number,
        pageSize: number,
        sortBy = 'id' || 'createdDate'
    ): Promise<ApiResponse<ShortStoryDto[]>> {
        try {
            const response = await http.get('/short-stories', {
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

    static async getOne(id: number): Promise<ApiResponse<ShortStoryDto>> {
        try {
            const response = await http.get(`/short-stories/${id}/get`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getRandom5(shortStoryId: number): Promise<ApiResponse<ShortStoryDto[]>> {
        try {
            const response = await http.get(`/short-stories/get-random-5/${shortStoryId}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
