import Axios, { AxiosInstance } from 'axios';

export abstract class BaseService {
    private basePath: string;
    private axiosInstance: AxiosInstance;

    constructor(basePath: string) {
        this.basePath = basePath;
        this.axiosInstance = Axios.create({
            headers: {
                post: {
                  'Content-Type': 'application/json',
                }
            }
        });
    }

    protected async post<T>(path: string, data: T): Promise<T | undefined> {
        try {
            return await this.axiosInstance.post(`${this.basePath}/${path}`, data);
        } catch (err) {
            console.error(err);
        }
    }
}