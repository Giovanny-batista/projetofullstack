
import express from 'express';
const app = express();
const port = process.env.PORT || 8081; 

app.use(express.json());

import agendamentoProjetoresRoute from './routes/agendamento-projetores.js';
import agendamentoSalasRoute from './routes/agendamento-salas.js';
import noticiasRoute from './routes/noticias.js';
import alunosDisciplinasRoute from './routes/alunos-disciplinas.js';

app.use('/agendamento-projetores', agendamentoProjetoresRoute);
app.use('/agendamento-salas', agendamentoSalasRoute);
app.use('/noticias', noticiasRoute);
app.use('/alunos-disciplinas', alunosDisciplinasRoute);

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});
