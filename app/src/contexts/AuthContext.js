// src/contexts/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { loginUser } from "../api/auth";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Ошибка получения текущего пользователя: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  const login = async (credentials) => {
    await loginUser(credentials);
    setUser(credentials.username);
  };

  const logout = async () => {
    await fetch(`${BASE_URL}/auth/jwt/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ username, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
