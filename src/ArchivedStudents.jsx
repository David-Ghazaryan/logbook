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
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-6 bg-white flex flex-col items-start gap-6">
      <div className="w-full md:w-auto shrink-0">
        <button
          onClick={() => navigate('/')}
          className="w-full md:w-24 h-10 cursor-pointer bg-white rounded-xl text-[#448e78] font-bold border px-5 hover:bg-slate-50 transition-colors">
          Back
        </button>
      </div>

      <div className="w-full grow">
        <div className="bg-[#448e78] p-4 md:p-6 rounded-t-2xl text-white flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center w-full">
          <span className="text-xl md:text-2xl font-bold">Archive</span>
        </div>
        <div className="w-full border-x border-b rounded-b-2xl overflow-hidden bg-white shadow-sm">
          <ArchivedStudentsTable students={students} setStudents={setStudents} />
        </div>
      </div>
    </div>
  );
};

export default ArchivedStudents;
