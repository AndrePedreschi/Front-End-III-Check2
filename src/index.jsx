import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Detail from "./Routes/Detail";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/useTheme"
import { redirect } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));


const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      /* {
        path: '',
        element: <Navigate to='home' />,
      }, */
      /* {
        path: '*',
        element: <Home />,
      }, */
      {
        path: '',
        loader: () => redirect('/home')
      },
      {
        path: '*',
        loader: () => redirect('https://http.cat/404')
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
        path: "detail/:matricula",
        element: <Detail />,
      },
      {
        path: "/dentist/:matricula",
        element: <Detail />,
      },

    ]
  }
])



root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);