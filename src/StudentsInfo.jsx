import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import StudentsTable from './StudentsTable';
const BASE_URL = 'http://localhost:5005';

const StudentsInfo = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${BASE_URL}/students`);
        if (!res.ok) throw new Error('Students API error');

        const data = await res.json();
        setStudents(data);
        console.log(data);
      } catch (err) {
        console.error('Students fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress size={75} color="success" />
      </div>
    );

  return (
    <div className=" -translate-x-7 max-w-5xl ">
      <div className="bg-[#448e78] p-6 text-center rounded-t-2xl  text-white text-2xl font-bold">
        Students info
      </div>

      <StudentsTable students={students} setStudents={setStudents} />
    </div>
  );
};

export default StudentsInfo;
