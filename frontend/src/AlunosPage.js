import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Swal from 'sweetalert2';

import './App.css';

function AlunosPage() {
  const apiURL = 'http://localhost:8000';
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [erro, setErro] = useState(null);
  const [novoAluno, setNovoAluno] = useState({
    nome: '',
    email: '',
    cur_id: '',
    createdAt: '',
    updatedAt: '',
  });
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  const buscarAlunos = async () => {
    try {
      const response = await axios.get(`${apiURL}/alunos`);
      setAlunos(response.data);
      setErro('');
    } catch (error) {
      setErro('Erro ao buscar alunos: ' + error.message);
    }
  };

  const buscarCursos = async () => {
    try {
      const response = await axios.get(`${apiURL}/cursos`);
      setCursos(response.data);
    } catch (error) {
      console.error('Erro ao buscar cursos: ' + error.message);
    }
  };

  useEffect(() => {
    buscarAlunos();
    buscarCursos();
  }, []);

  const AdicionarAluno = async () => {
    try {
      const novoAlunoFormatado = {
        nome: novoAluno.nome,
        email: novoAluno.email,
        cur_id: novoAluno.cur_id,
        createdAt: novoAluno.createdAt,
        updatedAt: novoAluno.updatedAt,
      };

      if (alunoSelecionado) {
        await axios.put(`${apiURL}/alunos/${alunoSelecionado.id}`, novoAlunoFormatado);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: `Aluno ${novoAluno.nome} atualizado com sucesso!`,
        });
      } else {
        await axios.post(`${apiURL}/alunos`, novoAlunoFormatado);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: `Novo aluno ${novoAluno.nome} adicionado com sucesso!`,
        });
      }

      setAlunoSelecionado(null);
      setNovoAluno({
        nome: '',
        email: '',
        cur_id: '',
        createdAt: '',
        updatedAt: '',
      });
      buscarAlunos();
      setErro('');
    } catch (error) {
      setErro(`Erro ao adicionar/atualizar aluno: ${error.message}`);
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: `Erro ao adicionar/atualizar aluno: ${error.message}`,
      });
    }
  };

  const CancelarAtualizacao = () => {
    setAlunoSelecionado(null);
    setNovoAluno({
      nome: '',
      email: '',
      cur_id: '',
      createdAt: '',
      updatedAt: '',
    });
  };

  const RemoverAluno = async (id, nome) => {
    confirmAlert({
      title: 'Confirmação',
      message: `Tem certeza que deseja remover o aluno ${nome}?`,
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            try {
              await axios.delete(`${apiURL}/alunos/${id}`);
              buscarAlunos();
              setErro('');
              Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: `Aluno ${nome} removido com sucesso!`,
              });
            } catch (error) {
              setErro(`Erro ao remover aluno: ${error.message}`);
              Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: `Erro ao remover aluno: ${error.message}`,
              });
            }
          },
        },
        {
          label: 'Não',
          onClick: () => console.log('Remoção cancelada'),
        },
      ],
    });
  };

  const handleChange = (e) => {
    setNovoAluno({
      ...novoAluno,
      [e.target.name]: e.target.value,
    });
  };

  const EditarAluno = (aluno) => {
    setAlunoSelecionado(aluno);
    setNovoAluno({
      nome: aluno.nome,
      email: aluno.email,
      cur_id: aluno.cur_id,
      createdAt: aluno.createdAt,
      updatedAt: aluno.updatedAt,
    });
  };

  return (
    <div className="container">
      <h1>Gerenciamento de Alunos</h1>
      {erro && <p className="error">{erro}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>ID do Curso</th>
            <th>Data de Criação</th>
            <th>Data de Atualização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.cur_id}</td>
              <td>{aluno.createdAt}</td>
              <td>{aluno.updatedAt}</td>
              <td>
                <button className="editButton" onClick={() => EditarAluno(aluno)}>
                  Editar
                </button>
                <button
                  className="removeButton"
                  onClick={() => RemoverAluno(aluno.id, aluno.nome)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Adicionar/Atualizar Aluno</h2>
      <div className="form">
        <label>Nome: </label>
        <input type="text" name="nome" value={novoAluno.nome} onChange={handleChange} />
        <label>Email: </label>
        <input type="text" name="email" value={novoAluno.email} onChange={handleChange} />
        <label>Curso: </label>
        <select name="cur_id" value={novoAluno.cur_id} onChange={handleChange}>
          <option value="">Selecione o Curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.curso}
            </option>
          ))}
        </select>
        <label>Data de Criação: </label>
        <input
          type="date"
          name="createdAt"
          value={novoAluno.createdAt}
          onChange={handleChange}
        />
        <label>Data de Atualização: </label>
        <input
          type="date"
          name="updatedAt"
          value={novoAluno.updatedAt}
          onChange={handleChange}
        />
        <button className="addButton" onClick={AdicionarAluno}>
          {alunoSelecionado ? 'Atualizar' : 'Adicionar'}
        </button>
        <button className="cancelButton" onClick={CancelarAtualizacao}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default AlunosPage;
