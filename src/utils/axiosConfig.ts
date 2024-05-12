import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios';

export const BASE_ENDPOINT = 'http://10.0.2.2:8080/api/v1';

class Http {
  private accessToken: string;
  public instance: AxiosInstance;

  constructor() {
    // this.accessToken = getAccessTokenFromLS();

    this.instance = axios.create({
      baseURL: BASE_ENDPOINT,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    this.instance.interceptors.request.use(
      config => {
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
      response => {
        const { url } = response.config;
        // if (url === URL_LOGIN) {
        //   const data = response.data as AuthResponse;
        //   setProfileToLS(data.user);
        //   setAccessTokenToLS(data.token);
        // } else if (url === URL_LOGOUT) {
        //   this.accessToken = '';
        //   // this.refreshToken = '';
        //   clearLS();
        // }
        return response;
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        // if (
        //   ![
        //     HttpStatusCode.UnprocessableEntity,
        //     HttpStatusCode.Unauthorized
        //   ].includes(error.response?.status as number)
        // ) {
        //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //   const data: any | undefined = error.response?.data;
        //   const message = data?.message || error.message;
        //   toast.error(message);
        // }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
