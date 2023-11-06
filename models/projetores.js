const projetores = [];

function getAll() {
  return projetores;
}

function agendar(projetor, data, horario) {
  const agendamento = { projetor, data, horario };
  projetores.push(agendamento);
  return agendamento;
}

module.exports = {
  getAll,
  agendar,
};
