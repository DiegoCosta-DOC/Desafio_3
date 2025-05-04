const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./database'); // Importando banco de dados

const app = express();
const port = 3000;

app.use(express.json());

const secretKey = 'secreta_chave_jwt'; // Chave secreta do JWT

// Função para gerar um token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
};

// POST /register - Registrar usuário
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Nome de usuário e senha são obrigatórios.');
        }

        // Verifica se o usuário já existe
        const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
        if (existingUser) {
            return res.status(400).send('Usuário já registrado.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hashedPassword);

        res.status(201).send('Usuário registrado com sucesso.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar usuário.');
    }
});

// POST /login - Autenticação do usuário e geração do JWT
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

        if (!user) {
            return res.status(404).send('Usuário não encontrado.');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Senha incorreta.');
        }

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao fazer login.');
    }
});

// Middleware para verificar o token JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(403).send('Acesso negado. Token não fornecido.');
    }

    try {
        const user = jwt.verify(token, secretKey);
        req.user = user;
        next();
    } catch (error) {
        res.status(403).send('Token inválido.');
    }
};

// GET /protected - Rota protegida
app.get('/protected', authenticateJWT, (req, res) => {
    res.send(`Acesso permitido! Bem-vindo, ${req.user.username}`);
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
