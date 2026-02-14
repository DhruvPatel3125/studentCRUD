import StudentList from '../components/StudentList'
import StudentDetails from '../components/StudentDetails'
import StudentEdit from '../components/StudentEdit'
import StudentForm from '../components/StudentForm'
import { Route,Routes } from 'react-router-dom'
function AppRouts() {
  return (
    <Routes>
        <Route path='/list' element={<StudentList/>} />
        <Route path='/' element={<StudentForm/>} />
        <Route path='/student/:id' element={<StudentDetails/>} />
        <Route path='/edit/:id' element={<StudentEdit/>} />
    </Routes>
  )
}

export default AppRouts