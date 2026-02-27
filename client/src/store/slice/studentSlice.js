import { createSlice } from "@reduxjs/toolkit";

import { fetchStudents,fetchStudentById,createStudent,updateStudent,deleteStudent } from "../thunk/studentThunk";

const studentSlice = createSlice({
    name:"students",

    initialState:{
        list:[],
        single:null,
        loading:false,
        error:null
    },
    reducers:{},

    extraReducers:(builder) =>{
        builder
        .addCase(fetchStudents.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchStudents.fulfilled,(state,action)=>{
            state.loading = false;
            state.list = action.payload
        })
        .addCase(fetchStudentById.fulfilled,(state,action)=>{
            state.single = action.payload
        })
        .addCase(createStudent.fulfilled,(state,action)=>{
            state.list.push(action.payload)
        })
        .addCase(updateStudent.fulfilled,(state,action)=>{
            const item = state.list.findIndex(s => s._id === action.payload._id);
            if(item !== -1) state.list[item] = action.payload
        })
        .addCase(deleteStudent.fulfilled,(state,action)=>{
            state.list = state.list.filter(s => s._id  !== action.payload)
        })
    }
})

export default studentSlice.reducer