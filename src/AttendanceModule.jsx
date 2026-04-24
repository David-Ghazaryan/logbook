import React, { useState, useEffect, useMemo } from 'react';
import AttendanceTable from './AttendanceTable';
import CircularProgress from '@mui/material/CircularProgress';

const BASE_URL = 'http://localhost:5005';

const STATUS_DATA = {
  present: { label: 'Ներկա', icon: '✅', color: '#4caf50' },
  absent: { label: 'Բացակա', icon: '❌', color: '#f44336' },
  late: { label: 'Ուշացած', icon: '⏰', color: '#ff9800' },
  excused: { label: 'Հարգելի', icon: '🏥', color: '#2196f3' },
};
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
          console.log('attendance', data);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    };

    fetchAttendance();

    const interval = setInterval(fetchAttendance, 10000);

    return () => clearInterval(interval);
  }, []);

  // const handleToggle = async (studentId, date, existingRecord) => {
  //   const currentStatus = existingRecord?.status || 'absent';
  //   const newStatus = NEXT_STATUS[currentStatus] || 'present';

  //   // 1. ԼՈԿԱԼ ԹԱՐՄԱՑՈՒՄ (Optimistic UI)
  //   // Օգտագործում ենք ֆունկցիոնալ թարմացում, որպեսզի սխալ չլինի
  //   setAttendanceRecords((prev) => {
  //     const formattedDate = new Date(date).toISOString().split('T')[0];

  //     const isExisting = prev.some(
  //       (r) =>
  //         r.student_id === studentId &&
  //         new Date(r.date).toISOString().split('T')[0] === formattedDate,
  //     );

  //     if (isExisting) {
  //       return prev.map((r) =>
  //         r.student_id === studentId &&
  //         new Date(r.date).toISOString().split('T')[0] === formattedDate
  //           ? { ...r, status: newStatus }
  //           : r,
  //       );
  //     }
  //     return [...prev, { student_id: studentId, date, status: newStatus }];
  //   });

  //   // 2. ՈՒՂԱՐԿՈՒՄ ԵՆՔ ԲԵՔԵՆԴ
  //   try {
  //     const res = await fetch(`${BASE_URL}/attendance`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         student_id: studentId,
  //         date: date,
  //         status: newStatus,
  //       }),
  //     });

  //     if (!res.ok) throw new Error('Server error');
  //     const savedRecord = await res.json();

  //     // 3. Թարմացնում ենք սթեյթը բազայից եկած վերջնական ID-ով
  //     setAttendanceRecords((prev) =>
  //       prev.map((r) =>
  //         r.student_id === studentId &&
  //         new Date(r.date).toDateString() === new Date(date).toDateString()
  //           ? savedRecord
  //           : r,
  //       ),
  //     );
  //   } catch (err) {
  //     console.error('Error saving:', err);
  //     alert('Չհաջողվեց պահպանել');
  //   }
  // };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress size={75} color="success" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="bg-[#448e78] p-6 text-center rounded-t-2xl text-white text-2xl font-bold">
        Logbook
      </div>
      <AttendanceTable
        students={students}
        weekDates={weekDates}
        attendanceRecords={attendanceRecords}
        // onToggle={handleToggle}
      />
    </div>
  );
};

export default AttendanceModule;
