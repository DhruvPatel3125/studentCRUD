import axios from 'axios'
const API = "http://localhost:5000/api/students";

export const getStudents = () => axios.get(API)

export const createStudents = (data) => axios.post(API,data)

export const deleteStudents = (id) => axios.delete(`${API}/${id}`)

export const getStudent = (id) => axios.get(`${API}/${id}`)

export const updateStudents = (id,data) => axios.put(`${API}/${id}`,data)