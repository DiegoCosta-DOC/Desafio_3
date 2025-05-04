const Database = require('better-sqlite3');

// Inicializa o banco de dados
const db = new Database('users.db');

// Cria a tabela se não existir
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
`);

module.exports = db;
