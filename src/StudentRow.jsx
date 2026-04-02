import AttendanceCheckbox from './AttendanceCheckbox';

const StudentRow = ({ student, weekDates, attendanceRecords, onToggle }) => {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="p-5 border-b border-r  font-semibold text-slate-700 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] whitespace-nowrap">
        {student.full_name}
      </td>
      {weekDates.map((date) => {
        const record = attendanceRecords.find((r) => r.studentId === student.id && r.date === date);
        const isPresent = record ? record.status : false;

        return (
          <AttendanceCheckbox
            key={date}
            isPresent={isPresent}
            onToggle={() => onToggle(student.id, date, record)}
          />
        );
      })}
    </tr>
  );
};

export default StudentRow;
