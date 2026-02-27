import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../store/slice/studentSlice"

export const store = configureStore({
    reducer:{
        students: studentReducer
    }
});