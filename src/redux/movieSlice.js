import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCategory: { name: "", code: "" },
    myMovieList: [],
};

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        selectedCategoryAction: (state, action) => {
            state.selectedCategory = action.payload;
        },
        myMovieListAddAction: (state, action) => {
            state.myMovieList.push(action.payload);
            return state;
        },
    },
});

export const { selectedCategoryAction, myMovieListAddAction } = movieSlice.actions;

export default movieSlice.reducer;
