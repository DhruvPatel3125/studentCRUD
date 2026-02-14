import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStudent } from '../api/studentAPI'

function StudentDetails() {
  const {id} = useParams()
  const [student,setStudent] = useState(null)

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await getStudent(id);
      setStudent(res.data);
    };
    fetchStudent();
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <>
      <p><b>Name:</b>{student.name}</p>
      <p><b>Email:</b>{student.email}</p>
      <p><b>Phone:</b>{student.phone}</p>
      <p><b>Address:</b>{student.address}</p>
    </>
  );
}

export default StudentDetails