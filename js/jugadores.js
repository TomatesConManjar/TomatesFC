// ============================================================
// JUGADORES - Estadísticas y detalles de jugadores
// ============================================================

// Renderiza tarjetas de estadísticas de jugadores en la sección "Stats"
function renderTeamStats(searchTerm = '') {
    const container = document.getElementById('stats-players-container');
    if (!container) return;
    container.innerHTML = '';

    Object.entries(jugadoresData).forEach(([playerId, jugador]) => {
        if (searchTerm && !jugador.nombre.toLowerCase().includes(searchTerm.toLowerCase())) return;

        const totalGoles = jugador.partidos.reduce((sum, p) => sum + p.goles, 0);
        const totalAsistencias = jugador.partidos.reduce((sum, p) => sum + p.asistencias, 0);
        const partidosJugados = jugador.partidos.length;
        const golesPP = partidosJugados > 0 ? (totalGoles / partidosJugados).toFixed(2) : 0;
        const asistPP = partidosJugados > 0 ? (totalAsistencias / partidosJugados).toFixed(2) : 0;

        container.innerHTML += `
            <div class="player-card player-card-enhanced rounded-lg overflow-hidden shadow-lg transition duration-300 cursor-pointer" onclick="showPlayerDetails('${playerId}')">
                <div class="w-full h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center text-white rounded-t-lg relative">
                    <img src="${jugador.imagenCamiseta}" alt="Camiseta de ${jugador.nombre}" class="w-full h-full object-cover rounded-t-lg" onerror="this.src='https://via.placeholder.com/300x400?text=Imagen+No+Cargada'">
                </div>
                <div class="p-6">
                    <h3 class="font-bold text-xl mb-2 text-red-800">${jugador.nombre}</h3>
                    <p class="text-gray-600 mb-4">${jugador.posicion} #${jugador.numero}</p>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between py-2 border-b border-gray-100">
                            <div class="flex items-center">
                                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <span class="text-green-600 text-sm">⚽</span>
                                </div>
                                <span class="font-semibold text-gray-700">Goles</span>
                            </div>
                            <div class="text-right">
                                <span class="text-2xl font-bold text-green-600">${totalGoles}</span>
                                <p class="text-xs text-gray-500">${golesPP} por partido</p>
                            </div>
                        </div>
                        <div class="flex items-center justify-between py-2 border-b border-gray-100">
                            <div class="flex items-center">
                                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <span class="text-blue-600 text-sm">🎯</span>
                                </div>
                                <span class="font-semibold text-gray-700">Asistencias</span>
                            </div>
                            <div class="text-right">
                                <span class="text-2xl font-bold text-blue-600">${totalAsistencias}</span>
                                <p class="text-xs text-gray-500">${asistPP} por partido</p>
                            </div>
                        </div>
                        <div class="flex items-center justify-between py-2">
                            <div class="flex items-center">
                                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <span class="text-purple-600 text-sm">📅</span>
                                </div>
                                <span class="font-semibold text-gray-700">Partidos</span>
                            </div>
                            <span class="text-xl font-bold text-purple-600">${partidosJugados}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    if (!container.innerHTML && searchTerm) {
        container.innerHTML = '<p class="col-span-full text-center text-gray-500 py-8">No se encontraron jugadores con ese nombre.</p>';
    }
}

// Muestra la sección de estadísticas del equipo
window.showStats = function() {
    try {
        ['inicio', 'historia', 'equipo', 'partidos', 'rivales', 'match-details-section', 'player-details-section'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        const statsSection = document.getElementById('stats-section');
        if (statsSection) {
            statsSection.classList.remove('hidden');
            renderTeamStats();
            const offset = 80;
            window.scrollTo({ top: statsSection.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error en showStats:', error);
    }
};

// Vuelve al listado completo desde la sección de estadísticas
window.goBack = function() {
    ['inicio', 'historia', 'equipo', 'partidos', 'rivales'].forEach(id => {
        document.getElementById(id).classList.remove('hidden');
    });
    ['stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    window.history.pushState({ section: 'equipo' }, '', '#equipo');
    const equipoSection = document.getElementById('equipo');
    const offset = 80;
    window.scrollTo({ top: equipoSection.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
};

// Muestra el perfil detallado de un jugador
window.showPlayerDetails = function(playerId) {
    const jugador = jugadoresData[playerId];
    if (!jugador) { console.error('Jugador no encontrado:', playerId); return; }

    ['inicio', 'historia', 'equipo', 'partidos', 'rivales', 'stats-section', 'match-details-section'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    const detalles = document.getElementById('player-details-section');
    if (!detalles) return;
    detalles.classList.remove('hidden');

    // Header
    document.getElementById('player-header').innerHTML = `
        <div class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div class="relative">
                <div class="w-48 h-60 bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center text-white rounded-lg shadow-lg relative">
                    <i class="fas fa-user text-8xl mb-4 text-gray-300"></i>
                </div>
                <div class="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-red-800 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    ${jugador.numero}
                </div>
            </div>
            <div class="flex-1 text-center md:text-left">
                <h1 class="text-4xl font-bold text-red-800 mb-2">${jugador.nombre}</h1>
                <p class="text-xl text-gray-600 mb-4">${jugador.posicion} • #${jugador.numero}</p>
                <p class="text-lg text-gray-700 italic mb-6">"${jugador.frase}"</p>
            </div>
        </div>
    `;

    // Stats generales
    const totalGoles = jugador.partidos.reduce((sum, p) => sum + p.goles, 0);
    const totalAsistencias = jugador.partidos.reduce((sum, p) => sum + p.asistencias, 0);
    const partidosJugados = jugador.partidos.length;
    const totalContribuciones = totalGoles + totalAsistencias;

    document.getElementById('general-stats').innerHTML = `
        <div class="stat-card bg-white rounded-lg p-6 shadow-lg text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">${totalGoles}</div>
            <div class="text-sm text-gray-600">Goles Totales</div>
            <div class="text-xs text-gray-500 mt-1">${(totalGoles / partidosJugados).toFixed(2)} por partido</div>
        </div>
        <div class="stat-card bg-white rounded-lg p-6 shadow-lg text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">${totalAsistencias}</div>
            <div class="text-sm text-gray-600">Asistencias Totales</div>
            <div class="text-xs text-gray-500 mt-1">${(totalAsistencias / partidosJugados).toFixed(2)} por partido</div>
        </div>
        <div class="stat-card bg-white rounded-lg p-6 shadow-lg text-center">
            <div class="text-3xl font-bold text-purple-600 mb-2">${partidosJugados}</div>
            <div class="text-sm text-gray-600">Partidos Jugados</div>
            <div class="text-xs text-gray-500 mt-1">de 27 totales</div>
        </div>
        <div class="stat-card bg-white rounded-lg p-6 shadow-lg text-center">
            <div class="text-3xl font-bold text-orange-600 mb-2">${totalContribuciones}</div>
            <div class="text-sm text-gray-600">Contribuciones</div>
            <div class="text-xs text-gray-500 mt-1">Goles + Asistencias</div>
        </div>
    `;

    // Rendimiento por partido
    let matchPerformancesHTML = '';
    jugador.partidos.forEach(partido => {
        const partidoData = partidosData[partido.id];
        const resultado = partidoData ? partidoData.resultado : null;
        let esVictoria = false, esEmpate = false;
        if (resultado) {
            const [gf, gc] = resultado.split('-').map(Number);
            esVictoria = gf > gc;
            esEmpate = gf === gc;
        }
        let bgColor = 'bg-red-100', borderColor = 'border-red-300', textoResultado = 'Derrota';
        if (esVictoria) { bgColor = 'bg-green-100'; borderColor = 'border-green-300'; textoResultado = 'Victoria'; }
        else if (esEmpate) { bgColor = 'bg-yellow-100'; borderColor = 'border-yellow-300'; textoResultado = 'Empate'; }

        matchPerformancesHTML += `
            <div class="match-performance-card ${bgColor} rounded-lg p-6 shadow-lg border-2 ${borderColor} transition mb-4">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <div class="flex-1">
                        <div class="flex items-center space-x-4 mb-2">
                            <h4 class="font-bold text-lg text-gray-800">vs ${partido.rival}</h4>
                            <span class="px-3 py-1 text-xs font-semibold rounded-full ${bgColor.replace('-100', '-200')}">${textoResultado}</span>
                        </div>
                        <p class="text-gray-600 text-sm">${partido.fecha} • Resultado: ${resultado || 'N/A'}</p>
                    </div>
                    <div class="flex space-x-6 text-center">
                        <div>
                            <div class="text-2xl font-bold text-green-600">${partido.goles}</div>
                            <div class="text-xs text-gray-800">Goles</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-blue-600">${partido.asistencias}</div>
                            <div class="text-xs text-gray-800">Asistencias</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-orange-600">${partido.goles + partido.asistencias}</div>
                            <div class="text-xs text-gray-800">Total</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById('match-performances').innerHTML = matchPerformancesHTML;

    // Scroll
    const offset = 50;
    window.scrollTo({ top: detalles.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
};

// Vuelve al equipo desde el perfil de un jugador
window.backToTeam = function() {
    document.getElementById('player-details-section').classList.add('hidden');
    ['inicio', 'historia', 'equipo', 'partidos', 'rivales'].forEach(id => {
        document.getElementById(id).classList.remove('hidden');
    });
    window.history.pushState({ section: 'equipo' }, '', '#equipo');
    const equipoSection = document.getElementById('equipo');
    const offset = 80;
    window.scrollTo({ top: equipoSection.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
};
