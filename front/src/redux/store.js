import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Utilise localStorage
import authReducer from "./slices/authSlice.js";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export default store;