import {useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { getStudent } from '../api/studentAPI'
import { useDispatch } from 'react-redux'
import {studentUpdateSchema} from '../validations/studentValidation'

function StudentEdit() {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [form,setForm] = useState({
    name:"",
    email:"",
    age:"",
    address:""
  })
  const [errors, setErrors] = useState({})

  useEffect(()=>{
    const loadData = async () =>{
      try {
        const response = await getStudent(id)
        setForm(response.data || {})
      } catch (error) {
        console.error("Error fetching student:", error)
      }
    }
    loadData()
  },[id])
  const handleChange = (e) => {
    const {name,value} = e.target
    setForm(prev => ({...prev,[name]:value}))
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = {...prev}
            delete newErrors[name]
            return newErrors
        })
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setErrors({})

    // Client-side validation
    const { error } = studentUpdateSchema.validate(form, { abortEarly: false })
    if (error) {
      const clientErrors = {}
      error.details.forEach(detail => {
          clientErrors[detail.path[0]] = detail.message
      })
      setErrors(clientErrors)
      return 
    }

    const resultAction = await dispatch(updateStudent({ id, data: form }))
    
    if (updateStudent.fulfilled.match(resultAction)) {
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
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-2xl font-semibold text-slate-800">Edit Student</h2>
      <p className="mt-1 text-sm text-slate-500">ID: {id}</p>

      {errors.general && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {errors.general}
          </div>
      )}

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
          <input
            name="name"
            placeholder='Name'
            value={form.name}
            onChange={handleChange}
            className={`w-full rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'} px-3 py-2 text-slate-800 outline-none transition focus:ring-2`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            name='email'
            placeholder='Email'
            value={form.email}
            onChange={handleChange}
            className={`w-full rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'} px-3 py-2 text-slate-800 outline-none transition focus:ring-2`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Age</label>
          <input
            type="number"
            name='age'
            placeholder='Age'
            value={form.age}
            onChange={handleChange}
            className={`w-full rounded-lg border ${errors.age ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'} px-3 py-2 text-slate-800 outline-none transition focus:ring-2`}
          />
          {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
          <input
            type="text"
            name='address'
            placeholder='Address'
            value={form.address}
            onChange={handleChange}
            className={`w-full rounded-lg border ${errors.address ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'} px-3 py-2 text-slate-800 outline-none transition focus:ring-2`}
          />
          {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
        </div>
      </div>

      <button
        type='submit'
        className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
      >
        Update Student
      </button>
    </form>
    </div>
  )
}

export default StudentEdit
