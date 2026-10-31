const seletores = {
  tituloLogin: ".login-form h2",
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  usuarioLogado: ".navbar-nav li",
};

function validarFormularioLogin() {
  cy.get(seletores.tituloLogin)
    .should("be.visible")
    .and("contain.text", "Login to your account");
}

function efetuarLogin(usuario) {
  cy.get(seletores.email).type(usuario.email);
  cy.get(seletores.senha).type(usuario.senha);
  cy.get(seletores.botaoLogin).click();
}

function validarUsuarioLogado(usuario) {
  cy.get(seletores.usuarioLogado)
    .should("contain.text", "Logged in as")
    .and("contain.text", usuario.nome);
}

module.exports = {
  validarFormularioLogin,
  efetuarLogin,
  validarUsuarioLogado,
};
