# 🔐 API de Autenticação com Node.js, Express, JWT e SQLite

Este projeto implementa uma API de autenticação robusta e segura, utilizando Node.js, o framework Express, JSON Web Tokens (JWT) para autenticação e autorização, e SQLite para persistência de dados dos usuários.

## 🚀 Tecnologias Utilizadas

* **Node.js:** Ambiente de execução JavaScript para o servidor.
* **Express:** Framework web minimalista e flexível para Node.js, facilitando a criação de APIs RESTful.
* **jsonwebtoken:** Biblioteca para gerar e verificar JSON Web Tokens.
* **bcryptjs:** Biblioteca para hash de senhas de forma segura.
* **better-sqlite3:** Biblioteca rápida e simples para interagir com bancos de dados SQLite.

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* **Node.js:** (Versão 16 ou superior recomendada) - [https://nodejs.org/](https://nodejs.org/)
* **npm** (geralmente instalado com Node.js) ou **yarn** - [https://yarnpkg.com/](https://yarnpkg.com/)
* **Git:** (para clonar o repositório) - [https://git-scm.com/](https://git-scm.com/)
* **Postman:** (para testar os endpoints da API) - [https://www.postman.com/](https://www.postman.com/) ou **cURL** (ferramenta de linha de comando para fazer requisições HTTP).

## 🛠️ Como Configurar e Executar

1.  **Clone o repositório:**

    ```bash
    git clone [https://docs.github.com/articles/referencing-and-citing-content](https://docs.github.com/articles/referencing-and-citing-content)
    cd [https://github.com/DiegoCosta-DOC/Desafio_3.git]
    ```
2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Execute a API:**

    ```bash
    node index.js
    # ou
    npm start
    # ou
    yarn start
    ```

    A API estará rodando em `http://localhost:3000`. O banco de dados SQLite (`users.db`) será criado automaticamente na primeira execução.

## 🧪 Testando os Endpoints

Utilize o Postman ou cURL para interagir com os seguintes endpoints:

### 1. Registrar um novo usuário (`POST /register`)

* **Método:** `POST`
* **URL:** `http://localhost:3000/register`
* **Headers:** `Content-Type: application/json`
* **Corpo (JSON):**

    ```json
    {
        "username": "seu_novo_usuario",
        "password": "sua_senha_segura"
    }
    ```
* **Resposta Esperada (Sucesso - Status 201):** `"Usuário registrado com sucesso."`
* **Resposta Esperada (Erro - Status 400):**
    * `"Nome de usuário e senha são obrigatórios."`
    * `"Usuário já registrado."`

### 2. Fazer login e obter token JWT (`POST /login`)

* **Método:** `POST`
* **URL:** `http://localhost:3000/login`
* **Headers:** `Content-Type: application/json`
* **Corpo (JSON):** Utilize as mesmas credenciais usadas no registro.

    ```json
    {
        "username": "seu_novo_usuario",
        "password": "sua_senha_segura"
    }
    ```
* **Resposta Esperada (Sucesso - Status 200):**

    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzZXVfbm92b191c3VhcmlvIiwiaWF0IjoxNzE0ODIxNDIyLCJleHAiOjE3MTQ4MjUwMjJ9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
    ```
* **Resposta Esperada (Erro - Status 404):** `"Usuário não encontrado."`
* **Resposta Esperada (Erro - Status 400):** `"Senha incorreta."`

### 3. Acessar rota protegida (`GET /protected`)

* **Método:** `GET`
* **URL:** `http://localhost:3000/protected`
* **Headers:** Adicione um header de autorização com o token JWT obtido no login.

    ```http
    Authorization: Bearer [SEU_TOKEN_AQUI]
    ```
* **Resposta Esperada (Sucesso - Status 200):**

    ```json
    "Acesso permitido! Bem-vindo, seu_novo_usuario"
    ```
* **Resposta Esperada (Erro - Status 403):**
    * `"Acesso negado. Token não fornecido."`
    * `"Token inválido."`

## 🧪 Testando com cURL

Você também pode testar os endpoints utilizando o cURL no seu terminal:

**➤ Registrar usuário:**

```bash
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"username":"teste_curl","password":"senha_curl"}'