import {useEffect,useState} from 'react'
import {getStudents,deleteStudents} from '../api/studentAPI'
import { useNavigate } from 'react-router-dom'
function StudentList() {
  const [students,setStudents] = useState([])
  const navigate = useNavigate()

  useEffect(() =>{
    const loadData = async () =>{
      const response = await getStudents()
      setStudents(response.data)
    }
    loadData()
  },[])

  const handleDelete = async (id) =>{
    try {
      await deleteStudents(id) 
      const response = await getStudents()
      setStudents(response.data)
    } catch (error) {
      console.error("Error deleting student:", error)
    }
  }

  return (
    <div>
      <h2>Student List</h2>
      {students.map(student =>(
       < div key={student._id}>
        <p>{student.name}</p>
        <p>{student.email}</p>
        <p>{student.age}</p>
        <p>{student.address}</p>
        <button onClick={() => handleDelete(student._id)}>Delete</button>
        <button onClick={() => navigate(`/edit/${student._id}`)}>Edit</button>
        <button onClick={() => navigate(`/student/${student._id}`)}>View</button>
      </div>
      ))}

      </div>
  )
}

export default StudentList