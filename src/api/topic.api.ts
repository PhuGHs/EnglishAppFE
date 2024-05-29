import http from '@root/utils/axiosConfig';
import {
    ApiResponse,
    ShortStoryDto,
    TEnglishTopicDto,
    TEnglishTopicPostDto,
    TEnglishTopicQuestionDto,
    TEnglishTopicQuestionPostDto,
    TShortStoryPost,
} from '@type/T-type';

export class TopicApi {
    static async insertNewTopic(
        data: TEnglishTopicPostDto
    ): Promise<ApiResponse<TEnglishTopicDto>> {
        try {
            const response = await http.post('/english-topics/insert-new-topic', data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async insertNewQuestion(
        data: TEnglishTopicQuestionPostDto
    ): Promise<ApiResponse<TEnglishTopicQuestionDto>> {
        try {
            console.log(data);
            const response = await http.post('/english-topics/insert-new-question', data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getAllTopics(levelId: number): Promise<ApiResponse<TEnglishTopicDto[]>> {
        try {
            const response = await http.get(`/english-topics/all-topics-within-level/${levelId}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getAllQuestions(
        topicId: number
    ): Promise<ApiResponse<TEnglishTopicQuestionDto[]>> {
        try {
            const response = await http.get(`/english-topics/${topicId}/all-questions`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
