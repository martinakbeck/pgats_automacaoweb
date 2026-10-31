const seletores = {
  nomeCadastro: '[data-qa="signup-name"]',
  emailCadastro: '[data-qa="signup-email"]',
  botaoCadastro: '[data-qa="signup-button"]',
  titulo: "#id_gender1",
  senha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',
  newsletter: "#newsletter",
  ofertas: "#optin",
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  enderecoAlternativo: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',
  contaCriada: '[data-qa="account-created"]',
  continuar: '[data-qa="continue-button"]',
  linkExcluirConta: 'a[href="/delete_account"]',
  contaExcluida: '[data-qa="account-deleted"]',
};

function gerarDadosUsuario(nome = "Usuario PGATS") {
  const identificador = `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
  return {
    nome,
    email: `joao.${identificador}@example.com`,
    senha: "Batatinha123@",
    primeiroNome: "João",
    sobrenome: "Silva",
    empresa: "QA Testes",
    endereco: "Rua de Teste, 123",
    enderecoAlternativo: "Apto 1",
    pais: "United States",
    estado: "California",
    cidade: "Los Angeles",
    cep: "90001",
    celular: "11999999999",
  };
}

function visitarHome() {
  cy.visit("/");
  cy.title().should("eq", "Automation Exercise");
}

function informarDadosIniciais(usuario) {
  cy.get(seletores.nomeCadastro).type(usuario.nome);
  cy.get(seletores.emailCadastro).type(usuario.email);
  cy.get(seletores.botaoCadastro).click();
}

function preencherFormulario(usuario) {
  cy.get(seletores.titulo).check();
  cy.get(seletores.senha).type(usuario.senha);
  cy.get(seletores.diaNascimento).select("10");
  cy.get(seletores.mesNascimento).select("May");
  cy.get(seletores.anoNascimento).select("1990");
  cy.get(seletores.newsletter).check();
  cy.get(seletores.ofertas).check();
  cy.get(seletores.primeiroNome).type(usuario.primeiroNome);
  cy.get(seletores.sobrenome).type(usuario.sobrenome);
  cy.get(seletores.empresa).type(usuario.empresa);
  cy.get(seletores.endereco).type(usuario.endereco);
  cy.get(seletores.enderecoAlternativo).type(usuario.enderecoAlternativo);
  cy.get(seletores.pais).select(usuario.pais);
  cy.get(seletores.estado).type(usuario.estado);
  cy.get(seletores.cidade).type(usuario.cidade);
  cy.get(seletores.cep).type(usuario.cep);
  cy.get(seletores.celular).type(usuario.celular);
  cy.get(seletores.botaoCriarConta).click();
}

function criarUsuario(usuario) {
  visitarHome();
  cy.get('a[href="/login"]').click();
  informarDadosIniciais(usuario);
  preencherFormulario(usuario);
  cy.get(seletores.contaCriada).should("contain.text", "Account Created!");
  cy.get(seletores.continuar).click();
}

function excluirConta() {
  cy.get(seletores.linkExcluirConta).click();
  cy.get(seletores.contaExcluida)
    .should("be.visible")
    .and("contain.text", "Account Deleted!");
  cy.get(seletores.continuar).click();
}

module.exports = {
  gerarDadosUsuario,
  visitarHome,
  informarDadosIniciais,
  preencherFormulario,
  criarUsuario,
  excluirConta,
};
