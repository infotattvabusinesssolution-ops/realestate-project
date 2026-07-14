import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginAPI, registerAPI, getProfileAPI, updateProfileAPI, changePasswordAPI } from '../api/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('estaty_token') || null);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('estaty_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('estaty_token'));
  const [loading, setLoading] = useState(true);

  // Validate session and fetch fresh profile on reload
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await getProfileAPI();
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to validate token on load:', error);
          logout();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  // Login handler
  const login = async (email, password) => {
    try {
      const res = await loginAPI(email, password);
      const { token: userToken, ...userData } = res.data;

      localStorage.setItem('estaty_token', userToken);
      localStorage.setItem('estaty_user', JSON.stringify(userData));

      setToken(userToken);
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  };

  // Register handler
  const register = async (name, email, password, role, phone, city) => {
    try {
      const res = await registerAPI({
        name,
        email,
        password,
        role,
        phone,
        city,
      });
      const { token: userToken, ...userData } = res.data;

      localStorage.setItem('estaty_token', userToken);
      localStorage.setItem('estaty_user', JSON.stringify(userData));

      setToken(userToken);
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('estaty_token');
    localStorage.removeItem('estaty_user');
    localStorage.removeItem('darkMode');
    document.documentElement.classList.remove('dark');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update profile details
  const updateProfile = async (profileData) => {
    try {
      const res = await updateProfileAPI(profileData);
      const userData = res.data;
      setUser(userData);
      localStorage.setItem('estaty_user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error.response?.data?.message || 'Profile update failed';
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await changePasswordAPI(currentPassword, newPassword);
    } catch (error) {
      throw error.response?.data?.message || 'Password update failed';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
