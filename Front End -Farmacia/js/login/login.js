const USERS = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'empleado', password: 'empleado123', role: 'empleado' }
];

// Función para generar un JWT (simulación en local, no seguro para producción)
function generateJWT(user) {
    const payload = { username: user.username, role: user.role };
    const secret = 'secretoSuperSecreto'; // No usar esto en producción
    const token = btoa(JSON.stringify(payload) + '.' + secret); // Simulación de JWT
    return token;
}

// Función para verificar el JWT y obtener el payload
function verifyJWT(token) {
    const [payload, secret] = atob(token).split('.');
    return JSON.parse(payload); // Devuelve el payload con el username y role
}

// Función de inicio de sesión
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Comprobar si el usuario existe
    const user = USERS.find(user => user.username === username && user.password === password);

    if (user) {
        // Generar el JWT
        const token = generateJWT(user);
        localStorage.setItem('jwt', token); // Guardar el JWT en localStorage

        // Redirigir según el rol
        if (user.role === 'admin') {
            window.location.href = 'http://127.0.0.1:5500/navegacion/nav.admin.html'; // Página principal para admin
        } else {
            window.location.href = 'http://127.0.0.1:5500/navegacion/nav.empleado.html'; // Página principal para empleado
        }
    } else {
        alert('Credenciales incorrectas');
    }
});

// Función de cierre de sesión
function logout() {
    localStorage.removeItem('jwt'); // Eliminar el JWT del localStorage
    window.location.href = '/index.html'; // Redirigir a la página de inicio de sesión
}


    

// Función para verificar la autenticación y redirigir a la página correcta
function checkAuthentication() {
    const token = localStorage.getItem('jwt');
    if (token) {
        const user = verifyJWT(token);
        loadSidebar(user.role); // Cargar el sidebar según el rol

        // Redirigir al usuario a la página principal correspondiente según su rol
        if (user.role === 'admin') {
            if (window.location.pathname !== '/pages/alumnos.html') {
                window.location.href = '/pages/alumnos.html'; // Página principal para admin
            }
        } else if (user.role === 'empleado') {
            if (window.location.pathname !== '/pages/ventas.html') {
                window.location.href = '/pages/ventas.html'; // Página principal para empleado
            }
        }
    } else {
        window.location.href = '/index.html'; // Redirigir al login si no hay JWT
    }
}

// Comprobar si el usuario está autenticado en una página protegida
if (window.location.pathname === '/pages/alumnos.html' || window.location.pathname === '/pages/ventas.html') {
    checkAuthentication();
}


// Función de cierre de sesión
function logout() {
    localStorage.removeItem('jwt'); // Eliminar el JWT del localStorage
    window.location.href = 'http://127.0.0.1:5500/index.html'; // Redirigir a la página de inicio de sesión
}
