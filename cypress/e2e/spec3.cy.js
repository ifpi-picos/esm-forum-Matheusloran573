describe('Teste E2E: Cadastro de resposta', () => {
  it('Deve cadastrar uma resposta para a primeira pergunta', () => {
    // Acessa a página inicial
    cy.visit('http://localhost:3000/');

    // Espera a lista de perguntas carregar e clica na primeira pergunta
    cy.get('a[href^="/respostas/?id_pergunta="]').first().should('be.visible').click();

    // Preenche o campo de resposta
    cy.get('textarea[name="resposta"]').should('be.visible').type('Resposta automática via Cypress');

    // Envia a resposta
    cy.get('input[type="submit"]').should('be.visible').click();

    // Confirma que foi redirecionado para a página de sucesso
    cy.contains('Sua resposta foi cadastrada com sucesso.').should('exist');

    // Clica no link de retorno para a pergunta
    cy.get('a[href^="/respostas/?id_pergunta="]').first().should('be.visible').click();

    // Confirma se a resposta foi renderizada na lista
    cy.contains('Resposta automática via Cypress').should('exist');
  });
});
