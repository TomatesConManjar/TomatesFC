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
                renderMatches(); // Llamar función que renderiza partidos
            }
            if (seccion === 'equipo') {
                renderTeam(); // Llamar función que renderiza equipo
            }
            if (seccion === 'rivales') {
                renderRivals(); // Llamar función que renderiza rivales
            }
            if (seccion === 'detalle-jugador' && jugadorSeleccionado) {
                showPlayerDetails(jugadorSeleccionado);
            }
            if (seccion === 'detalle-partido' && partidoSeleccionado) {
                showMatchDetails(partidoSeleccionado);
            }
            if (seccion === 'detalle-rival' && rivalSeleccionado) {
                showRivalDetails(rivalSeleccionado);
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
