import express from 'express';
const router = express.Router();

let locais = []; 

router.get('/', (req, res) => {
  res.json(locais);
});

router.post('/agendar', (req, res) => {
  const { local, tipo, data, horario } = req.body;
  const agendamento = { local, tipo, data, horario };
  locais.push(agendamento);
  res.json({ message: 'Agendamento realizado com sucesso.' });
});

export default router;
