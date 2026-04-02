import { useState } from 'react';
import { useAuth } from './AuthContext';

const LoginPage = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(user, pass)) alert('Սխալ տվյալներ:');
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="flex items-center justify-center min-h-screen "
>
  <div className="flex flex-col items-center bg-white p-10 rounded-3xl shadow-2xl w-80 gap-4">
    
    <h1 className="text-2xl text-[#5d2050] font-bold text-center tracking-tight">
      Log In
    </h1>

    <input
      type="text"
      placeholder="Username"
      className="w-full border-2 border-[#448e78] rounded-2xl p-3 text-[#285447]"
      onChange={(e) => setUser(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      className="w-full border-2 border-[#448e78] rounded-2xl p-3 text-[#285447]"
      onChange={(e) => setPass(e.target.value)}
    />

    <button
      type="submit"
      className="w-full bg-[#448e78] text-white p-3 rounded-2xl font-bold hover:bg-[#285447] transition-all"
    >
      Log In
    </button>

  </div>
</form>
  );
};

export default LoginPage;
