import axios, { AxiosError, AxiosInstance } from 'axios';
import { getData, storeData } from './asyncStorage';
import { useToast } from '@root/context/toast-context';

export const BASE_ENDPOINT = 'http://10.0.2.2:8080/api/v1';
const URL_LOGIN = '/auth/login';

class Http {
    private accessToken: string;
    public instance: AxiosInstance;

    constructor() {
        this.accessToken = '';
        this.instance = axios.create({
            baseURL: BASE_ENDPOINT,
            timeout: 15000,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        (async () => {
            try {
                this.accessToken = await getData({ item: 'token' });
                this.instance.defaults.headers.common['Authorization'] = this.accessToken;
            } catch (error) {
                console.log(error);
            }

            this.instance.interceptors.request.use(
                (config) => {
                    if (this.accessToken && config.headers) {
                        config.headers.Authorization = this.accessToken;
                    }
                    return config;
                },
                (error: AxiosError) => {
                    return Promise.reject(error);
                }
            );

            this.instance.interceptors.response.use(
                (response) => {
                    const { url } = response.config;
                    if (url === URL_LOGIN) {
                        const { data } = response.data;
                        const { accessToken, account } = data;
                        this.accessToken = 'Bearer ' + accessToken;
                        this.instance.defaults.headers.common['Authorization'] = this.accessToken;
                        storeData({ value: account, item: 'user' });
                        storeData({ value: this.accessToken, item: 'token' });
                    }
                    return response;
                },
                (error: AxiosError) => {
                    return Promise.reject(error);
                }
            );
        })();
    }
}

const http = new Http().instance;

export default http;
