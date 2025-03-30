const modelo = require('../modelo.js');
const repositorio_memoria = require('../repositorio/repositorio_memoria.js');

// reconfigura o modelo para usar o repositório em memória
modelo.reconfig_repositorio(repositorio_memoria);

test('Testando listar três perguntas com seus respectivos números de respostas',async() => {
  const perguntas = await modelo.listar_perguntas();

  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('Qual a capital de MG?');
  expect(perguntas[1].texto).toBe('Qual a capital de RJ?');
  expect(perguntas[2].texto).toBe('Qual a capital de SP?');

  expect(perguntas[0].num_respostas).toBe(2); // BH, Belo Horizonte
  expect(perguntas[1].num_respostas).toBe(1); // Rio de Janeiro
  expect(perguntas[2].num_respostas).toBe(3); // São Paulo, Sampa, SP
});
