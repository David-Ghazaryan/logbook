import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
      return null;
    }
  });

  const login = (username, password) => {
    let userData = null;

    if (username === 'admin' && password === 'admin') {
      userData = { username: 'admin', role: 'admin' };
    } else if (username === 'user' && password === 'user') {
      userData = { username: 'user', role: 'client' };
    }

    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return userData.role;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        role: user?.role,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
