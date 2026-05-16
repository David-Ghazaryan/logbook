import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from './login/AuthContext';
import { BASE_URL } from './config';

const GROUPS = [
  { id: 1, label: 'Խումբ 1' },
  { id: 2, label: 'Խումբ 2' },
  { id: 3, label: 'Խումբ 3' },
  { id: 4, label: 'Խումբ 4' },
];

const StudentsTable = ({ students, setStudents, attendance }) => {
  const { user } = useAuth();
  const groupStyle = 'bg-white p-2 rounded-lg border border-black text-black shadow-sm';
  const getAttendanceCount = (studentId, statusType) => {
    if (!attendance) return 0;
    return attendance.filter(
      (record) => record.student_id === studentId && record.status === statusType,
    ).length;
  };

  const [newStudent, setNewStudent] = useState({
    id: '',
    full_name: '',
    phone: '',
    parent_phone: '',
    birthday: '',
    admission_day: '',
    email: '',
    group_id: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: name === 'group_id' || name === 'id' ? parseInt(value) || '' : value,
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
          id: '',
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
    if (user?.role !== 'admin') {
      alert('Դուք չունեք թույլտվություն:');
      return;
    }

    const confirmDelete = window.confirm(
      'Վստա՞հ եք, որ ուզում եք արխիվացնել և ջնջել այս ուսանողին:',
    );
    if (!confirmDelete) return;

    const studentToArchive = students.find((s) => s.id === id);

    try {
      const archiveRes = await fetch(`${BASE_URL}/archive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...studentToArchive,
          deletedAt: new Date().toISOString(),
        }),
      });

      if (archiveRes.ok) {
        const deleteRes = await fetch(`${BASE_URL}/students/${id}`, {
          method: 'DELETE',
        });

        if (deleteRes.ok) {
          setStudents((prev) => prev.filter((s) => s.id !== id));
          alert('Ուսանողը տեղափոխվեց արխիվ:');
        }
      } else {
        alert('Արխիվացման սխալ տեղի ունեցավ:');
      }
    } catch (err) {
      console.error('Error during archiving:', err);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  if (!students) return <div className="p-10 text-center text-slate-500">Loading...</div>;

  return (
    <div className="w-full flex flex-col gap-6 bg-white">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-max border-collapse text-left text-sm text-slate-600">
          <thead>
            <tr className="bg-slate-100 text-slate-600 font-semibold border-b">
              <th className="p-3 border w-10 text-center">ID</th>
              <th className="p-3 border w-50 ">Անուն Ազգանուն</th>
              <th className="p-3 border w-10 text-center">Խումբ</th>
              <th className="p-3 border text-center">Հեռախոս</th>
              <th className="p-3 border text-center">Ծնողի հեռախոս</th>
              <th className="px-6 border text-center">Ծննդյան օր</th>
              <th className="p-3 border text-center">Ընդունման օր</th>
              <th className="p-3 border text-center">Email</th>
              <th className="p-3 border border-black text-center bg-red-50  text-red-600">❌ </th>
              <th className="p-3 border border-black text-center bg-orange-50 text-orange-600">
                ⏰
              </th>
              <th className="p-3 border border-black text-center bg-blue-50 text-blue-600">🏥 </th>
              <th className="p-3 text-center">Ջնջել</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.length === 0 ? (
              <tr>
                <td colSpan="12" className="p-10 text-center text-slate-400 italic bg-slate-50">
                  Ուսանողներ չեն գտնվել:
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 border font-medium text-slate-800 text-center">
                    {student.id}
                  </td>
                  <td className="p-3 border font-medium text-slate-900">{student.full_name}</td>
                  <td className="p-3 border font-bold text-center">{student.group_id}</td>
                  <td className="p-3 border text-center">{student.phone}</td>
                  <td className="p-3 border text-center">{student.parent_phone}</td>
                  <td className="p-3 border text-center">{formatDate(student.birthday)}</td>
                  <td className="p-3 border text-center">{student.admission_day}</td>
                  <td className="p-3 border text-center">{student.email}</td>
                  <td className="p-3 border border-black text-center font-bold text-red-600 ">
                    {getAttendanceCount(student.id, 'absent')}
                  </td>
                  <td className="p-3 border border-black text-center font-bold text-orange-600 ">
                    {getAttendanceCount(student.id, 'late')}
                  </td>
                  <td className="p-3 border border-black text-center font-bold text-blue-600 ">
                    {getAttendanceCount(student.id, 'excused')}
                  </td>
                  <td className="p-3 text-center border border-black">
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-red-500 hover:text-red-700 hover:scale-110 transition-transform cursor-pointer">
                      <DeleteIcon fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4  gap-4 text-xs md:text-sm text-center">
        <div className={`${groupStyle}`}>
          Խումբ 1:{' '}
          <span className="font-bold text-[#448e78]">
            {students.filter((s) => s.group_id === 1).length}
          </span>{' '}
          հոգի
        </div>
        <div className={`${groupStyle}`}>
          Խումբ 2:{' '}
          <span className="font-bold text-[#448e78]">
            {students.filter((s) => s.group_id === 2).length}
          </span>{' '}
          հոգի
        </div>
        <div className={`${groupStyle}`}>
          Խումբ 3:{' '}
          <span className="font-bold text-[#448e78]">
            {students.filter((s) => s.group_id === 3).length}
          </span>{' '}
          հոգի
        </div>
        <div className={`${groupStyle}`}>
          Խումբ 4:{' '}
          <span className="font-bold text-[#448e78]">
            {students.filter((s) => s.group_id === 4).length}
          </span>{' '}
          հոգի
        </div>
      </div>
      <div className="p-3 text-center text-slate-800 text-base font-bold">
        Ընդհանուր այս ցուցակում: {students.length} հոգի
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full border rounded-2xl p-4 md:p-6 bg-slate-50 shadow-sm mt-4">
        <h3 className="text-slate-800 font-bold text-lg mb-4">Ավելացնել նոր ուսանող</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 pl-1">ID (1-127)</span>
            <input
              required
              type="number"
              name="id"
              min="1"
              max="127"
              value={newStudent.id}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full text-slate-800 bg-white outline-none focus:border-[#448e78]"
              placeholder="ID"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 pl-1">Անուն Ազգանուն</span>
            <input
              required
              type="text"
              name="full_name"
              value={newStudent.full_name}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full text-slate-800 bg-white outline-none focus:border-[#448e78]"
              placeholder="Անուն Ազգանուն"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 pl-1">Ընտրել Խումբը</span>
            <select
              name="group_id"
              value={newStudent.group_id}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full text-slate-800 bg-white outline-none focus:border-[#448e78]">
              {GROUPS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 pl-1">Հեռախոսահամար</span>
            <input
              required
              type="text"
              name="phone"
              value={newStudent.phone}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full text-slate-800 bg-white outline-none focus:border-[#448e78]"
              placeholder="Հեռախոս"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 pl-1">Ծնողի Հեռախոս</span>
            <input
              required
              type="text"
              name="parent_phone"
              value={newStudent.parent_phone}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full text-slate-800 bg-white outline-none focus:border-[#448e78]"
              placeholder="Ծնողի հեռախոս"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 pl-1">Ծննդյան Օր</span>
            <input
              required
              type="date"
              name="birthday"
              value={newStudent.birthday}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full text-slate-800 bg-white outline-none focus:border-[#448e78]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 pl-1">Ընդունման Օր</span>
            <input
              required
              type="date"
              name="admission_day"
              value={newStudent.admission_day}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full text-slate-800 bg-white outline-none focus:border-[#448e78]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 pl-1">Էլ. Փոստ</span>
            <input
              required
              type="email"
              name="email"
              value={newStudent.email}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full text-slate-800 bg-white outline-none focus:border-[#448e78]"
              placeholder="Email"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 w-full sm:w-auto bg-[#448e78] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#356e5d] transition-colors shadow-sm cursor-pointer">
          Ավելացնել Ուսանողին
        </button>
      </form>
    </div>
  );
};

export default StudentsTable;
