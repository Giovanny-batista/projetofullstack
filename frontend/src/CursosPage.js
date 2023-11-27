import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Swal from 'sweetalert2';
import './App.css';

function CursosPage() {
  const apiURL = 'http://localhost:8000';
  const [cursos, setCursos] = useState([]);
  const [erro, setErro] = useState(null);
  const [novoCurso, setNovoCurso] = useState({
    curso: '',
    createdAt: '',
    updatedAt: '',
  });
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  const buscarCursos = async () => {
    try {
      const response = await axios.get(`${apiURL}/cursos`);
      setCursos(response.data);
      setErro('');
    } catch (error) {
      setErro('Erro ao buscar cursos: ' + error.message);
    }
  };

  useEffect(() => {
    buscarCursos();
  }, []);

  const AdicionarCurso = async () => {
    try {
      const novoCursoFormatado = {
        curso: novoCurso.curso,
        createdAt: novoCurso.createdAt,
        updatedAt: novoCurso.updatedAt,
      };

      if (cursoSelecionado) {
        await axios.put(`${apiURL}/cursos/${cursoSelecionado.id}`, novoCursoFormatado);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Curso atualizado com sucesso!',
        });
      } else {
        await axios.post(`${apiURL}/cursos`, novoCursoFormatado);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Novo curso adicionado com sucesso!',
        });
      }

      setCursoSelecionado(null);
      setNovoCurso({ curso: '', createdAt: '', updatedAt: '' });
      buscarCursos();
      setErro('');
    } catch (error) {
      setErro(`Erro ao adicionar/atualizar curso: ${error.message}`);
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: `Erro ao adicionar/atualizar curso: ${error.message}`,
      });
    }
  };

  const CancelarAtualizacao = () => {
    setCursoSelecionado(null);
    setNovoCurso({ curso: '', createdAt: '', updatedAt: '' });
  };

  const RemoverCurso = async (id) => {
    //  o react-confirm-alert foi usado para criar a caixa de diálogo de confirmação
    confirmAlert({
      title: 'Confirmação',
      message: 'Tem certeza que deseja remover este curso?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            try {
              await axios.delete(`${apiURL}/cursos/${id}`);
              buscarCursos();
              setErro('');
              Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Curso removido com sucesso!',
              });
            } catch (error) {
              setErro(`Erro ao remover curso: ${error.message}`);
              Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: `Erro ao remover curso: ${error.message}`,
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
    setNovoCurso({
      ...novoCurso,
      [e.target.name]: e.target.value,
    });
  };

  const EditarCurso = (curso) => {
    setCursoSelecionado(curso);
    setNovoCurso({
      curso: curso.curso,
      createdAt: curso.createdAt,
      updatedAt: curso.updatedAt,
    });
  };

  return (
    <div className="container">
      <h1>Gerenciamento de Cursos</h1>
      {erro && <p className="error">{erro}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Curso</th>
            <th>Data de Criação</th>
            <th>Data de Atualização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.curso}</td>
              <td>{curso.createdAt}</td>
              <td>{curso.updatedAt}</td>
              <td>
                <button className="editButton" onClick={() => EditarCurso(curso)}>
                  Editar
                </button>
                <button className="removeButton" onClick={() => RemoverCurso(curso.id)}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Adicionar/Atualizar Curso</h2>
      <div className="form">
        <label>Curso: </label>
        <input
          type="text"
          name="curso"
          value={novoCurso.curso}
          onChange={handleChange}
        />
        <label>Data de Criação: </label>
        <input
          type="date"
          name="createdAt"
          value={novoCurso.createdAt}
          onChange={handleChange}
        />
        <label>Data de Atualização: </label>
        <input
          type="date"
          name="updatedAt"
          value={novoCurso.updatedAt}
          onChange={handleChange}
        />
        <button className="addButton" onClick={AdicionarCurso}>
          {cursoSelecionado ? 'Atualizar' : 'Adicionar'}
        </button>
        <button className="cancelButton" onClick={CancelarAtualizacao}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default CursosPage;
