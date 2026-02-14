import {useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { getStudent,updateStudents } from '../api/studentAPI'
function StudentEdit() {
  const { id } = useParams();
  const navigate = useNavigate()

  const [form,setForm] = useState({
    name:"",
    email:"",
    age:"",
    address:""
  })

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
  
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const response = await updateStudents(id,form)
      console.log(response)
      navigate('/list')   

    } catch (error) {
      console.error("Error updating student:", error)
    }
  }
  return (
    <div>
    <h2>StudentEdit {id}</h2>
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder='Name' value={form.name} onChange={handleChange} />
      <input type="email" name='email' placeholder='Email' value={form.email} onChange={handleChange} />
      <input type="number" name='age' placeholder='Age' value={form.age} onChange={handleChange} />
      <input type="text" name='address' placeholder='Address' value={form.address} onChange={handleChange} />

      <button type='submit'>Update Student</button>
    </form>
    </div>
  )
}

export default StudentEdit