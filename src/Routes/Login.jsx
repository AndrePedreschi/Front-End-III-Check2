import { AuthProvider, AuthContext } from "../contexts/auth";
import LoginForm from "../Components/LoginForm";
import React, { useState, useContext } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

const Contact = () => {

  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext);

    if (!authenticated) {
      return <Navigate to="/login" />
    }

    return children;


  };
  return (
    <AuthProvider>
      <h1>Login Form</h1>
      <LoginForm />
    </AuthProvider>


  );
};

export default Contact;
