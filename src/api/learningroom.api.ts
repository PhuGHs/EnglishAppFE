import http from '@root/utils/axiosConfig';

export class LearningRoomApi {
    static async getLearningRooms(isLive: boolean) {
        try {
            const response = await http.get(`/conversations/get-user-conversations/${isLive}`);
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