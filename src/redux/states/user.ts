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
    initialState: EmptyUserState,
    reducers: {
        createUser: (state, action) => {
            return action.payload
        },
        updateUser: (state, action) => {
            const result = { ...state, ...action.payload };
            return result;
        },
        resetUser: () => {
            return EmptyUserState;
        }
    }
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;