import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null, // Retrieve user from localStorage
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload)); // Store in localStorage
        },
        logoutUser(state) {
            state.user = null;
            localStorage.removeItem("user"); // Remove user from storage
        },
    },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
