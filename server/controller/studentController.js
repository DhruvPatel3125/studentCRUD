const studentService = require('../service/studentService')


const getAllStudents = async (req,res) =>{
    try {
            const students = await studentService.getAllStudents();
            res.status(200).json(students)
    } catch (error) {
            res.status(500).json({message:"server error",error});
    }
};

const createStudent = async (req,res) =>{
    try {
            const student = await studentService.createStudent(req.body);
            res.status(201).json(student)
    } catch (error) {
            res.status(400).json({message:"bad request",error})
    }
}

const getStudentById = async (req,res) =>{
    try {
        const student = await studentService.getStudentById(req.params.id);
        if(!student){
            res.status(404).json({message:"student not found"})
        }
        res.status(200).json(student)
    } catch (error) {
            res.status(500).json({message:"server error",error})
    }
}

    const updateStudent = async (req,res) =>{
        try{
            const student = await studentService.updateStudent(req.params.id,req.body);
            if(!student){
                res.status(404).json({message:"student not found"})
            }
            res.status(200).json(student)
        } catch (error) {
                res.status(500).json({message:"server error",error})
        }
    }

const deleteStudent = async (req,res) =>{
    try{
        const student = await studentService.deleteStudent(req.params.id);
        if(!student){
            res.status(404).json({message:"student not found"})
        }
        res.status(200).json({message:"student deleted successfully"})
    } catch (error) {
            res.status(500).json({message:"server error",error})
    } 
}

module.exports = {
    getAllStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
}