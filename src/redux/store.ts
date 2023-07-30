import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {},
    middleware: (getDefaultMiddlewate) => getDefaultMiddlewate({}).concat([]),
});

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=ReturnType<typeof store.dispatch>
