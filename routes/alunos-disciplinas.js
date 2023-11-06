import { Router } from 'express';
const router = Router();

let disciplinas = {}; 

router.get('/disciplina/:id', (req, res) => {
  const disciplinaId = req.params.id;
  const alunos = disciplinas[disciplinaId] || [];
  res.json(alunos);
});

router.post('/adicionar', (req, res) => {
  const { disciplinaId, alunoId } = req.body;
  if (!disciplinas[disciplinaId]) {
    disciplinas[disciplinaId] = [];
  }
  disciplinas[disciplinaId].push(alunoId);
  res.json({ message: 'Aluno adicionado à disciplina com sucesso.' });
});

export default router; 
