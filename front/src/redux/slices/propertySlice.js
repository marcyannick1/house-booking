import {createSlice} from "@reduxjs/toolkit";
import {createProperty, deleteProperty, fetchProperties} from "@/redux/actions/propertyActions.js";

const propertySlice = createSlice({
    name: "property",
    initialState: {
        properties: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Fetch Properties
            .addCase(fetchProperties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.properties = action.payload;
            })
            .addCase(fetchProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Create Property
            .addCase(createProperty.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProperty.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.properties.push(action.payload); // Ajoute la nouvelle propriété
            })
            .addCase(createProperty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Delete Property
            .addCase(deleteProperty.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProperty.fulfilled, (state, action) => {
                state.loading = false;
                state.properties = state.properties.filter(
                    (property) => property.id !== action.payload
                );
            })
            .addCase(deleteProperty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {clearSuccess} = propertySlice.actions;
export default propertySlice.reducer;