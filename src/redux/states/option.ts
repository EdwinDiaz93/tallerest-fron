import { createSlice } from '@reduxjs/toolkit';
import { IOption } from '../../interfaces';

export const EmptyMovieState: IOption = {
    currentPage: 0,
    firstPage: 0,
    lastPage: 0,
    rows: [],
    totalPages: 0,
    totalRows: 0
}

export const userKey = 'option';


const optionSlice = createSlice({
    name: 'option',
    initialState: EmptyMovieState,
    reducers: {
        setOptions: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetOptions: (state) => {
            return EmptyMovieState;
        }
    }
});

export const { resetOptions, setOptions } = optionSlice.actions;

export default optionSlice.reducer;