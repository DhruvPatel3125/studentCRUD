const studentModel = require('../models/studentModel');
const getAllStudents = async () =>{
    return await studentModel.find();
};

const createStudent = async (studentData) =>{
    const student = new studentModel(studentData)
    return await student.save()
}

const getStudentById = async (id) =>{
    return await studentModel.findById(id);
};

const updateStudent = async (id,updateData) =>{
    return await studentModel.findByIdAndUpdate(id,updateData,{new:true});
}

const deleteStudent = async (id) =>{
    return await studentModel.findByIdAndDelete(id)
}

module.exports = {
    getAllStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
}