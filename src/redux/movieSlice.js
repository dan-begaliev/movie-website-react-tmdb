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
        myMovieListRemoveAction: (state, action) => {
            const filteredMovieList = state.myMovieList.filter((movie) => movie.id !== action.payload);
            state.myMovieList = [...filteredMovieList];
            return state;
        },
        myInitalMovieListAction: (state, action) => {
            state.myMovieList = action.payload;
            return state;
        },
    },
});

export const { selectedCategoryAction, myMovieListAddAction, myMovieListRemoveAction, myInitalMovieListAction } = movieSlice.actions;

export default movieSlice.reducer;
