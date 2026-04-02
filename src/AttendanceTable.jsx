import StudentRow from './StudentRow';

const AttendanceTable = ({ students, attendanceRecords, onToggle }) => {
  const getSpecificMonthsWeekends = (year, months) => {
    const weekends = [];
    months.forEach(month => {
      const date = new Date(year, month - 1, 1);
      
      while (date.getMonth() === month - 1) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) { 
          const y = date.getFullYear();
          const m = String(date.getMonth() + 1).padStart(2, '0');
          const d = String(date.getDate()).padStart(2, '0');
          weekends.push(`${y}-${m}-${d}`);
        }
        date.setDate(date.getDate() + 1);
      }
    });
    return weekends;
  };

  const allWeekends = getSpecificMonthsWeekends(2026, [4, 5]);

  if (!students ) {
    return <div className="p-10 text-center text-slate-500">Loading...</div>;
  }
  if (students.length == 0) {
    return <div className="p-10 text-center text-slate-500">The table is empty.</div>;
  }

  return (
    <div className="overflow-x-auto border  shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider">
            <th className="p-5 sticky left-0 bg-slate-50 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] min-w-45 border-b">
              Students
            </th>
            {allWeekends.map(date => {
              const d = new Date(date);
              const day = String(d.getDate()).padStart(2, '0');
              const month = String(d.getMonth() + 1).padStart(2, '0');
              
              const dayName = d.getDay() === 0 ? 'Կիրակի' : 'Շաբաթ';
              const isSunday = d.getDay() === 0;

              return (
                <th key={date} className={`p-4 text-center min-w-20 border-b border-l ${isSunday ? 'bg-red-50/20' : ''}`}>
                  <span className={`block font-bold text-sm ${isSunday ? 'text-red-500' : 'text-slate-800'}`}>
                    {`${day}.${month}`}
                  </span>
                  <span className="text-[10px] font-medium opacity-70">
                    {dayName}
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
              weekDates={allWeekends}
              attendanceRecords={attendanceRecords}
              onToggle={onToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;