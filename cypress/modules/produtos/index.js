const seletores = {
  linkProdutos: 'a[href="/products"]',
  tituloProdutos: ".title.text-center",
  listaProdutos: ".features_items",
  cartaoProduto: ".features_items .product-image-wrapper",
  botaoAdicionarAoCarrinho: "button.btn.btn-default.cart",
  linkCarrinhoNoModal: '#cartModal a[href="/view_cart"]',
  tabelaCarrinho: "#cart_info_table",
};

function abrirProdutos() {
  cy.get(seletores.linkProdutos).click();
  cy.location("pathname").should("eq", "/products");
  cy.get(seletores.tituloProdutos)
    .should("be.visible")
    .and("contain.text", "All Products");
  cy.get(seletores.listaProdutos).should("be.visible");
  cy.get(seletores.cartaoProduto).should("have.length.greaterThan", 0);
}

function adicionarPrimeiroProdutoAoCarrinho() {
  abrirProdutos();
  cy.get('a[href="/product_details/1"]').click();
  cy.get(seletores.botaoAdicionarAoCarrinho).click();
  cy.get(seletores.linkCarrinhoNoModal).click();
}

function validarCarrinho() {
  cy.location("pathname").should("eq", "/view_cart");
  cy.get(seletores.tabelaCarrinho)
    .should("be.visible")
    .and("contain.text", "Blue Top")
    .and("contain.text", "Rs. 500");
}

module.exports = {
  abrirProdutos,
  adicionarPrimeiroProdutoAoCarrinho,
  validarCarrinho,
};
