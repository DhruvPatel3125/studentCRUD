import axios from 'axios'
import axiosClient from './axiosClient';
const API = "http://localhost:5000/api/students";


export const getStudents = () => axiosClient.get("/students");
export const createStudents = (data) => axiosClient.post("/students", data);
export const deleteStudents = (id) => axiosClient.delete(`/students/${id}`);
export const getStudent = (id) => axiosClient.get(`/students/${id}`);
export const updateStudents = (id, data) => axiosClient.put(`/students/${id}`, data);