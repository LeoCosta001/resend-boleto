# Resend Boleto - (API Pagarme)

## Indice

1. **Informações**
   1. Sobre este projeto
   2. Funcionalidades
   3. Tecnologias
2. **Como rodar o Servidor**
   1. Requisitos
   2. Download das dependências
   3. Alterações necessárias
   4. Como rodar

## Informações

**Sobre este projeto:**

- Uma página simples com um formulários para reenviar o ultimo boleto de status "Pagamento pendente" do assinante.

**Funcionalidades:**

- Reenviar o ultimo boleto de status "Pagamento pendente" do assinante.

**Tecnologias:**

- **Front-end:** React + Redux.

- **Back-end:** NodeJs + Express.

- **API Rest:** Axios.

- **Outras Libs/APIs:** Pagarme.

- **Pré-processador:** SASS.

## Como rodar

**Requisitos:**

- Ter instalado o Node.Js e o NPM [Download](https://nodejs.org/en/download/).

**Download das dependências:**

- No diretório raiz use o comando `npm install` para fazer o download das dependências do Back-end.
- No diretório`/web`use o comando `npm install` para fazer o download das dependências do Front-end.

**Alterações necessárias:**

- Crie uma conta no site do [Pagarme](https://pagar.me/).
- Pegue a chave da API [neste link](https://dashboard.pagar.me/#/myaccount/apikeys).
- Crie um arquivo chamado `.env` no diretório raiz e use as seguintes variáveis:
  - `PAGARME_API_KEY` (\*Obrigatório) Coloque nesta variável a chave da API Pagarme.
  - `PORT` (Opcional) Por padrão o servidor já inicia na porta 3030, mas caso queira usar outra porta basta alterar o valor desta variável.
  - `USE_BUILD_FILES` (Opcional) Caso você queira rodar o servidor usando os arquivos de Build do Front-end basta usar o valor `true` (certifique de já haver feito o build dos arquivos do Front-end).

**Exemplo:**

```
PAGARME_API_KEY=ak...6g4Z
USE_BUILD_FILES=true
PORT=3030
```

> OBS: O Front-end faz as requisições para a rota `http://localhost:3030/api/...` se você iniciar o servidor em uma porta ou endereço diferente então você terá que mudar a rota de requisição do Front-end neste diretório `/web/src/axios/config` na propriedade `baseURL` .

**Como rodar:**

- Para iniciar o servidor use o comando : `npm start` ou `npm run dev` para iniciar o servidor usando o Nodemon.
- Para iniciar o Front-end no modo desenvolvedor acesse o diretório `/web` e use o comando: `npm start` e aguarde ser realizada a compilação dos arquivos.
- Para realizar o build dos arquivos do Front-end acesse o diretório `/web` e use o comando: `npm run build`.
