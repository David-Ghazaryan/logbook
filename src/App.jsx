import { useState } from 'react';
import { AuthProvider, useAuth } from './login/AuthContext';
import LoginPage from './login/LoginPage';
import AdminDashboard from './login/AdminDashboard';
import AttendanceModule from './AttendanceModule';

const MainApp = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) return <LoginPage />;

  if (currentPage === 'journal') {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-10">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="mb-6 bg-white border text-[#448e78] border-[#448e78] px-6 py-2 hover:shadow-xl hover:-translate-y-0.5 hover:bg-[#448e78] hover:text-white cursor-pointer rounded-xl shadow-sm transition flex items-center gap-2 font-medium">
          <span>⬅</span> Back to panel
        </button>

        <AttendanceModule />
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
