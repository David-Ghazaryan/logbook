import React, { useState, useEffect } from 'react';
import AttendanceTable from './AttendanceTable';
import CircularProgress from '@mui/material/CircularProgress';

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

const AttendanceModule = () => {
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

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

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress size={75} color="success" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="bg-[#448e78] p-6 rounded-t-2xl text-white flex justify-between items-center">
        <span className="text-2xl font-bold">Logbook</span>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="bg-white text-slate-800 px-5 py-2 rounded-lg  font-medium outline-none border-none shadow-md">
          {MONTHS.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label} 2026
            </option>
          ))}
        </select>
      </div>

      <AttendanceTable
        students={students}
        attendanceRecords={attendanceRecords}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default AttendanceModule;
