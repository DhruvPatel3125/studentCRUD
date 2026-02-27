import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getStudent } from '../api/studentAPI'
import { useDispatch } from 'react-redux'
import { fetchStudentById } from '../store/thunk/studentThunk'


function StudentDetails() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [student,setStudent] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchStudentById(id)).unwrap()
      dispatch(fetchStudentById(id))
      .unwrap()
      .then((student) => setStudent(student))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [id,dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm sm:p-8">
          Loading...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-rose-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm text-rose-600">{error}</p>
          <button
            onClick={() => navigate('/list')}
            className="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
          >
            Back to List
          </button>
        </div>
      </div>
    )
  }

  if (!student) return null

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-800">Student Details</h2>
          <button
            onClick={() => navigate('/list')}
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-900"
          >
            Back
          </button>
        </div>

        <div className="mt-6 space-y-3 text-sm text-slate-700">
          <p><span className="font-semibold text-slate-900">Name:</span> {student.name}</p>
          <p><span className="font-semibold text-slate-900">Email:</span> {student.email}</p>
          <p><span className="font-semibold text-slate-900">Age:</span> {student.age}</p>
          <p><span className="font-semibold text-slate-900">Address:</span> {student.address}</p>
        </div>
      </div>
    </div>
  )
}

export default StudentDetails
