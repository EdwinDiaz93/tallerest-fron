export interface IUser {
    id: string;
    name: string;
    email: string;
    token: string;
}

export interface ILogin {
    email: string;
    password: string;
}
