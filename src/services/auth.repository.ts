import BaseRepository from "../api/factory";
import { ILogin, IUser } from "../interfaces";
import { Http } from "../models/http.model";
import { AuthPath } from "../models/paths.model";


export class AuthRepository extends BaseRepository {

    async login(): Promise<IUser> {
        try {
            const response: IUser = await this.request<ILogin, IUser>(Http.POST, `${AuthPath}/login`, { email: 'admin@example.com', password: 'password' });
            return response;
        } catch (error: any) {
            throw error;
        }
    }
}