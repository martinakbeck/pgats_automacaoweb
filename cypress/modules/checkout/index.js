const seletores = {
  botaoCheckout: "a.check_out",
  enderecoEntrega: "#address_delivery",
  tabelaPedido: "table",
  comentario: '[name="message"]',
  linkFazerPedido: 'a[href="/payment"]',
  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesExpiracao: '[data-qa="expiry-month"]',
  anoExpiracao: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]',
  pedidoRealizado: '[data-qa="order-placed"]',
  confirmacaoPedido: ".col-sm-9 p",
};

function revisarPedido(usuario) {
  cy.get(seletores.botaoCheckout).click();
  cy.location("pathname").should("eq", "/checkout");
  cy.contains("h2", "Address Details").should("be.visible");
  cy.contains("h2", "Review Your Order").should("be.visible");
  cy.get(seletores.enderecoEntrega)
    .should("contain.text", usuario.primeiroNome)
    .and("contain.text", usuario.sobrenome)
    .and("contain.text", usuario.endereco)
    .and("contain.text", usuario.cidade);
  cy.get(seletores.tabelaPedido).should("contain.text", "Blue Top");
}

// Escreve o comentário, vai para o pagamento e paga com o cartão informado.
function pagarPedido(comentario, cartao) {
  cy.get(seletores.comentario).type(comentario);
  cy.get(seletores.linkFazerPedido).click();
  cy.location("pathname").should("include", "/payment");
  cy.get(seletores.nomeCartao).type(cartao.nome);
  cy.get(seletores.numeroCartao).type(cartao.numero);
  cy.get(seletores.cvc).type(cartao.cvc);
  cy.get(seletores.mesExpiracao).type(cartao.mes);
  cy.get(seletores.anoExpiracao).type(cartao.ano);
  cy.get(seletores.botaoPagar).click();
}

function validarPedidoConfirmado() {
  cy.get(seletores.pedidoRealizado)
    .should("be.visible")
    .and("contain.text", "Order Placed!");
  cy.get(seletores.confirmacaoPedido).should(
    "contain.text",
    "Congratulations! Your order has been confirmed!"
  );
}

module.exports = {
  revisarPedido,
  pagarPedido,
  validarPedidoConfirmado,
};
