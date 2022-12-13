import styles from "./Form.module.css";
import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useTheme } from "../hooks/useTheme"


const LoginForm = () => {
  const { theme } = useTheme();
  const { authenticated, login } = useContext(AuthContext);

  const [loginUser, setLoginUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    e.preventDefault();
    console.log("submit", { loginUser, password });
    login(loginUser, password);

    


    //https://dhodonto.ctdprojetos.com.br/auth




  };

 

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card} ${theme=='dark'?'cardDark':''}`}
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

