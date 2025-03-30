const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function abrirBD() {
  return open({
    filename: './bd/esmforum.db',
    driver: sqlite3.Database
  });
}

async function recuperar_todas_perguntas() {
  const db = await abrirBD();
  return db.all('SELECT * FROM perguntas');
}

async function recuperar_num_respostas(id_pergunta) {
  const db = await abrirBD();
  const resultado = await db.get('SELECT count(*) as total FROM respostas WHERE id_pergunta = ?', [id_pergunta]);
  return resultado.total;
}

async function recuperar_pergunta(id_pergunta) {
  const db = await abrirBD();
  return db.get('SELECT * FROM perguntas WHERE id_pergunta = ?', [id_pergunta]);
}

async function recuperar_todas_respostas(id_pergunta) {
  const db = await abrirBD();
  return db.all('SELECT * FROM respostas WHERE id_pergunta = ?', [id_pergunta]);
}

async function criar_pergunta(texto, id_usuario) {
  const db = await abrirBD();
  await db.run('INSERT INTO perguntas (texto, id_usuario) VALUES(?, ?)', [texto, id_usuario]);
}

async function criar_resposta(id_pergunta, texto) {
  const db = await abrirBD();
  await db.run('INSERT INTO respostas (id_pergunta, texto) VALUES(?, ?)', [id_pergunta, texto]);
}

module.exports = {
  recuperar_todas_perguntas,
  recuperar_num_respostas,
  recuperar_pergunta,
  recuperar_todas_respostas,
  criar_pergunta,
  criar_resposta
};
