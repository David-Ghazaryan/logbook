import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !pass) return;

    setLoading(true);
    const role = await login(userName, pass);
    setLoading(false);

    if (role === 'admin' || role === 'client') {
      navigate('/');
    } else {
      alert('Սխալ մուտքանուն կամ գաղտնաբառ:');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="flex flex-col items-center bg-white p-10 rounded-3xl shadow-2xl w-75 gap-4">
        <h1 className="text-2xl text-[#448e78] font-bold text-center tracking-tight">Մուտք</h1>

        <input
          required
          type="text"
          placeholder="Մուտքանուն"
          className="w-full border-2 border-[#448e78]/20 focus:border-[#448e78] rounded-2xl p-3 text-[#285447] outline-none transition-colors"
          onChange={(e) => setUserName(e.target.value)}
          disabled={loading}
        />

        <input
          required
          type="password"
          placeholder="Գաղտնաբառ"
          className="w-full border-2 border-[#448e78]/20 focus:border-[#448e78] rounded-2xl p-3 text-[#285447] outline-none transition-colors"
          onChange={(e) => setPass(e.target.value)}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#448e78] text-white p-3 rounded-2xl font-bold hover:bg-[#285447] transition-all cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed">
          {loading ? 'Ստուգվում է...' : 'Մուտք գործել'}
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
