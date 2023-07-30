import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user.interface';

export const EmptyUserState: IUser = {
    id: '',
    name: '',
    email: '',
    token: ''

}

export const userKey = 'user';


const userSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : EmptyUserState,
    reducers: {
        createUser: (state, action) => {
            const user = action.payload;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        },
        updateUser: (state, action) => {
            const result = { ...state, ...action.payload };
            localStorage.setItem('user', JSON.stringify(result));
            return result;
        },
        resetUser: () => {
            localStorage.removeItem('user');
            return EmptyUserState;
        }
    }
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;