import { configureStore } from "@reduxjs/toolkit";
import movieReducer from '../store/Reducers/movieSlice'
import personReducer from '../store/Reducers/personSlice'
import tvReducer from '../store/Reducers/tvSlice'
export const store = configureStore({
    reducer :{
        movie : movieReducer,
        person : personReducer,
        tv:tvReducer,
    }
})

