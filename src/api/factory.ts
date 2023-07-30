import axios, { AxiosResponse, AxiosRequestHeaders, Axios } from 'axios';
import { Http } from '../models/http.model';

class BaseRepository {
    private axios: Axios;
    constructor() {
        const baseURL: string = process.env.REACT_APP_APIBASE_URL || '';
        this.axios = axios.create({
            baseURL
        });
    }

    protected async request<T, U>(method: Http, path: string, data: T, headers?: AxiosRequestHeaders): Promise<U> {
        try {

            if (!path.includes('login')) this.setupAxios(this.axios);

            const response: AxiosResponse<U> = await this.axios.request<U>({
                method,
                url: `/${path}`,
                data,
                headers,
            });
            return response.data;
        } catch (error: any) {
            throw error.response;
        }
    }

    private setupAxios(instance: Axios) {
        instance.interceptors.request.use(
            (config) => {
                // Obtenemos el token de localStorage
                const { token } = JSON.parse(localStorage.getItem('user') || '');

                // Asignamos el token al encabezado de autorización para cada petición
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                // Si la respuesta es un error de "token expirado" u otro código de error relacionado al token, puedes intentar refrescar el token y reintentar la solicitud original.
                if (error.response && error.response.status === 401) {
                    try {
                        // Aquí debes implementar la lógica para refrescar el token.
                        // Por ejemplo, hacer una solicitud para obtener un nuevo token usando el token actual almacenado en localStorage.
                        // Luego, actualiza el nuevo token en localStorage y vuelve a intentar la solicitud original usando axios.

                        // const newToken = await refreshToken(); // Función que obtiene el nuevo token
                        // updateToken(newToken); // Actualiza el nuevo token en localStorage

                        // Después de obtener el nuevo token y actualizarlo en localStorage, reintentamos la solicitud original usando axios.
                        // La siguiente línea de código se comenta, ya que aquí estamos mostrando solo la configuración del interceptor, no toda la lógica completa para refrescar el token.
                        // return instance(error.config);

                    } catch (refreshError) {
                        // Si ocurre un error al intentar refrescar el token, puedes redirigir al usuario a la página de inicio de sesión o hacer alguna otra acción según tu lógica de manejo de errores.
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }
}

export default BaseRepository;
