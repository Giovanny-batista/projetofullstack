import React, { useState } from 'react';
import AlunosPage from './AlunosPage';
import CursosPage from './CursosPage';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  const [selectedPage, setSelectedPage] = useState('alunos');

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className={`nav-item ${selectedPage === 'alunos' ? 'active' : ''}`}>
                <a className="nav-link" href="#" onClick={() => handlePageChange('alunos')}>Alunos</a>
              </li>
              <li className={`nav-item ${selectedPage === 'cursos' ? 'active' : ''}`}>
                <a className="nav-link" href="#" onClick={() => handlePageChange('cursos')}>Cursos</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="content">
        {selectedPage === 'alunos' ? <AlunosPage /> : <CursosPage />}
      </div>
    </div>
  );
}

export default App;
