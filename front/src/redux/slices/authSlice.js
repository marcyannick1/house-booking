import {createSlice} from "@reduxjs/toolkit";
import {loginUser, registerUser} from "@/redux/actions/authActions.js";
import {jwtDecode} from "jwt-decode";

const initialState = {
    loading: false,
    userInfo: null,
    userToken: localStorage.getItem("userToken") || null,  // Persiste le token
    error: null,
    success: false,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = null;
            state.userToken = null;
            localStorage.removeItem("userToken");
        },
        resetAuthState: (state) => {
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = jwtDecode(action.payload.token);
                state.userToken = action.payload.token;
                state.success = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const {logout, resetAuthState} = authSlice.actions;
export default authSlice.reducer;