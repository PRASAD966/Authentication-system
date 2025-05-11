// Register form submission
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Registration successful. Please login.');
      window.location.href = 'index.html';
    } else {
      alert(data.message || 'Registration failed.');
    }
  });
}

// Login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = 'home.html';
    } else {
      alert(data.message || 'Login failed.');
    }
  });
}

// Fetch welcome message
async function fetchWelcomeMessage() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  const res = await fetch('http://localhost:5000/api/welcome', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    document.getElementById('welcomeMessage').textContent = data.message;
  } else {
    alert('Session expired. Please login again.');
    logout();
  }
}

// Logout function
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}
