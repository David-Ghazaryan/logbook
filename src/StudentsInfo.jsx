import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import StudentsTable from './StudentsTable';
const BASE_URL = 'http://localhost:5005';
import { useNavigate } from 'react-router-dom';

const StudentsInfo = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
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

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch(`${BASE_URL}/attendance`);
        if (!res.ok) throw new Error('Attendance API error');

        const data = await res.json();
        setAttendance(data);
        console.log(data);
      } catch (err) {
        console.error('Attendance fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress size={75} color="success" />
      </div>
    );

  return (
    <div className="p-10 bg-white flex items-start">
      <button
        onClick={() => navigate('/')}
        className="-translate-x-32 w-30 h-10 cursor-pointer bg-white rounded-xl text-[#448e78] font-bold border px-5">
        Back
      </button>
      <div className="-translate-x-25 w-280">
        <div className="bg-[#448e78] p-6 text-center rounded-t-2xl  text-white text-2xl font-bold">
          Students info
        </div>

        <StudentsTable
          students={students}
          setStudents={setStudents}
          attendance={attendance}
          setAttendance={setAttendance}
        />
      </div>
    </div>
  );
};

export default StudentsInfo;
