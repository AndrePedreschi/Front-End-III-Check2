import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import  Home  from "./Routes/Home";
import  Login  from "./Routes/Login";
import  Detail  from "./Routes/Detail";
import "./index.css";
import  App  from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme"
//import { Navigate } from "react-router-dom";
import { redirect } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById("root"));
//Lembre-se de configurar suas rotas e seu contexto aqui

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
