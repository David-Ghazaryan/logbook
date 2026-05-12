import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
const BASE_URL = 'http://localhost:5005';
import { useNavigate } from 'react-router-dom';
import ArchivedStudentsTable from './ArchivedStudentsTable';

const ArchivedStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${BASE_URL}/archive`);
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
    <div className="p-10 h-full min-h-154 bg-white flex items-start">
      <button
        onClick={() => navigate('/')}
        className="-translate-x-32 w-20 h-10 cursor-pointer bg-white rounded-xl text-[#448e78] font-bold border px-5">
        Back
      </button>
      <div className="-translate-x-8 w-280">
        <div className="bg-[#448e78] p-6 text-center rounded-t-2xl  text-white text-2xl font-bold">
          Archived Students info
        </div>

        <ArchivedStudentsTable students={students} setStudents={setStudents} />
      </div>
    </div>
  );
};

export default ArchivedStudents;
