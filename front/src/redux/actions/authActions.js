import {createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient.js";

export const loginUser = createAsyncThunk("auth/login", async (userData, {rejectWithValue}) => {
    try {
        const response = await apiClient.post("/auth", userData);
        localStorage.setItem("userToken", response.data.token);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data.error || "Une erreur est survenue");
    }
});

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, {rejectWithValue}) => {
        try {
            const response = await apiClient.post("/users", userData);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.error || "Une erreur est survenue");
        }
    }
)