import { useContext, useEffect, useState } from "react";
import './ScheduleForm.scss';
import { useTheme } from "../hooks/useTheme";
import { redirect, Navigate } from "react-router-dom";

const ScheduleForm = () => {
  const { theme } = useTheme();
  const [dentistas, setDentistas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [dentistaForm, setDentistaForm] = useState('');
  const [pacienteForm, setPacienteForm] = useState('');
  const [dataForm, setDataForm] = useState('');

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
    //e pacientes e carregar os dados em 2 estados diferentes
    fetch(`https://dhodonto.ctdprojetos.com.br/dentista`).then(
      response => {
        response.json().then(
          dentistasList => {
            console.log(dentistasList);
            setDentistas(dentistasList)
          }
        )
      }
    )

    fetch(`https://dhodonto.ctdprojetos.com.br/paciente`).then(
      response => {
        response.json().then(
          pacientesList => {
            console.log(pacientesList.body);
            setPacientes(pacientesList.body)
          }
        )
      }
    )
  }, []);

  const handleSubmit = (event) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    event.preventDefault();

    let dentistaFiltro = dentistas.filter((item) => item.matricula == dentistaForm)
    dentistaFiltro = dentistaFiltro[0]

    let pacienteFiltro = pacientes.filter((item) => item.matricula == pacienteForm)
    pacienteFiltro = pacienteFiltro[0]

    let tokenJwtusuarioLogado = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBcGkgREggRWNvbW1lcmNlIiwic3ViIjoiZGVudGlzdGFBZG1pbiIsImlhdCI6MTY3MDgxMTcxNSwiZXhwIjoxNjcwODE1MzE1fQ.t4GFoiePpLdys9uL0xPdZ6_iX3JNvfAAwaSxmeEtQQ4'

    let bodyDados = {
      "paciente": {
        "nome": pacienteFiltro.nome,
        "sobrenome": pacienteFiltro.sobrenome,
        "matricula": `${pacienteForm}`,
        "usuario": {
          "username": pacienteFiltro.usuario.username
        },
        "endereco": {
          "id": pacienteFiltro.endereco.id,
          "logradouro": pacienteFiltro.endereco.logradouro,
          "numero": pacienteFiltro.endereco.numero,
          "complemento": pacienteFiltro.endereco.complemento,
          "bairro": pacienteFiltro.endereco.bairro,
          "municipio": pacienteFiltro.endereco.municipio,
          "estado": pacienteFiltro.endereco.estado,
          "cep": pacienteFiltro.endereco.cep,
          "pais": pacienteFiltro.endereco.pais
        },
        "dataDeCadastro": "2022-12-11T22:53:52.110Z"
      },
      "dentista": {
        "nome": dentistaFiltro.nome,
        "sobrenome": dentistaFiltro.sobrenome,
        "matricula": dentistaForm,
        "usuario": {
          "username": dentistaFiltro.usuario.username
        }
      },
      "dataHoraAgendamento": `${dataForm}`
    }

    let dadosRequisicao = {
      method: 'POST',
      accept: '*/*',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + tokenJwtusuarioLogado,
      },
      body: JSON.stringify(bodyDados),
    };

    if (dentistaForm!==undefined || pacienteForm!==undefined || dataForm!==undefined) {
      fetch(`http://dhodonto.ctdprojetos.com.br/consulta`, dadosRequisicao).then(
        resultado => {
          if (resultado.status == 200) {
            return resultado.json();
          }
          throw resultado;
        }
      ).then(
        resultado => {
          alert("Consulta cadastrada com sucesso!")
          redirect('/home')
        }
      ).catch(
        erro => {
          alert("Ocorreu um erro, recarregue a página")
          console.log("não foi");
          
        }
      );

    } else {
      alert("Preencha o dados para agendar uma consulta!")
      return
    }
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`text-center container ${theme == 'dark' ? 'cardDark' : ''}`}>
        <form onSubmit={handleSubmit}>
          <div className={`row rowSpacing`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentista
              </label>
              <select
                className="form-select"
                name="dentist"
                id="dentist"
                onChange={event => setDentistaForm(event.target.value)}
                value={dentistaForm}
              >
                {/*Aqui deve ser feito um map para listar todos os dentistas*/}

                {dentistas.map((itens) => (
                  <option key={itens.matricula} value={itens.matricula}>
                    {`${itens.nome} ${itens.sobrenome}`}
                  </option>
                )
                )}

              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Paciente
              </label>
              <select
                className="form-select"
                name="patient"
                id="patient"
                onChange={event => setPacienteForm(event.target.value)}
                value={pacienteForm}
              >
                {/*Aqui deve ser feito um map para listar todos os pacientes*/}
                {pacientes.map((itens) => (
                  <option key={itens.matricula} value={itens.matricula}>
                    {`${itens.nome} ${itens.sobrenome}`}
                  </option>
                )
                )}
              </select>
            </div>
          </div>
          <div className={`row rowSpacing`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Data
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                onChange={event => setDataForm(event.target.value)}
                value={dataForm}
              />
            </div>
          </div>
          <div className={`row rowSpacing`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn-${theme} button`}
              type="submit"
            >
              Agendar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
