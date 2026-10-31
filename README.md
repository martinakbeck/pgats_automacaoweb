# Automação Automation Exercise

Projeto de testes E2E com Cypress para a aplicação [Automation Exercise](https://www.automationexercise.com/).

## Requisitos

- Node.js e npm

## Instalação

```bash
npm ci
```

## Executar os testes

```bash
npm test
```

Para abrir o Cypress em modo interativo:

```bash
npx cypress open
```

## Casos cobertos

Os testes em `cypress/e2e/casos.cy.js` cobrem os casos 1, 2, 3, 4, 5, 8, 9, 10, 15 e 16 da página [Test Cases](https://www.automationexercise.com/test_cases).

As ações reutilizáveis estão organizadas por contexto em `cypress/modules/`.

## Relatório

Após `npm test`, o relatório HTML Mochawesome é gerado em:

```text
cypress/reports/html/index.html
```
