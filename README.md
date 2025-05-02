# 🚀 Sistema de Autenticação com JWT

## 📌 Sobre o projeto
Este projeto implementa um sistema simples de autenticação utilizando **JWT (JSON Web Token)**. Ele permite que usuários se registrem, façam login e acessem rotas protegidas.

✅ Registro e login de usuários  
✅ Geração e validação de tokens JWT  
✅ Proteção de endpoints utilizando autenticação  

---

## 📂 Estrutura do projeto

📦 projeto-autenticacao ┣ 📜 server.js # Arquivo principal do servidor ┣ 📜 README.md # Documentação do projeto ┗ 📂 node_modules # Dependências do projeto (geradas pelo npm)


---

## 🛠️ Tecnologias usadas
- **Node.js** - Runtime para execução do JavaScript no servidor.
- **Express.js** - Framework para criação da API.
- **JWT (jsonwebtoken)** - Geração e validação de tokens de autenticação.
- **bcryptjs** - Hashing de senhas para segurança.

---

## ⚙️ Instalação

1️⃣ **Clone este repositório**  
```sh
git clone https://github.com/seu-usuario/projeto-autenticacao.git
2️⃣ Acesse a pasta do projeto

sh
cd projeto-autenticacao
3️⃣ Instale as dependências

sh
npm install
4️⃣ Inicie o servidor

sh
node server.js
🔹 O servidor rodará em http://localhost:3000.

🔐 Endpoints disponíveis
1️⃣ Registrar um usuário
Método: POST

URL: /register

Body (JSON):

json
{
  "username": "diego",
  "password": "minhaSenhaSegura"
}
Resposta esperada: "Usuário registrado com sucesso."

2️⃣ Fazer login e obter o token JWT
Método: POST

URL: /login

Body (JSON):

json
{
  "username": "diego",
  "password": "minhaSenhaSegura"
}
Resposta esperada:

json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
🔹 Copie esse token, pois ele será necessário para acessar a rota protegida.

3️⃣ Acessar rota protegida
Método: GET

URL: /protected

Headers:

Authorization: Bearer SEU_TOKEN_AQUI
Resposta esperada: "Acesso permitido! Bem-vindo, diego"

📌 Considerações finais
✅ Senhas dos usuários são hashadas com bcryptjs antes de serem armazenadas. ✅ Tokens JWT são gerados com tempo de expiração (expiresIn: '1h'). ✅ Middleware de autenticação (authenticateJWT) protege rotas sensíveis.