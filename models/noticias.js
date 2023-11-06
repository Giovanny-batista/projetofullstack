
const noticias = [];


function getAll() {
  return noticias;
}

function criarNoticia(titulo, conteudo) {
  const noticia = { titulo, conteudo };
  noticias.push(noticia);
  return noticia;
}

module.exports = {
  getAll,
  criarNoticia,
};
