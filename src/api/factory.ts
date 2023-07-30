import axios, { AxiosResponse, AxiosRequestHeaders } from 'axios';
import { Http } from '../models/http.model';

class BaseRepository {
    private apiUrl: string;

    constructor() {
        this.apiUrl = process.env.REACT_APP_APIBASE_URL || ''; // Obtenemos la URL de la API desde las variables de entorno
    }

    protected async request<T, U>(method: Http, path: string, data: T, headers?: AxiosRequestHeaders): Promise<U> {
        try {            
            const response: AxiosResponse<U> = await axios.request<U>({
                method,
                url: `${this.apiUrl}/${path}`,
                data,
                headers,
            })
            return response.data;
        } catch (error: any) {
            throw error.response;
        }
    }
}

export default BaseRepository;
