import { createSlice } from '@reduxjs/toolkit';
import { IMovie } from '../../interfaces';

export const EmptyMovieState: IMovie = {
    currentPage: 0,
    firstPage: 0,
    lastPage: 0,
    rows: [],
    totalPages: 0,
    totalRows: 0
}

export const userKey = 'user';


const movieSlice = createSlice({
    name: 'movie',
    initialState: EmptyMovieState,
    reducers: {
        setMovies: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetMovies: (state, action) => {
            return EmptyMovieState;
        }
    }
});

export const { setMovies, resetMovies } = movieSlice.actions;

export default movieSlice.reducer;