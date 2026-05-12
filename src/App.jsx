import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './login/AuthContext';
import LoginPage from './login/LoginPage';
import AdminDashboard from './login/AdminDashboard';
import ClientDashboard from './login/ClientDashboard';
import AttendanceModule from './AttendanceModule';
import StudentsInfo from './StudentsInfo';
import ArchivedStudents from './ArchivedStudents';

const MainApp = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user?.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />} />

      <Route path="/journal" element={<AttendanceModule />} />
      <Route path="/info" element={<StudentsInfo />} />
      <Route path="/archive" element={<ArchivedStudents />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
