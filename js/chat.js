document.addEventListener('DOMContentLoaded', () => {
    // Conecta-se ao servidor Socket.io
    // A biblioteca 'socket.io.js' já foi adicionada no seu HTML
    const socket = io(); 
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages-container');

    // Pega o apelido do usuário que foi salvo no login
    const userApelido = localStorage.getItem('userApelido');
    if (!userApelido) {
        // Se não houver apelido, redireciona para a página de login por segurança
        window.location.href = '/login.html';
        return;
    }

    // Função para adicionar uma nova mensagem na tela
    function addMessage(msg) {
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble');

        // Adiciona a classe correta para o estilo da bolha (minha ou da outra pessoa)
        if (msg.apelido.toLowerCase() === userApelido.toLowerCase()) {
            messageBubble.classList.add('my-message');
        } else {
            messageBubble.classList.add('other-message');
        }
        
        messageBubble.textContent = msg.texto;
        messagesContainer.appendChild(messageBubble);

        // Rola a tela automaticamente para a última mensagem
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Escuta o evento de envio do formulário
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário
        const texto = messageInput.value.trim();
        if (texto) {
            // Envia um objeto com o apelido e o texto para o servidor
            socket.emit('chat message', {
                apelido: userApelido,
                texto: texto
            });
            messageInput.value = ''; // Limpa o campo de texto
        }
    });

    // Escuta o evento 'chat message' que vem do servidor
    socket.on('chat message', (msg) => {
        addMessage(msg);
    });
});