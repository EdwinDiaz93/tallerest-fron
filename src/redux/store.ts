import { configureStore } from '@reduxjs/toolkit';
import { IMovie, IUser } from '../interfaces';
import { userSlice, movieSlice } from './states';

export interface AppStore {
    user: IUser;
    movie: IMovie
}

export const store = configureStore<AppStore>({
    reducer: {
        user: userSlice,
        movie: movieSlice,
    },
});

