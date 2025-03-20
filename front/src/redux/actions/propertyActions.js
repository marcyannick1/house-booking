import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from "@/api/apiClient.js";

export const fetchProperties = createAsyncThunk(
    "property/fetchProperties",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get("/api/properties");
            return response.data; // Retourne les propriétés
        } catch (error) {
            return rejectWithValue(error.response?.data || "Une erreur est survenue");
        }
    }
);

export const createProperty = createAsyncThunk(
    "property/createProperty",
    async (propertyData, {rejectWithValue}) => {
        try {
            const response = await apiClient.post("/properties", propertyData, {headers: {"Content-Type": "multipart/form-data"}});
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data || "Impossible d'ajouter la propriété");
        }
    }
);

export const deleteProperty = createAsyncThunk(
    "property/deleteProperty",
    async (propertyId, {rejectWithValue}) => {
        try {
            await axios.delete(`/api/properties/${propertyId}`);
            return propertyId; // Retourne l'ID supprimé
        } catch (error) {
            return rejectWithValue(error.response?.data || "Échec de la suppression");
        }
    }
);