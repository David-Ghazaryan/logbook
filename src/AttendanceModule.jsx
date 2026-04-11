import React, { useState, useEffect, useMemo } from 'react';
import AttendanceTable from './AttendanceTable';
import CircularProgress from '@mui/material/CircularProgress';
const BASE_URL = 'http://localhost:5005';

const AttendanceModule = () => {
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const weekDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    const mondayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay();
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + mondayOffset + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }, []);

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
  }, [students]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch(`${BASE_URL}/attendance`);
        if (!res.ok) throw new Error('Attendance API error');

        const data = await res.json();
        setAttendanceRecords(data);
      } catch (err) {
        console.error('Attendance fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const handleToggle = async (studentId, date, existingRecord) => {
    const newStatus = existingRecord ? !existingRecord.status : true;

    setAttendanceRecords((prev) => {
      if (existingRecord)
        return prev.map((r) => (r.id === existingRecord.id ? { ...r, status: newStatus } : r));
      return [...prev, { studentId, date, status: newStatus, id: 'temp' }];
    });

    try {
      const method = existingRecord ? 'PUT' : 'POST';
      const url = existingRecord
        ? `${BASE_URL}/attendance/${existingRecord.id}`
        : `${BASE_URL}/attendance`;

      const res = await fetch(url, {
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ studentId, date, status: newStatus }),
      });
      const data = await res.json();

      if (!existingRecord) {
        setAttendanceRecords((prev) => prev.map((r) => (r.id === 'temp' ? data : r)));
      }
    } catch (err) {
      alert(':');
      console.log(err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress size={75} color="success" />
      </div>
    );

  return (
    <div className=" -translate-x-7 max-w-5xl ">
      <div className="bg-[#448e78] p-6 text-center rounded-t-2xl  text-white text-2xl font-bold">
        Logbook
      </div>

      <AttendanceTable
        students={students}
        weekDates={weekDates}
        attendanceRecords={attendanceRecords}
        onToggle={handleToggle}
      />
    </div>
  );
};

export default AttendanceModule;
