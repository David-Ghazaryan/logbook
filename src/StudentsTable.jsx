import DeleteIcon from '@mui/icons-material/Delete';

const BASE_URL = 'http://localhost:5005';

const StudentsTable = ({ students, setStudents }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Վստա՞հ ես ուզում ես ջնջել այս ուսանողին');

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${BASE_URL}/students/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert('Չհաջողվեց ջնջել');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  if (!students) {
    return <div className="p-10 text-center text-slate-500">Loading...</div>;
  }
  if (students.length == 0) {
    return <div className="p-10 text-center text-slate-500">The table is empty.</div>;
  }

  return (
    <div className="overflow-x-auto border  shadow-sm">
      <table className="w-full border border-collapse ">
        <thead>
          <tr className="bg-slate-50 text-slate-600 text-sm">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Անուն Ազգանուն</th>
            <th className="p-3 border">Հեռախոս</th>
            <th className="p-3 border">Ծնողի հեռախոս</th>
            <th className="p-3 border">Ծննդյան օր</th>
            <th className="p-3 border">Ընդունման օր</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border ">
              <p className="text-red-600">Ջնջել</p>
            </th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id} className=" text-slate-600">
              <td className="p-3 border">{student.id}</td>
              <td className="p-3 border text-start">{student.full_name}</td>
              <td className="p-3 border">{student.phone}</td>
              <td className="py-3 px-1 border">{student.parent_phone}</td>
              <td className="p-3 border">{formatDate(student.birthday)}</td>
              <td className="p-3 border">{student.admission_day}</td>
              <td className="p-3 border">{student.email}</td>
              <td className="p-3 border text-center">
                <button
                  onClick={() => handleDelete(student.id)}
                  className="cursor-pointer text-red-500 hover:text-red-600 hover:scale-110">
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-bold text-center">
            <td colSpan="8" className="p-3 border text-black">
              Ընդհանուր քանակը: {students.length}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default StudentsTable;
