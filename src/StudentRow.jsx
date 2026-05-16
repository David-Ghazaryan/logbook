import AttendanceCheckbox from './AttendanceCheckbox';

const StudentRow = ({ student, weekDates, attendanceRecords }) => {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="p-4 border-b md:sticky md:-left-0.5  font-semibold text-slate-700 bg-white z-10 whitespace-nowrap shadow-[inset_-1px_0_0_0_#000000]">
        {student.id}
      </td>

      <td className="p-2 border-b md:sticky md:left-12.5 min-w-48 font-semibold text-slate-700 bg-white z-9 whitespace-nowrap shadow-[inset_-1px_0_0_0_#000000]">
        {student.full_name}
      </td>
      {weekDates.map((date) => {
        return (
          <AttendanceCheckbox
            id={student.id}
            date={date}
            key={date}
            attendanceRecords={attendanceRecords}
          />
        );
      })}
    </tr>
  );
};

export default StudentRow;
