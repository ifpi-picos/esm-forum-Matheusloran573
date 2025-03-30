const modelo = require('../modelo.js');
const repositorio_memoria = require('../repositorio/repositorio_memoria.js');

beforeEach(() => {
  modelo.reconfig_repositorio(repositorio_memoria);
  repositorio_memoria.limpar();
});

test('Testando banco de dados vazio', async () => {
  const perguntas = await modelo.listar_perguntas();
  expect(perguntas.length).toBe(0);
});

test('Testando cadastro de três perguntas', async () => {
  await modelo.cadastrar_pergunta('1 + 1 = ?');
  await modelo.cadastrar_pergunta('2 + 2 = ?');
  await modelo.cadastrar_pergunta('3 + 3 = ?');

  const perguntas = await modelo.listar_perguntas();
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
});

test('Testando cadastro de resposta e recuperação de respostas', async () => {
  await modelo.cadastrar_pergunta('Capital da França?');
  const pergunta = (await modelo.listar_perguntas())[0];

  await modelo.cadastrar_resposta(pergunta.id_pergunta, 'Paris');
  const respostas = await modelo.get_respostas(pergunta.id_pergunta);

  expect(respostas.length).toBe(1);
  expect(respostas[0].texto).toBe('Paris');
});

test('Testando get_pergunta', async () => {
  await modelo.cadastrar_pergunta('Quem descobriu o Brasil?');
  const pergunta = (await modelo.listar_perguntas())[0];

  const perguntaEncontrada = await modelo.get_pergunta(pergunta.id_pergunta);
  expect(perguntaEncontrada.texto).toBe('Quem descobriu o Brasil?');
});

test('Testando get_num_respostas', async () => {
  await modelo.cadastrar_pergunta('Composição da água');
  const pergunta = (await modelo.listar_perguntas())[0];

  await modelo.cadastrar_resposta(pergunta.id_pergunta, 'H2O');
  await modelo.cadastrar_resposta(pergunta.id_pergunta, 'Dihidrogênio Monóxido');

  const num = await modelo.get_num_respostas(pergunta.id_pergunta);
  expect(num).toBe(2);
});