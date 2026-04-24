const STATUS_DATA = {
  present: { icon: '✅', color: '#afe1b0' },
  absent: { icon: '❌', color: '#ffb2ac' },
  late: { icon: '⏰', color: '#ff980020' },
  excused: { icon: '🏥', color: '#2196f320' },
};

const AttendanceCheckbox = ({ id, date, attendanceRecords }) => {
  const record = attendanceRecords.find(
    (r) => r.student_id === id && new Date(r.date).toDateString() === new Date(date).toDateString(),
  );

  const status = record?.status?.toLowerCase().trim();
  const color = STATUS_DATA[status]?.color || '';
  return (
    <td className="p-5 text-center border-b border-r" style={{ backgroundColor: color }}>
      {STATUS_DATA[status]?.icon || ''}
    </td>
  );
};

export default AttendanceCheckbox;
