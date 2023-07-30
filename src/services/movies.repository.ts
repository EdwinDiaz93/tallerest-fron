import BaseRepository from "../api/factory";
import { IMovie } from "../interfaces";
import { Http } from "../models/http.model";
import { MoviePath } from "../models/paths.model";


export class MoviesRepository extends BaseRepository {

    async getMovies(page = 1, limit = 10): Promise<IMovie> {
        try {
            const response: IMovie = await this.request<any, IMovie>(Http.GET, `${MoviePath}?page=${page}&limit=${limit}`, {});
            return response;
        } catch (error: any) {
            throw error;
        }
    }
}