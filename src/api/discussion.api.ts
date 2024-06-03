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
    static async getTop5(): Promise<ApiResponse<TDiscussionDto[]>> {
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

    static async filterDiscussions(pageSize: number, pageNumber: number, options: string[], searchTerms?: string): Promise<ApiResponse<TDiscussionDto[]>> {
        let obj;
        if (searchTerms) {
            obj = {
                searchTerms: searchTerms,
                pageNumber: pageNumber,
                pageSize: pageSize,
                options: options
            };
        } else {
            obj = {
                pageNumber: pageNumber,
                pageSize: pageSize,
                options: options
            };
        }
        try {
            const response = await http.get('/discussions/filter-discussions', {
                params: obj,
                paramsSerializer: params => {
                    const keys = Object.keys(params).reduce((result, key) => {
                        if (Array.isArray(params[key])) {
                            params[key].forEach((val: string) => {
                                result.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
                            });
                        } else {
                            result.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
                        }
                        return result;
                    }, [] as string[]);
                    return keys.join('&');
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
