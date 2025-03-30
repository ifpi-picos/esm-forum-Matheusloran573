let perguntas = [
  { id_pergunta: 1, texto: 'Qual a capital de MG?', id_usuario: 1 },
  { id_pergunta: 2, texto: 'Qual a capital de RJ?', id_usuario: 1 },
  { id_pergunta: 3, texto: 'Qual a capital de SP?', id_usuario: 1 }
];

let respostas = {
  1: ['Belo Horizonte', 'BH'],
  2: ['Rio de Janeiro'],
  3: ['São Paulo', 'Sampa', 'SP']
};

function recuperar_todas_perguntas() {
  return perguntas.map(p => ({ ...p }));
}

function recuperar_pergunta(id_pergunta) {
  return perguntas.find(p => p.id_pergunta === id_pergunta);
}

function recuperar_num_respostas(id_pergunta) {
  return respostas[id_pergunta]?.length || 0;
}

function recuperar_todas_respostas(id_pergunta) {
  return (respostas[id_pergunta] || []).map(texto => ({ texto }));
}

function criar_pergunta(texto, id_usuario) {
  const nova = {
    id_pergunta: perguntas.length > 0 ? perguntas[perguntas.length - 1].id_pergunta + 1 : 1,
    texto,
    id_usuario
  };
  perguntas.push(nova);
}

function criar_resposta(id_pergunta, texto) {
  if (!respostas[id_pergunta]) {
    respostas[id_pergunta] = [];
  }
  respostas[id_pergunta].push(texto);
}

function limpar() {
  perguntas = [];
  respostas = {};
}

module.exports = {
  recuperar_todas_perguntas,
  recuperar_pergunta,
  recuperar_num_respostas,
  recuperar_todas_respostas,
  criar_pergunta,
  criar_resposta,
  limpar // ← exportando a função de reset
};