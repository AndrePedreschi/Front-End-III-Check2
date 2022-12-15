//import styles from "./Navbar.module.css";
import './Navibar.scss'
import { useTheme } from "../contexts/useTheme"
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";


const Navbar = ({ history }) => {

  const { theme, changeTheme } = useTheme();
  const navigate = useNavigate();
  const { auth, saveToken } = useAuth();

  const logoutUser = () => {
    localStorage.removeItem('auth');
    saveToken('')
    navigate('/home')
  }


  return (
    <header className="sticky-top">
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar navbar-dark bg-dark ou navbar-light bg-light*/}
      <nav
        className={`navbar navbar-expand-sm navbar-${theme} bg-${theme}`}
        aria-label="Third navbar example"
      >
        <div className="container">
          {/* Ao clicar, o usuário deve ser redirecionado a home, com react-router */}
          <Link to={'/home'} className={`navbar-brand navbarBrand`}> DH Odonto </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarsExample03"
          >
            <ul className="navbar-nav mb-2 mb-sm-0">
              <li className={`nav-item navBarLink`}>
                {/* Ao clicar, o usuário deve ser redirecionado a home, com react-router */}
                <Link to={'/home'} className={`nav-link`}> Home </Link>


              </li>
              <li className={`nav-item navBarLink`}>

                {/* Se o usuário estiver logado, deverá aparecer um botão de logout
                que vai apagar o token do localstorage.
                Se o usuário estiver deslogado, um link fará um redirecionamento, com react-router,
                ao formulário de login
                O botão de logout deverá ser testado darkmode
                se sim, btn-dark, se não, btn-light */}
                {/* {!auth ? (
                   <a className={`nav-link btn btn-${theme}`} href="/login">
                   Login
                 </a>
                ) : (
                  <a className={`nav-link btn btn-${theme}`} onClick={logoutUser}>
                  Logout
                </a>
                )}  */}
                {!auth ? (
                  <Link to={'/login'} className={`nav-link btn btn-${theme}`}>Login</Link>
                ) : (

                  <Link to={'/home'} onClick={logoutUser} className={`nav-link btn btn-${theme}`}>Logout</Link>
                  
                )}

              </li>
              <li className={`nav-item`}>
                {/* Ao ser clicado, esse botão mudará a aplicação para dark mode ou light mode.
                 Lembre-se de usar um estado no contexto para fazer essa alteração.
                 Na linha seguinte deverá ser feito um teste se a aplicação
                 está em dark mode e deverá utilizar o icone ☀ ou 🌙 e btn-dark ou btn-light*/}
                {theme == "dark" && <button className={`btn btn-light btnStyle`} onClick={() => changeTheme("light")}>☀</button>}
                {theme == "light" && <button className={`btn btn-dark btnStyle`} onClick={() => changeTheme("dark")}>🌙</button>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
