const STATUS_DATA = {
  present: { icon: '✅', color: '#4caf50' },
  absent: { icon: '❌', color: '#f44336' },
  late: { icon: '⏰', color: '#ff9800' },
  excused: { icon: '🏥', color: '#2196f3' },
};
console.log('status', STATUS_DATA.present);

const AttendanceCheckbox = ({ status }) => (
  <td className={`p-5 text-center border-b border-r `}>
    {status ? STATUS_DATA[status]?.icon : '❌'}
  </td>
);

export default AttendanceCheckbox;
