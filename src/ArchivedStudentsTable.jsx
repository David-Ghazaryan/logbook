const ArchivedStudentsTable = ({ students }) => {
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  if (!students || students.length === 0) {
    return <div className="p-10 text-center text-slate-500 font-medium">Արխիվը դատարկ է:</div>;
  }

  return (
    <div className="overflow-x-auto border border-black bg-white rounded-b-xl shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-100 text-slate-600 text-sm">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Անուն Ազգանուն</th>
            <th className="p-3 border">Խումբ</th>
            <th className="p-3 border">Հեռախոս</th>
            <th className="p-3 border">Ծնողի հեռախոս</th>
            <th className="p-3 border">Ծննդյան օր</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border ">Ջնջման օր</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="text-slate-600 hover:bg-slate-50 transition-colors">
              <td className="p-3 border text-center font-mono text-xs">{student.stud_id}</td>
              <td className="p-3 border text-start font-medium text-slate-800">
                {student.full_name}
              </td>
              <td className="p-3 border text-center font-bold">{student.group_id}</td>
              <td className="p-3 border">{student.phone}</td>
              <td className="p-3 border">{student.parent_phone}</td>
              <td className="p-3 border">{formatDate(student.birthday)}</td>
              <td className="p-3 border text-sm  text-slate-500">{student.email}</td>
              <td className="p-3 border text-center  text-slate-400">
                {formatDate(student.archived_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArchivedStudentsTable;
