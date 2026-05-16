import React from 'react';
import StudentRow from './StudentRow';

const DAYS_OF_WEEK = ['Կիր', 'Երկ', 'Երք', 'Չոր', 'Հնգ', 'Ուրբ', 'Շաբ'];

const AttendanceTable = ({ students, attendanceRecords, selectedMonth }) => {
  const getAllDaysInMonth = (year, month) => {
    const days = [];
    const date = new Date(year, month - 1, 1);

    while (date.getMonth() === month - 1) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      days.push(`${y}-${m}-${d}`);
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const monthDates = getAllDaysInMonth(2026, selectedMonth);

  if (!students || students.length === 0) {
    return (
      <div className="p-10 text-center text-slate-500 bg-white border">
        Այս խմբում ուսանողներ չկան:
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-white">
      <table className="w-full min-w-max text-left border-collapse">
        <thead>
          <tr className="bg-slate-100 text-slate-600 text-[10px] tracking-wider">
            <th className="p-3 text-xs md:text-sm md:sticky md:left-0 bg-slate-100 z-20 border-b border-r text-center min-w-12">
              ID
            </th>
            <th className="p-4 text-xs md:text-sm  bg-slate-100 z-20 min-w-45 md:min-w-52 border-b border-r md:sticky md:left-12">
              Անուն Ազգանուն
            </th>

            {monthDates.map((date) => {
              const d = new Date(date);
              const dayNum = String(d.getDate()).padStart(2, '0');
              const monthNum = String(d.getMonth() + 1).padStart(2, '0');
              const dayOfWeek = d.getDay();

              return (
                <th key={date} className="p-2 text-center min-w-15 md:min-w-16 border-b border-l">
                  <span className="block font-bold text-xs md:text-sm text-slate-800">{`${dayNum}.${monthNum}`}</span>
                  <span className="text-[9px] md:text-[10px] font-medium opacity-70">
                    {DAYS_OF_WEEK[dayOfWeek]}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              weekDates={monthDates}
              attendanceRecords={attendanceRecords}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
