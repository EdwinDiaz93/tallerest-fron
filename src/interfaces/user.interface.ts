
interface Rol {
    id: string;
    name: string;
}
export interface IUser {
    id: string;
    name: string;
    email: string;
    roles?: Rol[],
    token: string;
}


