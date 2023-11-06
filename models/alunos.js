const alunos = [];
const disciplinas = {};

function adicionarAluno(nome, matricula) {
  const aluno = { nome, matricula };
  alunos.push(aluno);
  return aluno;
}
function inscreverAlunoEmDisciplina(alunoId, disciplinaId) {
  if (!disciplinas[disciplinaId]) {
    disciplinas[disciplinaId] = [];
  }
  disciplinas[disciplinaId].push(alunoId);
  return disciplinas[disciplinaId];
}

module.exports = {
  alunos,
  disciplinas,
  adicionarAluno,
  inscreverAlunoEmDisciplina,
};
