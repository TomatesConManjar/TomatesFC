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
            
            // Ejecutar código específico según la sección cargada
            if (seccion === 'partidos') {
                renderMatches(); // Renderiza lista de partidos
            }
            if (seccion === 'equipo') {
                renderTeam(); // Renderiza tarjetas de jugadores
            }
            if (seccion === 'rivales') {
                renderRivales(); // Renderiza lista de rivales
            }
            if (seccion === 'estadisticas') {
                renderTeamStats(); // Renderiza estadísticas del equipo
            }
            if (seccion === 'detalle-jugador' && jugadorSeleccionado) {
                showPlayerDetails(jugadorSeleccionado); // Muestra detalles del jugador
            }
            if (seccion === 'detalle-partido' && partidoSeleccionado) {
                showMatchDetails(partidoSeleccionado); // Muestra detalles del partido
            }
            if (seccion === 'detalle-rival' && rivalSeleccionado) {
                showRivalDetails(rivalSeleccionado); // Muestra detalles del rival
            }
            
            // Cerrar menú móvil si está abierto
            const mobileMenu = document.getElementById('mobile-menu');
            const menuOverlay = document.getElementById('menu-overlay');
            if (mobileMenu && menuOverlay) {
                mobileMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            }
        })
        .catch(error => {
            contenedor.innerHTML = '<p>Error al cargar la sección</p>';
            console.error(error);
        });
}

// Función para marcar botón activo en navbar
function actualizarNavbar(seccionActiva) {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.classList.remove('text-yellow-400');
    });
}

// Cargar inicio al abrir la página
window.addEventListener('DOMContentLoaded', () => {
    cargarSeccion('inicio');
});

// Variables globales para guardar qué se seleccionó
let jugadorSeleccionado = null;
let partidoSeleccionado = null;
let rivalSeleccionado = null;

// Funciones para navegación a detalles
function verDetalleJugador(nombreJugador) {
    jugadorSeleccionado = nombreJugador;
    cargarSeccion('detalle-jugador');
}

function verDetallePartido(idPartido) {
    partidoSeleccionado = idPartido;
    cargarSeccion('detalle-partido');
}

function verDetalleRival(nombreRival) {
    rivalSeleccionado = nombreRival;
    cargarSeccion('detalle-rival');
}
