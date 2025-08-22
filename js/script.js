document.addEventListener('DOMContentLoaded', function() {
    const accessButton = document.querySelector('.Acesso');

    if (accessButton) {
        accessButton.addEventListener('click', function() {
            // Redireciona para a página de login.html
            window.location.href = 'login.html';
        });
    }

    const loginForm = document.getElementById('login-form');
    const userInput = document.getElementById('user');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const apelido = userInput.value.trim();
        const senha = passwordInput.value.trim();

        const loginData = {
            apelido: apelido,
            senha: senha
        };

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();

            if (result.success) {
                // Salva o apelido no localStorage para uso futuro (ex: no chat)
                localStorage.setItem('userApelido', apelido);
                alert('Login bem-sucedido!');
                window.location.href = 'chat.html';
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Não foi possível conectar ao servidor. Tente novamente.');
        }
    });

    


});

