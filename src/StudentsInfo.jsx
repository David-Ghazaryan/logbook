import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import StudentsTable from './StudentsTable';
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from './config';

const StudentsInfo = () => {
  const GROUPS = [
    { id: 1, label: 'Խումբ 1' },
    { id: 2, label: 'Խումբ 2' },
    { id: 3, label: 'Խումբ 3' },
    { id: 4, label: 'Խումբ 4' },
  ];

  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterGroup, setFilterGroup] = useState('all');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${BASE_URL}/students`);
        if (!res.ok) throw new Error('Students API error');
        const data = await res.json();
        setStudents(data);
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
      } catch (err) {
        console.error('Attendance fetch error:', err);
      }
    };

    fetchAttendance();
  }, []);

  const filteredStudents =
    filterGroup === 'all'
      ? students
      : students.filter((student) => String(student.group_id) === String(filterGroup)); // Համոզվում ենք, որ տիպերը համընկնում են (String)

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

      <div className="w-full flex flex-col">
        <div className="bg-[#448e78] p-4 md:p-6 rounded-t-2xl text-white flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center w-full">
          <span className="text-xl md:text-2xl font-bold">Students Info</span>

          <div className="flex items-center gap-3 bg-white backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 w-full sm:w-auto justify-between sm:justify-start">
            <span className="font-semibold text-sm text-[#448e78] whitespace-nowrap">
              Ֆիլտրել ըստ խմբի:
            </span>
            <select
              className="p-1 border rounded-md outline-none border-[#448e78] bg-white text-slate-800 font-medium text-sm shadow-sm cursor-pointer min-w-25"
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}>
              <option value="all" className="text-[#448e78]">
                Բոլորը
              </option>
              {GROUPS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full border-x border-b rounded-b-2xl overflow-hidden bg-white shadow-sm">
          <StudentsTable
            students={filteredStudents}
            setStudents={setStudents}
            attendance={attendance}
            setAttendance={setAttendance}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentsInfo;
