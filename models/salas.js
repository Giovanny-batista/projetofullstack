const salas = [];

function getAll() {
  return salas;
}

function agendar(local, tipo, data, horario) {
  const agendamento = { local, tipo, data, horario };
  salas.push(agendamento);
  return agendamento;
}

module.exports = {
  getAll,
  agendar,
};
