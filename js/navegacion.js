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
            
            // Ejecutar código específico según la sección
            if (seccion === 'detalle-jugador' && jugadorSeleccionado) {
                mostrarDetallesJugador();
            }
            if (seccion === 'detalle-partido' && partidoSeleccionado) {
                mostrarDetallePartido();
            }
            if (seccion === 'detalle-rival' && rivalSeleccionado) {
                mostrarDetalleRival();
            }
            if (seccion === 'partidos') {
                cargarPartidos();
            }
            if (seccion === 'equipo') {
                cargarEquipo();
            }
            if (seccion === 'rivales') {
                cargarRivales();
            }
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

// Variables globales para guardar selecciones
let jugadorSeleccionado = null;
let partidoSeleccionado = null;
let rivalSeleccionado = null;

// Funciones para ver detalles
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
