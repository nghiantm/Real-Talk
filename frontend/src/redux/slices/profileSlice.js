import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profileSlice",
    initialState: {
        loading: false,
        profile: null,
        error: null,
        level: null
    },
    reducers: {
        start(state) {
            state.loading = true;
            state.error = null
        },
        setProfileSuccess(state, action) {
            state.loading = false;
            state.profile = action.payload;
        },
        setProfileFailure(state, action) {
            state.loading = true;
            state.error = action.payload;
        },
        setLevelSuccess(state, action) {
            state.loading = false;
            state.level = action.payload
        },
        getEmail(state) {
            return state.profile.email;
        }
    }
})

export const {
    start,
    setProfileSuccess,
    setProfileFailure,
    getEmail,
    setLevelSuccess
} = profileSlice.actions;
export default profileSlice.reducer;