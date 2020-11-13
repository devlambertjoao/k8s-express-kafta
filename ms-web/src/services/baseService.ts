import Axios, { AxiosInstance } from 'axios';

export abstract class BaseService {
    
    private axiosInstance: AxiosInstance;

    constructor(baseUrl: string) {
        this.axiosInstance = Axios.create({
            baseURL: baseUrl,
            headers: {
                post: {
                  'Content-Type': 'application/json',
                }
              }
        });
    }

    protected async post<T>(path: string, data: T): Promise<T | undefined> {
        try {
            return await this.axiosInstance.post(path, data);
        } catch (err) {
            console.error(err);
        }
    }
}