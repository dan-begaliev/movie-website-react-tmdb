import { configureStore } from "@reduxjs/toolkit";
import movies from "./movieSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, movies);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
