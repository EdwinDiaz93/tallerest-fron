import BaseRepository from "../api/factory";
import { IOption } from "../interfaces";
import { Http } from "../models/http.model";
import { OptionPath } from "../models/paths.model";


export class OptionsRepository extends BaseRepository {

    async getOptions(page: number = 1, limit: number = 10): Promise<any> {
        try {
            const response: IOption = await this.request<any, IOption>(Http.GET, `${OptionPath}?page=${page}&limit=${limit}`, {});
            return response;
        } catch (error: any) {
            throw error;
        }
    }
}