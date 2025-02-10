import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEmailVerified: null,
    user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setEmailVerified(state, action) {
            state.isEmailVerified = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        }
    }
});


export const { setEmailVerified, setUser } = authSlice.actions;
export default authSlice.reducer;