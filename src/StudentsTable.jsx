import { useState } from 'react'; // Added useState
import DeleteIcon from '@mui/icons-material/Delete';

const BASE_URL = 'http://localhost:5005';

const StudentsTable = ({ students, setStudents }) => {
  // 1. State for the new student form
  const [newStudent, setNewStudent] = useState({
    full_name: '',
    phone: '',
    parent_phone: '',
    birthday: '',
    admission_day: '',
    email: '',
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 2. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (res.ok) {
        const addedStudent = await res.json();
        // Update local state to show the new student immediately
        setStudents((prev) => [...prev, addedStudent]);
        // Reset form
        setNewStudent({
          full_name: '',
          phone: '',
          parent_phone: '',
          birthday: '',
          admission_day: '',
          email: '',
        });
      } else {
        alert('Չհաջողվեց ավելացնել ուսանողին');
      }
    } catch (err) {
      console.error('Error adding student:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Վստա՞հ ես ուզում ես ջնջել այս ուսանողին');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${BASE_URL}/students/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
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
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  if (!students) {
    return <div className="p-10 text-center text-slate-500">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border border-collapse">
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
          {students.length === 0 ? (
            <tr>
              <td colSpan="8" className="p-10 text-center text-slate-500">
                The table is empty.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id} className="text-slate-600 hover:bg-slate-50">
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
            ))
          )}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-bold text-center">
            <td colSpan="8" className="p-3 border text-black">
              Ընդհանուր քանակը: {students.length}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* --- ADD STUDENT FORM --- */}
      <form
        onSubmit={handleSubmit}
        className="mt-5 w-full border-2 border-black p-4 bg-white shadow-md">
        <h3 className="text-black font-bold mb-3">Ավելացնել նոր ուսանող</h3>
        <div className="text-black grid grid-cols-6 gap-3 border-b pb-2 font-semibold text-sm">
          <div>Անուն Ազգանուն</div>
          <div>Հեռախոս</div>
          <div>Ծնողի հեռախոս</div>
          <div>Ծննդյան օր</div>
          <div>Ընդունման օր</div>
          <div>Email</div>
        </div>

        <div className="grid grid-cols-6 gap-3 mt-3">
          <input
            required
            type="text"
            name="full_name"
            value={newStudent.full_name}
            onChange={handleChange}
            className="border text-black border-black p-2 w-full"
          />
          <input
            required
            type="text"
            name="phone"
            value={newStudent.phone}
            onChange={handleChange}
            className="border text-black border-black p-2 w-full"
          />
          <input
            required
            type="text"
            name="parent_phone"
            value={newStudent.parent_phone}
            onChange={handleChange}
            className="border text-black border-black p-2 w-full"
          />
          <input
            required
            type="date"
            name="birthday"
            value={newStudent.birthday}
            onChange={handleChange}
            className="border text-black border-black p-2 w-full"
          />
          <input
            required
            type="date"
            name="admission_day"
            value={newStudent.admission_day}
            onChange={handleChange}
            className="border text-black border-black p-2 w-full"
          />
          <input
            required
            type="email"
            name="email"
            value={newStudent.email}
            onChange={handleChange}
            className="border text-black border-black p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 transition-colors">
          Ավելացնել
        </button>
      </form>
    </div>
  );
};

export default StudentsTable;
