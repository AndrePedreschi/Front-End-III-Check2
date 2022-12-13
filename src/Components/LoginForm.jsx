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
  const navigate = useNavigate();


  const [status, setStatus] = useState({
    type: '',
    message: ''
  })

  const valueLoginUser = {
    name: loginUser
  }

  //console.log(valueLoginUser.name);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;


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
        alert("Usuario ou senha não conferem. Tente novamente!!!")
      }
    );

  }

  function validate() {
    if (valueLoginUser.name === '') {
      return setStatus({ type: 'error', mensagem: 'Necessario preencher o campo de login' });
    }
    if (valueLoginUser.name.length < 5) {
      return setStatus({ type: 'error', mensagem: 'Campo deve login deve ser maior que 5' });
    }
    return true;
  }

  return (
    <>

      <div className={`text-center card container ${styles.card} ${theme == 'dark' ? 'cardDark' : ''}`}>

        {status.type === 'success' ? <p style={{ color: "green" }}>{status.message}</p> : ""}
        {status.type === 'error' ? <p style={{ color: "red" }}>{status.message}</p> : ""}

        <div className={`card-body ${styles.CardBody} `}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="loginUser"
              type="text"

              value={loginUser} onChange={(e) => {
                setLoginUser(e.target.value)
              }}
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"

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

