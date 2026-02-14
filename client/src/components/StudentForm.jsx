import {useState} from 'react'
import {createStudents} from '../api/studentAPI'
import {useNavigate} from 'react-router-dom'


function StudentForm() {
  const [form,setForm] = useState({
    name:"",
    email:"",
    age:"",
    address:""
  })
  const navigate = useNavigate()

  const handleForm = (e) =>{
    const {name,value} = e.target
    setForm(prev => ({...prev,[name]:value}))
    
  }
  const submit = async (e) =>{
    e.preventDefault()
    try {
      const response = await createStudents(form)
      console.log(response)
      navigate('/list')
    } catch (error) {
      console.error("Error creating student:", error)
    }
  }
  return (
    <form onSubmit={submit}>
      <h2>Add Student</h2>

      <input type="text" placeholder="Student Name" name="name" value={form.name} onChange={handleForm}/>
      <input type="email" placeholder="Student Email" name="email" value={form.email} onChange={handleForm}/>
      <input type="number" placeholder="Student Age" name="age" value={form.age} onChange={handleForm}/>
      <input type="text" placeholder="Student Address" name="address" value={form.address} onChange={handleForm}/>

      <button type="submit">Add Student</button>
    </form>
  )
}

export default StudentForm