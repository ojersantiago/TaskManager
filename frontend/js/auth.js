const API_URL = 'https://task-manager-backend-mcoz.onrender.com/api';

// Redirigir si ya está logueado
if (localStorage.getItem('token')) {
  window.location.href = 'index.html';
}

const errorMessage = document.getElementById('error-message');

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}

// ===== LOGIN =====
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      showError('Por favor completá todos los campos');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.message);
        return;
      }

      localStorage.setItem('token', data.token);
      window.location.href = 'index.html';

    } catch (error) {
      showError('Error al conectar con el servidor');
    }
  });
}

// ===== REGISTRO =====
const registerBtn = document.getElementById('register-btn');
if (registerBtn) {
  registerBtn.addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!name || !email || !password) {
      showError('Por favor completá todos los campos');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.message);
        return;
      }

      window.location.href = 'login.html';

    } catch (error) {
      showError('Error al conectar con el servidor');
    }
  });
}