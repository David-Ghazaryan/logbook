import StudentRow from './StudentRow';

const AttendanceTable = ({ students, attendanceRecords, selectedMonth }) => {
  const getSpecificDaysForMonth = (year, month) => {
    const targetDays = [];
    const date = new Date(year, month - 1, 1);

    while (date.getMonth() === month - 1) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        targetDays.push(`${y}-${m}-${d}`);
      }
      date.setDate(date.getDate() + 1);
    }
    return targetDays;
  };

  const monthDates = getSpecificDaysForMonth(2026, selectedMonth);

  if (!students || students.length === 0) {
    return <div className="p-10 text-center text-slate-500 bg-white">Տվյալներ չկան:</div>;
  }

  return (
    <div className="overflow-x-auto border shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 text-slate-600 text-[10px] tracking-wider">
            <th className="p-3 text-sm sticky left-0 bg-slate-50 z-10 border-b border-r text-center">
              ID
            </th>
            <th className="p-5 text-sm sticky left-12 bg-slate-50 z-10 min-w-52 border-b border-r">
              Անուն Ազգանուն
            </th>

            {monthDates.map((date) => {
              const d = new Date(date);
              const day = String(d.getDate()).padStart(2, '0');
              const month = String(d.getMonth() + 1).padStart(2, '0');
              const dayOfWeek = d.getDay();

              let dayName = '';
              if (dayOfWeek === 2) dayName = 'Երեքշաբթի';
              else if (dayOfWeek === 4) dayName = 'Հինգշաբթի';
              else if (dayOfWeek === 6) dayName = 'Շաբաթ';

              return (
                <th key={date} className="p-4 text-center min-w-20 border-b border-l">
                  <span className="block font-bold text-sm text-slate-800">{`${day}.${month}`}</span>
                  <span className="text-[10px] font-medium opacity-70">{dayName}</span>
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
