import BaseRepository from "../api/factory";
import { Http } from "../models/http.model";
import { OptionPath } from "../models/paths.model";


export class OptionsRepository extends BaseRepository {

    async getOptions(): Promise<any> {
        try {
            const response: any = await this.request<any, any>(Http.GET, `${OptionPath}`, {});
            return response;
        } catch (error: any) {
            throw error;
        }
    }
}