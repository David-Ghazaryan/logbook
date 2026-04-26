import { useState } from 'react';

const AddStudent = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    parent_phone: '',
    birthday: '',
    admission_day: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === 'phone' || name === 'parent_phone') && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onAdd) {
      onAdd(formData);
    }

    setFormData({
      full_name: '',
      phone: '',
      parent_phone: '',
      birthday: '',
      admission_day: '',
      email: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 w-full border-2 border-black p-4">
      {/* Table Headers */}
      <div className="grid grid-cols-6 gap-3 border-b pb-2 font-semibold text-sm">
        <div>Անուն Ազգանուն</div>
        <div>Հեռախոս</div>
        <div>Ծնողի հեռախոս</div>
        <div>Ծննդյան օր</div>
        <div>Ընդունման օր</div>
        <div>Email</div>
      </div>

      {/* Input Row */}
      <div className="grid grid-cols-6 gap-3 mt-3">
        <input
          name="full_name"
          placeholder="Անուն Ազգանուն"
          value={formData.full_name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="phone"
          placeholder="094..."
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="parent_phone"
          placeholder="098..."
          value={formData.parent_phone}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="admission_day"
          value={formData.admission_day}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="example@mail.com"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors">
        Ավելացնել
      </button>
    </form>
  );
};

export default AddStudent;
