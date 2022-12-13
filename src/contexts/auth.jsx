import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  //referente ao Login do user
  useEffect(() => {
    const recoveryUser = localStorage.getItem('user');

    if (recoveryUser) {
      setUser(JSON.parse(recoveryUser));
    }

  }, []);

  const login = (login, password) => {
    console.log('login auth', { login, password });

    const loggedUser = {
      login,
      password 
    };

    localStorage.setItem('user', JSON.stringify(loggedUser));

    if (password === "dentista123") {
      setUser(loggedUser)
      navigate("/home");
    }
    //setUser({ login, password })

  };

  /*const logout = () => {
    console.log('logout');
    localStorage.removeItem('user');
    setUser(null);
    navigate("/login");
  }*/
  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login }}>
      {children}
    </AuthContext.Provider>
  )
}