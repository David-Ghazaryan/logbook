import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const BASE_URL = 'http://localhost:5005';

const GROUPS = [
  { id: 1, label: 'Խումբ 1' },
  { id: 2, label: 'Խումբ 2' },
  { id: 3, label: 'Խումբ 3' },
  { id: 4, label: 'Խումբ 4' },
];

const StudentsTable = ({ students, setStudents }) => {
  const [filterGroup, setFilterGroup] = useState('all');

  const [newStudent, setNewStudent] = useState({
    full_name: '',
    phone: '',
    parent_phone: '',
    birthday: '',
    admission_day: '',
    email: '',
    group_id: 1,
  });

  // Ֆիլտրման տրամաբանությունը
  const filteredStudents =
    filterGroup === 'all' ? students : students.filter((s) => s.group_id === parseInt(filterGroup));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: name === 'group_id' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });

      if (res.ok) {
        const addedStudent = await res.json();
        setStudents((prev) => [...prev, addedStudent]);
        setNewStudent({
          full_name: '',
          phone: '',
          parent_phone: '',
          birthday: '',
          admission_day: '',
          email: '',
          group_id: 1,
        });
      }
    } catch (err) {
      console.error('Error adding student:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Վստա՞հ եք որ ուզում եք ջնջել այս ուսանողին');
    if (!confirmDelete) return;
    try {
      const res = await fetch(`${BASE_URL}/students/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s.id !== id));
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

  if (!students) return <div className="p-10 text-center text-slate-500">Loading...</div>;

  return (
    <div className="overflow-x-auto p-4">
      <div className="mb-4 flex items-center gap-3 bg-slate-100 p-3 rounded-lg border border-black w-fit">
        <span className="font-bold text-slate-700">Ֆիլտրել ըստ խմբի:</span>
        <select
          className="p-2 border border-black rounded-md outline-none bg-white font-medium"
          value={filterGroup}
          onChange={(e) => setFilterGroup(e.target.value)}>
          <option value="all" className="text-black">
            Բոլորը
          </option>
          {GROUPS.map((g) => (
            <option className="text-black" key={g.id} value={g.id}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-slate-50 text-slate-600 text-sm">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Անուն Ազգանուն</th>
            <th className="p-3 border">Խումբ</th>
            <th className="p-3 border">Հեռախոս</th>
            <th className="p-3 border">Ծնողի հեռախոս</th>
            <th className="p-3 border">Ծննդյան օր</th>
            <th className="p-3 border">Ընդունման օր</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border text-red-600">Ջնջել</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan="9" className="p-10 text-center text-slate-500 italic">
                Այս խմբում ուսանողներ չկան:
              </td>
            </tr>
          ) : (
            filteredStudents.map((student) => (
              <tr key={student.id} className="text-slate-600 hover:bg-slate-50">
                <td className="p-3 border">{student.id}</td>
                <td className="p-3 border text-start">{student.full_name}</td>
                <td className="p-3 border text-center font-bold">{student.group_id}</td>
                <td className="p-3 border">{student.phone}</td>
                <td className="py-3 px-1 border">{student.parent_phone}</td>
                <td className="p-3 border">{formatDate(student.birthday)}</td>
                <td className="p-3 border">{student.admission_day}</td>
                <td className="p-3 border">{student.email}</td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-500 hover:scale-110">
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>

        <tfoot className="bg-gray-100 border border-black font-bold text-center">
          <tr className="text-black border-t-2 border-b-2 border-black">
            <td colSpan="9" className="p-3">
              <div className="grid grid-cols-4 gap-2 text-sm">
                <div className="border-r">
                  Խումբ 1: {students.filter((s) => s.group_id === 1).length} հոգի
                </div>
                <div className="border-r">
                  Խումբ 2: {students.filter((s) => s.group_id === 2).length} հոգի
                </div>
                <div className="border-r">
                  Խումբ 3: {students.filter((s) => s.group_id === 3).length} հոգի
                </div>
                <div>Խումբ 4: {students.filter((s) => s.group_id === 4).length} հոգի</div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="9" className="p-3 text-black text-base">
              Ընդհանուր: {students.length} հոգի{' '}
              {filterGroup !== 'all' && `(Ֆիլտրված: ${filteredStudents.length})`}
            </td>
          </tr>
        </tfoot>
      </table>

      <form
        onSubmit={handleSubmit}
        className="mt-5 w-full border-2 border-black p-4 bg-white shadow-md">
        <h3 className="text-black font-bold mb-3">Ավելացնել նոր ուսանող</h3>
        <div className="grid grid-cols-7 gap-3 mt-3">
          <input
            required
            type="text"
            name="full_name"
            value={newStudent.full_name}
            onChange={handleChange}
            className="border border-black p-2 w-full text-black"
            placeholder="Անուն Ազգանուն"
          />
          <select
            name="group_id"
            value={newStudent.group_id}
            onChange={handleChange}
            className="border border-black p-2 w-full text-black">
            {GROUPS.map((g) => (
              <option key={g.id} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>
          <input
            required
            type="text"
            name="phone"
            value={newStudent.phone}
            onChange={handleChange}
            className="border border-black p-2 w-full text-black"
            placeholder="Հեռախոս"
          />
          <input
            required
            type="text"
            name="parent_phone"
            value={newStudent.parent_phone}
            onChange={handleChange}
            className="border border-black p-2 w-full text-black"
            placeholder="Ծնողի հեռախոս"
          />
          <input
            required
            type="date"
            name="birthday"
            value={newStudent.birthday}
            onChange={handleChange}
            className="border border-black p-2 w-full text-black"
          />
          <input
            required
            type="date"
            name="admission_day"
            value={newStudent.admission_day}
            onChange={handleChange}
            className="border border-black p-2 w-full text-black"
          />
          <input
            required
            type="email"
            name="email"
            value={newStudent.email}
            onChange={handleChange}
            className="border border-black p-2 w-full text-black"
            placeholder="Email"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-[#448e78] text-white px-6 py-2 rounded font-bold hover:bg-green-700 transition-colors">
          Ավելացնել
        </button>
      </form>
    </div>
  );
};

export default StudentsTable;
