const studentController = require('../controller/studentController');
const router = require('express').Router()
const validate = require('../middlewares/validate');
const { studentCreateSchema, studentUpdateSchema } = require('../validations/studentValidation');

router.get("/students", studentController.getAllStudents)
router.post("/students", validate(studentCreateSchema), studentController.createStudent)
router.get("/students/:id", studentController.getStudentById)
router.put("/students/:id", validate(studentUpdateSchema), studentController.updateStudent)
router.delete("/students/:id", studentController.deleteStudent)

module.exports = router
