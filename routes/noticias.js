
import { Router } from 'express';
const router = Router();

let noticias = []; 

router.get('/', (req, res) => {
  res.json(noticias);
});

router.post('/criar', (req, res) => {
  const { titulo, conteudo } = req.body;
  const noticia = { titulo, conteudo };
  noticias.push(noticia);
  res.json({ message: 'Notícia criada com sucesso.' });
});

export default router;
