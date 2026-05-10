import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center px-10">
        <span className="font-bold text-[#448e78] text-xl">User Panel</span>
        <button onClick={logout} className="text-red-500 font-bold hover:underline">
          Exit
        </button>
      </nav>

      <div className="p-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Welcome, ReRo</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <button
            onClick={() => navigate('/journal')}
            className="bg-white  p-8 rounded-3xl cursor-pointer shadow-lg border border-[#448e78] hover:shadow-2xl transition-all text-left ">
            <h3 className="text-xl font-bold text-[#448e78] transition">Logbook</h3>
            <h6 className="text-slate-500 mt-2 text-sm">Do present-absent։</h6>
          </button>

          <button
            onClick={() => navigate('/info')}
            className="bg-white  p-8 rounded-3xl cursor-pointer shadow-lg border border-[#448e78] hover:shadow-2xl transition-all text-left ">
            <div className="flex flex-col ">
              <h3 className="text-xl font-bold text-[#448e78]">All Students</h3>
              <h6 className="text-slate-500 mt-2 text-sm">Students info:</h6>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
