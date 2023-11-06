import express from 'express';
const router = express.Router();

let projetores = [];

router.get('/', (req, res) => {
  res.json(projetores);
});

router.post('/agendar', (req, res) => {
  const { projetor, data, horario } = req.body;
  const agendamento = { projetor, data, horario };
  projetores.push(agendamento);
  res.json({ message: 'Agendamento realizado com sucesso.' });
});

export default router;
