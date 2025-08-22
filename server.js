const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http'); // Módulo do Node.js para criar um servidor HTTP
const { Server } = require("socket.io"); // Módulo do Socket.io

const app = express();
const server = http.createServer(app); // Cria o servidor HTTP com base no Express
const io = new Server(server); // Cria o servidor do Socket.io

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '')));

// Rota principal para a página de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Dados de acesso
const DADOS_ACESSO = {
    'princesa': '220923',
    'xuxu': '220923'
};

app.post('/login', (req, res) => {
    const { apelido, senha } = req.body;
    const apelidoMinusculo = apelido.toLowerCase();

    if (DADOS_ACESSO[apelidoMinusculo] && DADOS_ACESSO[apelidoMinusculo] === senha) {
        console.log(`Login bem-sucedido para o usuário: ${apelido}`);
        res.status(200).json({ success: true, message: 'Login bem-sucedido.' });
    } else {
        console.log(`Tentativa de login falhou para o apelido: ${apelido}`);
        res.status(401).json({ success: false, message: 'Apelido ou senha incorretos.' });
    }
});

// Lógica do Socket.io
io.on('connection', (socket) => {
    console.log('Um usuário conectado.');

    // Evento de "chat message" recebido
    socket.on('chat message', (msg) => {
        console.log('Mensagem recebida:', msg);
        // Emite a mensagem para todos os clientes conectados
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Um usuário desconectou.');
    });
});

// O servidor agora escuta na porta 3000
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});