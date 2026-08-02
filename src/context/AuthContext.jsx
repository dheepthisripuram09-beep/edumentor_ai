import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock check for existing user in local storage
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login
    return new Promise((resolve) => {
      const mockUser = {
        uid: 'mock-user-123',
        email,
        displayName: 'John Doe',
        photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      resolve(mockUser);
    });
  };

  const logout = () => {
    // Mock logout
    return new Promise((resolve) => {
      localStorage.removeItem('mockUser');
      setCurrentUser(null);
      resolve();
    });
  };

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
