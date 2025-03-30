const express = require('express');
const modelo = require('./modelo.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', './visao');
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const perguntas = await modelo.listar_perguntas();
    res.render('index', { perguntas });
  } catch (erro) {
    res.status(500).send('Erro ao listar perguntas: ' + erro.message);
  }
});

app.post('/perguntas', async (req, res) => {
  try {
    await modelo.cadastrar_pergunta(req.body.pergunta);
    res.render('pergunta-sucesso');
  } catch (erro) {
    res.status(500).send('Erro ao cadastrar pergunta: ' + erro.message);
  }
});

app.get('/respostas', async (req, res) => {
  try {
    const id_pergunta = req.query.id_pergunta;
    const pergunta = await modelo.get_pergunta(id_pergunta);
    const respostas = await modelo.get_respostas(id_pergunta);

    res.render('respostas', {
      pergunta,
      respostas
    });
  } catch (erro) {
    res.status(500).send('Erro ao buscar respostas: ' + erro.message);
  }
});

app.post('/respostas', async (req, res) => {
  try {
    const id_pergunta = req.body.id_pergunta;
    const resposta = req.body.resposta;

    await modelo.cadastrar_resposta(id_pergunta, resposta);

    res.render('resposta-sucesso', { id_pergunta });
  } catch (erro) {
    res.status(500).send('Erro ao cadastrar resposta: ' + erro.message);
  }
});

// espera e trata requisições de clientes
const port = 3000;
app.listen(port, 'localhost', () => {
  console.log(`ESM Forum rodando na porta ${port}`);
});
