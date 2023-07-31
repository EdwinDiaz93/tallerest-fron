import BaseRepository from "../api/factory";
import { LoginFormValues, IUser } from "../interfaces";
import { Http } from "../models/http.model";
import { AuthPath } from "../models/paths.model";


export class AuthRepository extends BaseRepository {

    async login(loginValues: LoginFormValues): Promise<IUser> {
        try {
            const response: IUser = await this.request<LoginFormValues, IUser>(Http.POST, `${AuthPath}/login`, loginValues);
            return response;
        } catch (error: any) {
            throw error;
        }
    }
}