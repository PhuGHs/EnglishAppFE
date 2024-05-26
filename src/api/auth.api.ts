import http from '@root/utils/axiosConfig';
import { AuthResponse, LoginDto, RegisterDto } from '@type/T-type';

export class AuthApi {
    static async register(registerDto: RegisterDto) {
        try {
            const response = await http.post('/auth/register', registerDto);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async login(loginDto: LoginDto) {
        try {
            const response = await http.post('/auth/login', loginDto);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async sendVerificationEmail(email: string) {
        try {
            const response = await http.put(`/auth/forgot-password?email=${email}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async verifyCode({ email, code }) {
        try {
            const response = await http.put('/auth/verify-code', { email, code });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async resetPasswordForgot(loginDto: LoginDto) {
        try {
            const response = await http.put('/auth/reset-password-forgot', loginDto);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
