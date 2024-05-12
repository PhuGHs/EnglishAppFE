import http from '@root/utils/axiosConfig';

export class ChatApi {
    static async getConversations(userId: number) {
        try {
            const response = await http.get(`/conversations/get-user-conversations/${userId}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getMessages(roomId: number) {
        try {
            const response = await http.get(`/conversations/${roomId}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
