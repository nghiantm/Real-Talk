import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chatSlice",
    initialState: {
        loading: false,
        chat: null,
        level: "",
        error: null,
        input: "",
        feedback: null
    },
    reducers: {
        start(state) {
            state.loading = true;
            state.error = null
        },
        setChatSuccess(state, action) {
            state.loading = false;
            state.chat = action.payload.messages;
            state.level = action.payload.proficiencyLevel;
        },
        setChatFailure(state, action) {
            state.loading = true;
            state.error = action.payload;
        },
        setInputSuccess(state, action) {
            state.loading = false;
            state.input = action.payload;
        },
        setInputFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        appendChatSuccess(state, action) {
            //state.loading = false;
            const chats = state.chat;
            chats.push(action.payload);
            state.chat = chats;
        },
        appendChatFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        returnChats(state) {
            return state.chat;
        },
        returnLevel(state) {
            return state.level;
        },
        setFeedbackSuccess(state, action) {
            state.loading = false;
            state.feedback = action.payload
        },
        setFeedbackError(state, action) {
            state.loading = false;
            state.error = action.payload
        },
        resetFeedback(state) {
            state.feedback = null;
        }
    }
})

export const {
    start,
    setChatSuccess,
    setChatFailure,
    setInputSuccess,
    setInputFailure,
    appendChatSuccess,
    appendChatFailure,
    returnChats,
    returnLevel,
    setFeedbackSuccess,
    setFeedbackError,
    resetFeedback
} = chatSlice.actions;
export default chatSlice.reducer;