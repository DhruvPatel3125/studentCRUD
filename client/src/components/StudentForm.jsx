import {useState} from 'react'
import {createStudents} from '../api/studentAPI'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createStudent } from '../store/thunk/studentThunk'

import {studentCreateSchema} from '../validations/studentValidation'

function StudentForm() {
  const [form,setForm] = useState({
    name:"",
    email:"",
    age:"",
    address:""
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleForm = (e) =>{
    const {name,value} = e.target
    setForm(prev => ({...prev,[name]:value}))
    // Clear specific field error when user types
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = {...prev}
            delete newErrors[name]
            return newErrors
        })
    }
  }

  const submit = async (e) =>{
    e.preventDefault()
    setErrors({})

    // Client-side validation
    const { error } = studentCreateSchema.validate(form, { abortEarly: false })
    if (error) {
      const clientErrors = {}
      error.details.forEach(detail => {
          clientErrors[detail.path[0]] = detail.message
      })
      setErrors(clientErrors)
      return 
    }

    const resultAction = await dispatch(createStudent(form))
    
    if (createStudent.fulfilled.match(resultAction)) {
      navigate('/list')
    } else {
      if (resultAction.payload?.errors) {
        setErrors(resultAction.payload.errors)
      } else {
        setErrors({ general: 'An unexpected error occurred.' })
      }
    }
  }
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <form
        onSubmit={submit}
        className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-2xl font-semibold text-slate-800">Add Student</h2>
        <p className="mt-1 text-sm text-slate-500">Fill out the details below.</p>

        {errors.general && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                {errors.general}
            </div>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
            <input
              type="text"
              placeholder="Student Name"
              name="name"
              value={form.name}
              onChange={handleForm}
              className={`w-full rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'} px-3 py-2 text-slate-800 outline-none transition focus:ring-2`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              placeholder="Student Email"
              name="email"
              value={form.email}
              onChange={handleForm}
              className={`w-full rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'} px-3 py-2 text-slate-800 outline-none transition focus:ring-2`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Age</label>
            <input
              type="number"
              placeholder="Student Age"
              name="age"
              value={form.age}
              onChange={handleForm}
              className={`w-full rounded-lg border ${errors.age ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'} px-3 py-2 text-slate-800 outline-none transition focus:ring-2`}
            />
            {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
            <input
              type="text"
              placeholder="Student Address"
              name="address"
              value={form.address}
              onChange={handleForm}
              className={`w-full rounded-lg border ${errors.address ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'} px-3 py-2 text-slate-800 outline-none transition focus:ring-2`}
            />
            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          Add Student
        </button>
      </form>
    </div>
  )
}

export default StudentForm
