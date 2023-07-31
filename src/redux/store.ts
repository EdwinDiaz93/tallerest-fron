import { configureStore } from '@reduxjs/toolkit';
import { IMovie, IOption, IUser } from '../interfaces';
import { userSlice, movieSlice, optionSlice } from './states';

export interface AppStore {
    user: IUser;
    movie: IMovie,
    option: IOption
}

export const store = configureStore<AppStore>({
    reducer: {
        user: userSlice,
        movie: movieSlice,
        option: optionSlice
    },
});

