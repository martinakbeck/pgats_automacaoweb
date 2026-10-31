const cadastro = require("../modules/cadastro");
const login = require("../modules/login");
const produtos = require("../modules/produtos");
const checkout = require("../modules/checkout");

const cartao = {
  nome: "Joao Silva",
  numero: "4111111111111111",
  cvc: "789",
  mes: "10",
  ano: "2027",
};

const comentario = "Pedido de teste automatizado.";

describe("Automation Exercise - Casos de teste", () => {
  it("TC01 - Cadastrar usuário", () => {
    const usuario = cadastro.gerarDadosUsuario();

    cadastro.visitarHome();
    
    cy.get('a[href="/login"]').click();
    cy.get(".signup-form h2").should("contain.text", "New User Signup!");

    cadastro.informarDadosIniciais(usuario);
    cy.get("#form h2")
      .should("be.visible")
      .and("contain.text", "Enter Account Information");

    cadastro.preencherFormulario(usuario);
    cy.get('[data-qa="account-created"]')
      .should("be.visible")
      .and("contain.text", "Account Created!");
    cy.get('[data-qa="continue-button"]').click();

    login.validarUsuarioLogado(usuario);
    cadastro.excluirConta();
  });

  it("TC02 - Login com e-mail e senha corretos", () => {
    const usuario = cadastro.gerarDadosUsuario("Usuario Login Valido");

    cadastro.criarUsuario(usuario);
    cy.get('a[href="/logout"]').click();
    login.validarFormularioLogin();

    login.efetuarLogin(usuario);
    login.validarUsuarioLogado(usuario);

    cadastro.excluirConta();
  });

  it("TC03 - Login com e-mail e senha incorretos", () => {
    const usuario = cadastro.gerarDadosUsuario("Usuario Inexistente");

    cadastro.visitarHome();
    cy.get('a[href="/login"]').click();
    login.validarFormularioLogin();

    login.efetuarLogin(usuario);
    cy.get(".login-form p")
      .should("be.visible")
      .and("contain.text", "Your email or password is incorrect!");
  });

  it("TC04 - Logout do usuário", () => {
    const usuario = cadastro.gerarDadosUsuario("Usuario Logout");

    cadastro.criarUsuario(usuario);
    cy.get('a[href="/logout"]').click();
    login.validarFormularioLogin();

    login.efetuarLogin(usuario);
    login.validarUsuarioLogado(usuario);

    cy.get('a[href="/logout"]').click();
    cy.location("pathname").should("eq", "/login");

    login.validarFormularioLogin();

    login.efetuarLogin(usuario);
    cadastro.excluirConta();
  });

  it("TC05 - Cadastro com e-mail já existente", () => {
    const usuario = cadastro.gerarDadosUsuario("Usuario Existente");

    cadastro.criarUsuario(usuario);

    cy.get('a[href="/logout"]').click();
    cy.get(".signup-form h2").should("contain.text", "New User Signup!");

    cadastro.informarDadosIniciais(usuario);
    cy.get(".signup-form p")
      .should("be.visible")
      .and("contain.text", "Email Address already exist!");

    login.efetuarLogin(usuario);
    cadastro.excluirConta();
  });

  it("TC08 - Todos os produtos e página de detalhes do produto", () => {

    cadastro.visitarHome();
    produtos.abrirProdutos();

    cy.get('a[href="/product_details/1"]').click();

    cy.location("pathname").should("eq", "/product_details/1");
    cy.get(".product-information h2").should("contain.text", "Blue Top");
    cy.get(".product-information")
      .should("be.visible")
      .and("contain.text", "Category: Women > Tops")
      .and("contain.text", "Rs. 500")
      .and("contain.text", "Availability: In Stock")
      .and("contain.text", "Condition: New")
      .and("contain.text", "Brand: Polo");
  });

  it("TC09 - Pesquisar produto", () => {
    const termo = "Blue Top";

    cadastro.visitarHome();
    produtos.abrirProdutos();
    cy.get("#search_product").type(termo);
    cy.get("#submit_search").click();

    cy.get(".title.text-center")
      .should("be.visible")
      .and("contain.text", "Searched Products");

    cy.get(".features_items .product-image-wrapper")
      .should("have.length.greaterThan", 0)
      .each(($produto) => {
        cy.wrap($produto).should("contain.text", termo);
      });
  });

  it("TC10 - Verificar inscrição (subscription) na home", () => {
    const { email } = cadastro.gerarDadosUsuario("Inscricao");

    cadastro.visitarHome();
    cy.get("#footer").scrollIntoView().should("contain.text", "Subscription");

    cy.get("#susbscribe_email").type(email);
    cy.get("#subscribe").click();
    cy.get("#success-subscribe")
      .should("be.visible")
      .and("contain.text", "You have been successfully subscribed!");
  });

  it("TC15 - Fazer pedido: cadastrar antes de finalizar a compra", () => {
    const usuario = cadastro.gerarDadosUsuario("Usuario Pedido 15");

    cadastro.criarUsuario(usuario);
    login.validarUsuarioLogado(usuario);

    produtos.adicionarPrimeiroProdutoAoCarrinho();
    produtos.validarCarrinho();

    checkout.revisarPedido(usuario);

    checkout.pagarPedido(comentario, cartao);
    checkout.validarPedidoConfirmado();

    cadastro.excluirConta();
  });

  it("TC16 - Fazer pedido: login antes de finalizar a compra", () => {
    const usuario = cadastro.gerarDadosUsuario("Usuario Pedido 16");

    cadastro.criarUsuario(usuario);
    cy.get('a[href="/logout"]').click();

    login.efetuarLogin(usuario);
    login.validarUsuarioLogado(usuario);

    produtos.adicionarPrimeiroProdutoAoCarrinho();
    produtos.validarCarrinho();

    checkout.revisarPedido(usuario);

    checkout.pagarPedido(comentario, cartao);
    checkout.validarPedidoConfirmado();

    cadastro.excluirConta();
  });
});
