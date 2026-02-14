const studentController = require('../controller/studentController');
const router = require('express').Router()

router.get("/students",studentController.getAllStudents)
router.post("/students",studentController.createStudent)
router.get("/students/:id",studentController.getStudentById)
router.put("/students/:id",studentController.updateStudent)
router.delete("/students/:id",studentController.deleteStudent)

module.exports = router
