import React, { useState, useEffect } from 'react';
import AttendanceTable from './AttendanceTable';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './config';

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
    <div className="h-full w-full max-w-7xl mx-auto px-4 py-6  bg-white flex flex-col items-start gap-6">
      <div className="w-full md:w-auto shrink-0">
        <button
          onClick={() => navigate('/')}
          className="w-full md:w-20 h-10 cursor-pointer bg-white rounded-xl text-[#448e78] font-bold border px-5 hover:bg-slate-50 transition-colors">
          Back
        </button>
      </div>

      <div className=" w-full grow">
        <div className="bg-[#448e78] p-4 md:p-6 rounded-t-2xl text-white flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <span className="text-xl md:text-2xl font-bold">Logbook</span>

          <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(parseInt(e.target.value))}
              className="flex-1 sm:flex-none bg-white text-slate-800 px-3 py-2 md:px-4 rounded-lg font-medium outline-none shadow-md text-sm md:text-base">
              {GROUPS.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.label}
                </option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="flex-1 sm:flex-none bg-white text-slate-800 px-3 py-2 md:px-4 rounded-lg font-medium outline-none shadow-md text-sm md:text-base">
              {MONTHS.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label} 2026
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full border-x border-b rounded-b-2xl overflow-hidden">
          <AttendanceTable
            students={filteredStudents}
            attendanceRecords={attendanceRecords}
            selectedMonth={selectedMonth}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceModule;
