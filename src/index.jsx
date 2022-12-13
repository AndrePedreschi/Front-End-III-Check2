import React, { useState, useContext } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Detail from "./Routes/Detail";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme"
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
//Lembre-se de configurar suas rotas e seu contexto aqui

/*const Index = () => {

  const [user, setUser] = useState(null);
  const login = (login, password) => {
    console.log('login auth', login, password);
    setUser({ nome: "denstistaAdmin" })
  }

  const Private = (children) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando...</div>
    }

    if (!authenticated) {
      return <Navigate to='login' />
    }
    return children;

  }
  return (
    <AuthProvider>
      <Routes>
        <Route exact path='home' element={<Private><Home /></Private>} />
      </Routes>
    </AuthProvider>
  )
};*/



const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
    ]
  }
])



root.render(
  <React.StrictMode>
    <ThemeProvider>

      <RouterProvider router={router} />

    </ThemeProvider>
  </React.StrictMode>
);