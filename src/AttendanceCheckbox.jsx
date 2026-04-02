const AttendanceCheckbox = ({ isPresent, onToggle }) => (
  <td className="p-5 text-center border-b border-r ">
    <input
      type="checkbox"
      checked={isPresent}
      onChange={onToggle}
      className="w-10 h-10 rounded-md border-4 border-red accent-[#448e78] cursor-pointer"
    />
  </td>
);

export default AttendanceCheckbox;
