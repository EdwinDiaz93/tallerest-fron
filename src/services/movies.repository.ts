import BaseRepository from "../api/factory";
import { IMovie, MovieFormValues } from "../interfaces";
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

    async saveMovie(movieValues: MovieFormValues) {
        try {
            const response = await this.request<MovieFormValues, any>(Http.POST, MoviePath, movieValues);
            return response
        } catch (error: any) {
            throw error;
        }
    }

    async updateMovie(id: number, movieValues: MovieFormValues) {
        try {
            const response = await this.request<MovieFormValues, any>(Http.PUT, `${MoviePath}/${id}`, movieValues);
            return response
        } catch (error: any) {
            throw error;
        }
    }

    async deleteMovie(id: string) {
        try {
            const response = await this.request<any, any>(Http.DELETE, `${MoviePath}/${id}`, {});
            return response
        } catch (error: any) {
            throw error;
        }
    }
}