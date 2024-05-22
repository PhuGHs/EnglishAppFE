import http from '@root/utils/axiosConfig';
import { ApiResponse, TPostMessage } from '@type/T-type';

export class ChatApi {
    static async getConversations(userId: number): Promise<ApiResponse> {
        try {
            const response = await http.get(`/chat/${userId}/rooms`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getMessages(roomId: number): Promise<ApiResponse> {
        try {
            const response = await http.get(`/chat/rooms/${roomId}/messages`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async sendMessage(body: TPostMessage): Promise<ApiResponse> {
        try {
            const response = await http.post('/chat/send-message', body);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async markAsRead(messageId: number): Promise<ApiResponse> {
        try {
            const response = await http.put(`/chat/rooms/messages/${messageId}/mark-as-read`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
