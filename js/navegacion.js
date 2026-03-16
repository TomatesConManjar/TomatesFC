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
            
            // Ejecutar funciones SOLO si existen
            setTimeout(() => {
                // Para detalles de jugador
                if (seccion === 'detalle-jugador' && jugadorSeleccionado && typeof window.showPlayerDetails === 'function') {
                    window.showPlayerDetails(jugadorSeleccionado);
                }
                // Para detalles de partido
                if (seccion === 'detalle-partido' && partidoSeleccionado && typeof window.showMatchDetails === 'function') {
                    window.showMatchDetails(partidoSeleccionado);
                }
                // Para detalles de rival
                if (seccion === 'detalle-rival' && rivalSeleccionado && typeof window.showRivalDetails === 'function') {
                    window.showRivalDetails(rivalSeleccionado);
                }
                // Para partidos
                if (seccion === 'partidos' && typeof window.renderMatches === 'function') {
                    window.renderMatches();
                }
                // Para rivales
                if (seccion === 'rivales' && typeof window.renderRivales === 'function') {
                    window.renderRivales();
                }
                // Para estadísticas
                if (seccion === 'estadisticas' && typeof window.renderTeamStats === 'function') {
                    window.renderTeamStats();
                }
            }, 100);
            
            // Cerrar menú móvil si está abierto
            const mobileMenu = document.getElementById('mobile-menu');
            const menuOverlay = document.getElementById('menu-overlay');
            if (mobileMenu && menuOverlay) {
                mobileMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            }
        })
        .catch(error => {
            contenedor.innerHTML = '<p class="text-center py-16 text-red-600">Error al cargar la sección</p>';
            console.error('Error cargando sección:', error);
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
