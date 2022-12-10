import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const login = (login, password) => {
    console.log('login auth', { login, password });

    if (password === "") {
      navigate("home");
    }
    setUser({ login, password })

  }
  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login }}>
      {children}
    </AuthContext.Provider>
  )
}