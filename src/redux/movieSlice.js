import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCategory: { name: "", code: "" },
    myMovieList: [],
    currentUser: null,
};

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        selectedCategoryAction: (state, action) => {
            state.selectedCategory = action.payload;
        },
        myMovieListAddAction: (state, action) => {
            const prevState = state.myMovieList;
            state.myMovieList = [...prevState, action.payload];
            return state;
        },

        updateMyMovieListFromDb: (state, action) => {
            state.myMovieList = [...action.payload];
            return state;
        },
        myMovieListRemoveAction: (state, action) => {
            const filteredMovieList = state.myMovieList?.filter((movie) => movie.id !== action.payload);
            state.myMovieList = [...filteredMovieList];
            return state;
        },
        myInitalMovieListAction: (state, action) => {
            state.myMovieList = action.payload;
            return state;
        },
        saveCurrentUserAction: (state, action) => {
            state.currentUser = action.payload;
            return state;
        },
    },
});

export const { selectedCategoryAction, myMovieListAddAction, myMovieListRemoveAction, myInitalMovieListAction, updateMyMovieListFromDb, saveCurrentUserAction } =
    movieSlice.actions;

export default movieSlice.reducer;
