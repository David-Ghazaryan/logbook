import { useState } from 'react';
import { AuthProvider, useAuth } from './login/AuthContext';
import LoginPage from './login/LoginPage';
import AdminDashboard from './login/AdminDashboard';
import AttendanceModule from './AttendanceModule';
import StudentsInfo from './StudentsInfo';
const MainApp = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) return <LoginPage />;

  if (currentPage === 'journal') {
    return (
      <div className="flex w-full  h-full bg-slate-50 p-5">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="-translate-x-26 w-16 h-10 mb-6 bg-white border  text-[#448e78] border-[#448e78] px-3 py-2 hover:shadow-xl hover:-translate-y-0.5 hover:bg-[#e9f0ee]  cursor-pointer rounded-xl shadow-sm transition flex items-center gap-2 font-medium">
          <span>Back</span> 
        </button>

        <AttendanceModule />
      </div>
    );
  }
  if (currentPage === 'info') {
    return (
      <div className="flex w-full  h-full bg-slate-50 p-5">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="-translate-x-26 w-16 h-10 mb-6 bg-white border  text-[#448e78] border-[#448e78] px-3 py-2 hover:shadow-xl hover:-translate-y-0.5 hover:bg-[#e9f0ee]  cursor-pointer rounded-xl shadow-sm transition flex items-center gap-2 font-medium">
          <span>Back</span> 
        </button>

        <StudentsInfo />
      </div>
    );
  }

  return <AdminDashboard onNavigate={setCurrentPage} />;
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
