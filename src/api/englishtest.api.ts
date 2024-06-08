import http from '@root/utils/axiosConfig';
import { ApiResponse, TQuestionDto, TSubmitTestDto, TUserNec, TUserNecessary, TUserTestDto } from '@type/T-type';

export class EnglishTestApi {
    static async getUserTests(userId: number, levelId: number): Promise<ApiResponse<TUserTestDto[]>> {
        try {
            const response = await http.get('/english-tests/get-user-tests', {
                params: {
                    userId: userId,
                    levelId: levelId
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async getQuestions(testId: number): Promise<ApiResponse<TQuestionDto[]>> {
        try {
            const response = await http.get(`/english-tests/${testId}/get-questions`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async takeTest(body: TSubmitTestDto): Promise<ApiResponse<TUserNec>> {
        try {
            const response = await http.post('/english-tests/submit-test', body);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};