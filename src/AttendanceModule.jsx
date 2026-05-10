import React, { useState, useEffect } from 'react';
import AttendanceTable from './AttendanceTable';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
const BASE_URL = 'http://localhost:5005';

const MONTHS = [
  { value: 1, label: 'Հունվար' },
  { value: 2, label: 'Փետրվար' },
  { value: 3, label: 'Մարտ' },
  { value: 4, label: 'Ապրիլ' },
  { value: 5, label: 'Մայիս' },
  { value: 6, label: 'Հունիս' },
  { value: 7, label: 'Հուլիս' },
  { value: 8, label: 'Օգոստոս' },
  { value: 9, label: 'Սեպտեմբեր' },
  { value: 10, label: 'Հոկտեմբեր' },
  { value: 11, label: 'Նոյեմբեր' },
  { value: 12, label: 'Դեկտեմբեր' },
];

const GROUPS = [
  { id: 1, label: 'Խումբ 1' },
  { id: 2, label: 'Խումբ 2' },
  { id: 3, label: 'Խումբ 3' },
  { id: 4, label: 'Խումբ 4' },
];

const AttendanceModule = () => {
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedGroup, setSelectedGroup] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${BASE_URL}/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const fetchAttendance = () => {
      fetch(`${BASE_URL}/attendance`)
        .then((res) => res.json())
        .then((data) => {
          setAttendanceRecords(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(true);
        });
    };
    fetchAttendance();
    const interval = setInterval(fetchAttendance, 5000);
    return () => clearInterval(interval);
  }, []);
  const filteredStudents = students.filter((student) => student.group_id === selectedGroup);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress size={75} color="success" />
      </div>
    );

  return (
    <div className="flex max-w-7xl mx-10 py-10 bg-white">
      <button
        onClick={() => navigate('/')}
        className="-translate-x-28 w-30 h-10 cursor-pointer bg-white rounded-xl text-[#448e78] font-bold border px-5">
        Back
      </button>
      <div className="-translate-x-15 w-260">
        <div className="bg-[#448e78] p-6 rounded-t-2xl text-white flex flex-wrap gap-4 justify-between items-center">
          <span className="text-2xl font-bold">Logbook</span>

          <div className="flex gap-4 ">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(parseInt(e.target.value))}
              className="bg-white text-slate-800 px-4 py-2 rounded-lg font-medium outline-none shadow-md">
              {GROUPS.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.label}
                </option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="bg-white text-slate-800 px-4 py-2 rounded-lg font-medium outline-none shadow-md">
              {MONTHS.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label} 2026
                </option>
              ))}
            </select>
          </div>
        </div>

        <AttendanceTable
          students={filteredStudents}
          attendanceRecords={attendanceRecords}
          selectedMonth={selectedMonth}
        />
      </div>
    </div>
  );
};

export default AttendanceModule;
