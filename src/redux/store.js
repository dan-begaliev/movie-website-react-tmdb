import { configureStore } from "@reduxjs/toolkit";
import movies from "./movieSlice";

export const store = configureStore({
    reducer: {
        movies,
    },
});
