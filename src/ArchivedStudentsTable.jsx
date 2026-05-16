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
    <div className="overflow-x-auto w-full border border-slate-200 bg-white rounded-b-xl shadow-sm">
      <table className="w-full min-w-max border-collapse text-left text-sm text-slate-600">
        <thead>
          <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
            <th className="p-3 border-r border-slate-200 text-center w-16">ID</th>
            <th className="p-3 border-r border-slate-200">Անուն Ազգանուն</th>
            <th className="p-3 border-r border-slate-200 text-center">Խումբ</th>
            <th className="p-3 border-r border-slate-200 text-center">Հեռախոս</th>
            <th className="p-3 border-r border-slate-200 text-center">Ծնողի հեռախոս</th>
            <th className="p-3 border-r border-slate-200 text-center">Ծննդյան օր</th>
            <th className="p-3 border-r border-slate-200 text-center">Email</th>
            <th className="p-bg-red-50 text-red-600 font-bold text-center">📅 Ջնջման օր</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {students.length === 0 ? (
            <tr>
              <td colSpan="8" className="p-10 text-center text-slate-400 italic bg-slate-50">
                Արխիվը դատարկ է:
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr
                key={student.id || student.stud_id}
                className="hover:bg-slate-50 transition-colors">
                <td className="p-3 border-r border-slate-100 text-center font-mono text-xs text-slate-500 bg-slate-50/50">
                  {student.stud_id}
                </td>
                <td className="p-3 border-r border-slate-100 font-medium text-slate-900">
                  {student.full_name}
                </td>
                <td className="p-3 border-r border-slate-100 text-center font-bold text-slate-700">
                  {student.group_id}
                </td>
                <td className="p-3 border-r border-slate-100 text-center">{student.phone}</td>
                <td className="p-3 border-r border-slate-100 text-center">
                  {student.parent_phone}
                </td>
                <td className="p-3 border-r border-slate-100 text-center">
                  {formatDate(student.birthday)}
                </td>
                <td className="p-3 border-r border-slate-100 text-slate-500 text-center">
                  {student.email}
                </td>
                <td className="p-3 font-medium text-red-600 bg-red-50/20 text-center">
                  {formatDate(student.archived_at || student.deletedAt)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ArchivedStudentsTable;
