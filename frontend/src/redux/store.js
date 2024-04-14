import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './slices/profileSlice';
import chatSlice from './slices/chatSlice';

export const store = configureStore({
    reducer: {
        profile: profileSlice,
        chat: chatSlice
    }
})