import AttendanceCheckbox from './AttendanceCheckbox';

const StudentRow = ({ student, weekDates, attendanceRecords, onToggle }) => {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="p-5 border-b sticky -left-0.5 w-12 font-semibold text-slate-700 bg-white z-10 whitespace-nowrap shadow-[inset_-1px_0_0_0_#000000]">
        {student.id}
      </td>

      <td className="p-5 border-b sticky left-12.5 min-w-52 font-semibold text-slate-700 bg-white z-9 whitespace-nowrap shadow-[inset_-1px_0_0_0_#000000]">
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
