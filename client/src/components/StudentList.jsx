import {useEffect,useState} from 'react'
import {getStudents,deleteStudents} from '../api/studentAPI'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchStudents } from '../store/thunk/studentThunk'
import { deleteStudent } from '../store/thunk/studentThunk'
import { useSelector } from 'react-redux'

function StudentList() {
  const [students,setStudents] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const studentData = useSelector(state => state.students)

  useEffect(() =>{
    const loadData = async () =>{
      const response = await dispatch(fetchStudents())
      setStudents(response.payload || [])
    }
    loadData()
  },[])

  const handleDelete = async (id) =>{
    try {
      await dispatch(deleteStudent(id))
      const response = await dispatch(fetchStudents())
      setStudents(response.payload || [])
    } catch (error) {
      console.error("Error deleting student:", error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-800">Student List</h2>
          <button
            onClick={() => navigate('/')}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Add Student
          </button>
        </div>

        {students.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
            No students found.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {students.map((student) => (
              <div key={student._id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-lg font-semibold text-slate-800">{student.name}</p>
                <p className="mt-1 text-sm text-slate-600">{student.email}</p>
                <p className="mt-1 text-sm text-slate-600">Age: {student.age}</p>
                <p className="mt-1 text-sm text-slate-600">{student.address}</p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/student/${student._id}`)}
                    className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${student._id}`)}
                    className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentList
