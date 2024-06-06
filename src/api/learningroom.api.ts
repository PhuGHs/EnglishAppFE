import http from '@root/utils/axiosConfig';
import {
    ApiResponse,
    TJoinLearningRoom,
    TLearningRoomDto,
    TLearningRoomMessage,
    TLearningRoomMessagePostDto,
    TLearningRoomPostInstant,
    TLearningRoomPostLater,
    TParticipantDto,
    TPromoteToOwner,
} from '@type/T-type';

export class LearningRoomApi {
    static async getLearningRooms(isLive: boolean): Promise<ApiResponse<TLearningRoomDto[]>> {
        try {
            const response = await http.get('/learning-rooms', {
                params: {
                    isLive: isLive,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getSuggestRooms(currentUserId: number): Promise<ApiResponse<TLearningRoomDto[]>> {
        try {
            const response = await http.get('/learning-rooms/suggest-rooms', {
                params: {
                    currentUserId: currentUserId,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getPassword(roomId: number): Promise<ApiResponse<string>> {
        try {
            const response = await http.get(`/learning-rooms/${roomId}/get-password`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async create(
        body: TLearningRoomPostInstant | TLearningRoomPostLater,
        is_instant: boolean
    ): Promise<ApiResponse<TLearningRoomDto>> {
        try {
            let path = '';
            if (is_instant) {
                path = '/learning-rooms/create-instantly';
            } else {
                path = '/learning-rooms/schedule-for-the-room';
            }
            const response = await http.post(path, body);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async join(body: TJoinLearningRoom): Promise<ApiResponse<TLearningRoomDto>> {
        try {
            const response = await http.post('/learning-rooms/join', body);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async sendMessage(body: TLearningRoomMessagePostDto): Promise<ApiResponse<TLearningRoomMessage>> {
        try {
            const response = await http.post('/learning-rooms/send-messages', body);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async kick(participantId: number): Promise<ApiResponse<string>> {
        try {
            const response = await http.delete(`/learning-rooms/participants/${participantId}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async promoteToOwner(body: TPromoteToOwner): Promise<ApiResponse<TParticipantDto>> {
        try {
            const response = await http.put('/learning-rooms/promote-to-owner', body);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getParticipants(
        roomId: number,
        isSpeaker: boolean
    ): Promise<ApiResponse<TLearningRoomDto>> {
        try {
            const response = await http.get(`/learning-rooms/${roomId}/participants`, {
                params: {
                    isSpeaker: isSpeaker,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async endRoom(
        roomId: number,
        isSpeaker: boolean
    ): Promise<ApiResponse<TLearningRoomDto>> {
        try {
            const response = await http.get(`/learning-rooms/${roomId}/participants`, {
                params: {
                    isSpeaker: isSpeaker,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async leaveRoom(roomId: number, participantId: number): Promise<ApiResponse<string>> {
        try {
            const response = await http.put('/learning-rooms/leave-room', {
                room_id: roomId,
                participant_id: participantId,
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async toggleSpeaker(participantId: number): Promise<ApiResponse<TParticipantDto>> {
        try {
            const response = await http.put('/learning-rooms/toggle-speaker', {
                participant_id: participantId,
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getMessages(roomId: number): Promise<ApiResponse<TLearningRoomMessage[]>> {
        try {
            const response = await http.get(`/learning-rooms/${roomId}/get-messages`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
