import { configureStore } from '@reduxjs/toolkit';
import { IUser } from '../interfaces';
import { userSlice } from './states';

export interface AppStore {
    user: IUser;
}

export const store = configureStore<AppStore>({
    reducer: {
        user: userSlice,
    },
});

