import styles from "./Form.module.css";
import React, { useState, useContext } from "react";
import { useAuth } from "../contexts/auth";
import { useTheme } from "../hooks/useTheme"
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { theme } = useTheme();
  const { saveToken } = useAuth();
  const [loginUser, setLoginUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
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
        alert("Ocorreu um erro, recarregue a página")
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
              value={loginUser} onChange={(e) => setLoginUser(e.target.value)}
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

