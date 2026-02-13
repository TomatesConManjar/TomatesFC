// Función para cargar secciones
function cargarSeccion(seccion) {
    const contenedor = document.getElementById('contenido-principal');
    
    fetch(`secciones/${seccion}.html`)
        .then(response => {
            if (!response.ok) throw new Error('Sección no encontrada');
            return response.text();
        })
        .then(html => {
            contenedor.innerHTML = html;
            actualizarNavbar(seccion);
        })
        .catch(error => {
            contenedor.innerHTML = '<p>Error al cargar la sección</p>';
            console.error(error);
        });
}

// Función para marcar botón activo
function actualizarNavbar(seccionActiva) {
    const botones = document.querySelectorAll('nav button');
    botones.forEach(btn => {
        btn.classList.remove('activo');
        if (btn.textContent.toLowerCase() === seccionActiva) {
            btn.classList.add('activo');
        }
    });
}

// Cargar la sección de inicio al abrir la página
window.addEventListener('DOMContentLoaded', () => {
    cargarSeccion('inicio');
});
