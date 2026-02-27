import { createAsyncThunk } from "@reduxjs/toolkit";
import * as studentAPI from "../../api/studentAPI"

export const fetchStudents = createAsyncThunk(
    "students/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await studentAPI.getStudents()
            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const fetchStudentById = createAsyncThunk(
    "students/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await studentAPI.getStudent(id);
            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createStudent = createAsyncThunk(
    "students/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = await studentAPI.createStudents(data);
            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateStudent = createAsyncThunk(
    "students/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await studentAPI.updateStudents(id, data);
            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deleteStudent = createAsyncThunk(
    "students/delete",
    async (id, { rejectWithValue }) => {
        try {
            const res = await studentAPI.deleteStudents(id);
            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
