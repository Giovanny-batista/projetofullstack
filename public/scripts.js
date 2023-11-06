async function listarAgendamentosProjetores() {
    const response = await fetch('/agendamento-projetores');
    const data = await response.json();
  
    const listaProjetores = document.getElementById('agendamentos-projetores-list');
    listaProjetores.innerHTML = '';
  
    data.forEach((agendamento, index) => {
      const item = document.createElement('li');
      item.innerHTML = `Agendamento ${index + 1}: Projetor ${agendamento.projetor}, Data ${agendamento.data}, Horário ${agendamento.horario}`;
      listaProjetores.appendChild(item);
    });
  }
  
  async function agendarProjetor() {
    const projetor = document.getElementById('projetor-projetor').value;
    const data = document.getElementById('data-projetor').value;
    const horario = document.getElementById('horario-projetor').value;
  
    const response = await fetch('/agendamento-projetores/agendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projetor, data, horario }),
    });
  
    const result = await response.json();
    alert(result.message);
    listarAgendamentosProjetores();
  }
  
async function listarAgendamentosLocais() {
    const response = await fetch('/agendamento-locais');
    const data = await response.json();
    const listaLocais = document.getElementById('agendamentos-locais-list');
    listaLocais.innerHTML = '';
  
    data.forEach((agendamento, index) => {
      const tipo = agendamento.tipo === 'sala' ? 'Sala' : 'Laboratório';
      const item = document.createElement('li');
      item.innerHTML = `Agendamento ${index + 1}: ${tipo} ${agendamento.local}, Data ${agendamento.data}, Horário ${agendamento.horario}`;
      listaLocais.appendChild(item);
    });
  }
  
  async function agendarLocal() {
    const local = document.getElementById('local-sala-laboratorio').value;
    const tipo = document.getElementById('tipo-local').value;
    const data = document.getElementById('data-local').value;
    const horario = document.getElementById('horario-local').value;
  
    const response = await fetch('/agendamento-locais/agendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ local, tipo, data, horario }),
    });
  
    const result = await response.json();
    alert(result.message);
    listarAgendamentosLocais();
  }
  
  document.getElementById('form-agendamento-locais').addEventListener('submit', function (e) {
    e.preventDefault();
    agendarLocal();
  });
  async function listarNoticias() {
    const response = await fetch('/noticias');
    const data = await response.json();
  
    const listaNoticias = document.getElementById('noticias-list');
    listaNoticias.innerHTML = '';
  
    data.forEach((noticia, index) => {
      const item = document.createElement('li');
      item.innerHTML = `Notícia ${index + 1}: Título: ${noticia.titulo}, Conteúdo: ${noticia.conteudo}`;
      listaNoticias.appendChild(item);
    });
  }
  
  async function criarNoticia() {
    const titulo = document.getElementById('titulo-noticia').value;
    const conteudo = document.getElementById('conteudo-noticia').value;
  
    const response = await fetch('/noticias/criar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo, conteudo }),
    });
  
    const result = await response.json();
    alert(result.message);
    listarNoticias();
  }
  
  async function listarAlunosDisciplinas() {
    const response = await fetch('/alunos-disciplinas/disciplina/1'); 
    const data = await response.json();
  
    const listaAlunosDisciplinas = document.getElementById('alunos-disciplinas-list');
    listaAlunosDisciplinas.innerHTML = '';
  
    data.forEach((alunoId) => {
      const aluno = alunos.find((a) => a.id === alunoId);
      if (aluno) {
        const item = document.createElement('li');
        item.innerHTML = `Aluno: ${aluno.nome}, Matrícula: ${aluno.matricula}`;
        listaAlunosDisciplinas.appendChild(item);
      }
    });
  }
  
  document.getElementById('form-agendamento-projetores').addEventListener('submit', function (e) {
    e.preventDefault();
    agendarProjetor();
  });
  
  document.getElementById('form-agendamento-salas').addEventListener('submit', function (e) {
    e.preventDefault();
    agendarSala();
  });
  
  document.getElementById('form-noticias').addEventListener('submit', function (e) {
    e.preventDefault();
    criarNoticia();
  });
  
  document.getElementById('form-alunos-disciplinas').addEventListener('submit', function (e) {
    e.preventDefault();
    listarAlunosDisciplinas();
  });
  
  listarAgendamentosProjetores();
  listarAgendamentosSalas();
  listarNoticias();
  