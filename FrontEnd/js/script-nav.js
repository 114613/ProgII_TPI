// Función para ajustar el padding dinámicamente en base al tamaño del sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const wrapper = document.querySelector('.wrapper');
    
    // Cambiar el padding del wrapper dependiendo de si el sidebar está minimizado o no
    if (sidebar.classList.contains('minimized')) {
        wrapper.style.paddingLeft = '80px'; // Cuando el sidebar está minimizado
    } else {
        wrapper.style.paddingLeft = '250px'; // Cuando el sidebar está expandido
    }
}



$(document).ready(function() {
    // Evento de clic para alternar el tamaño de la barra lateral
    $("#toggleSidebar").click(function() {
        // Alternar la clase 'minimized' en el sidebar
        $(".sidebar").toggleClass("minimized");
        // Alternar la clase 'sidebar-minimized' en el contenido
        $(".content").toggleClass("sidebar-minimized");
    });
});

// Función para cargar el sidebar según el rol
function loadSidebar(role) {
    const sectionAcerca = document.getElementById('section-acerca');
    const sectionDashboard = document.getElementById('section-dashboard');
    const sectionVentas = document.getElementById('section-ventas');
    const sectionSoporte = document.getElementById('section-soporte');
}
// Mostrar/ocultar secciones según el rol
if (role === 'admin') {
    sectionAcerca.style.display = 'block';
    sectionDashboard.style.display = 'block';
    sectionVentas.style.display = 'block';
    sectionSoporte.style.display = 'block';
} else if (role === 'empleado') {
    sectionAcerca.style.display = 'none';  // Ocultar secciones de admin
    sectionDashboard.style.display = 'none'; // Ocultar Dashboard
    sectionVentas.style.display = 'block'; // Solo mostrar Ventas
    sectionSoporte.style.display = 'none'; // Ocultar Soporte
}

