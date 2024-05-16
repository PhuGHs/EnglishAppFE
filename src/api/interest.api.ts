import http from '@root/utils/axiosConfig';
import { ApiResponse, AuthResponse, TInterestPutDto } from '@type/T-type';

export class InterestApi {
    static async getInterests() {
        try {
            const response = await http.get('/interests/');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getUserInterests(userId: number) {
        try {
            const response = await http.get(`/interests/${userId}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async selectInterests(interestPutDto: TInterestPutDto): Promise<ApiResponse> {
        try {
            const response = await http.post('interests/select-interests', interestPutDto);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
