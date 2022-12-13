import styles from "./Form.module.css";
import React, { useState, useContext } from "react";
import { useAuth } from "../contexts/auth";
import { useTheme } from "../hooks/useTheme"
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { theme } = useTheme();
  const { auth, saveToken } = useAuth();
  const [loginUser, setLoginUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setLoginUserError] = useState(null)
  const navigate = useNavigate();

  const validar = () => {
    let error = false;
    setLoginUserError = false;
    if (loginUser == null) {
      setLoginUserError("Preencha o login acima de 5 caracteres")
      error = true;
    }
    return !error;


  }

  const salvar = () => {
    if (validar()) {
      console.log('salvou')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    let bodyDados = {
      "username": loginUser,
      "password": password,
    }

    let dadosRequisicao = {
      method: 'POST',
      accept: '*/*',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(bodyDados),
    };

    fetch(`https://dhodonto.ctdprojetos.com.br/auth`, dadosRequisicao).then(
      resultado => {
        if (resultado.status == 200) {
          return resultado.json();
        }
        throw resultado;
      }
    ).then(
      resultado => {
        saveToken(resultado.token)
        alert("Usuário logado com sucesso")
        navigate('/home')
      }
    ).catch(
      erro => {
        alert("Senha incorreta. Tente novamente!!")
      }
    );

  }

  return (
    <>
      <div
        className={`text-center card container ${styles.card} ${theme == 'dark' ? 'cardDark' : ''}`}
      >
        <div className={`card-body ${styles.CardBody} `}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="loginUser"
              type="text"
              required
              value={loginUser} onChange={(e) => {
                setLoginUser(e.target.value)
                setLoginUserError(null)
              }}
              errorMessage={errorLogin}
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              required
              value={password} onChange={(e) => setPassword(e.target.value)}

            />
            <button className="btn btn-primary" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

