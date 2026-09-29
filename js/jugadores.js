// ============================================================
// JUGADORES - Perfil individual de jugador
// Dependencias: data.js (jugadoresData, partidosData)
// Stats y Comparador H2H → stats.js
// Pizarra Táctica        → tactica.js
// ============================================================

let temporadaJugador = 2025;

// Muestra el perfil detallado de un jugador
window.showPlayerDetails = function(playerId) {
    const jugador = jugadoresData[playerId];
    if (!jugador) { console.error('Jugador no encontrado:', playerId); return; }

    const detalles = document.getElementById('player-details-section');
    if (detalles && detalles.classList.contains('hidden')) {
        window.savedScrollPosition = window.scrollY;
    }

    ['inicio', 'historia', 'equipo', 'partidos', 'rivales', 'stats-section', 'match-details-section'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    if (!detalles) return;
    detalles.classList.remove('hidden');
    window.history.pushState({ section: 'player-details', playerId }, '', `#jugador/${playerId}`);

    // Estado y estilo del jugador
    const estado = jugador.estado || 'Activo';
    let estadoBadgeHTML = '';
    const estadoLower = estado.toLowerCase();

    if (estadoLower.includes('lesionad')) {
        estadoBadgeHTML = `
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-300 shadow-sm" title="Estado: Lesionado">
                <span class="text-red-600 font-extrabold text-sm leading-none">✕</span>
                <span>Lesionado</span>
            </span>`;
    } else if (estadoLower.includes('cedid')) {
        const textoCedido = (estadoLower.includes('bélgica') || estadoLower.includes('belgica'))
            ? 'Cedido a Bélgica'
            : (jugador.estadoDetalle ? `Cedido a ${jugador.estadoDetalle}` : 'Cedido');
        estadoBadgeHTML = `
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-300 shadow-sm" title="Estado: ${textoCedido}">
                <span class="text-orange-500 font-bold text-sm leading-none">⇆</span>
                <span>${textoCedido}</span>
            </span>`;
    } else if (estadoLower.includes('inactiv')) {
        estadoBadgeHTML = `
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-300 shadow-sm" title="Estado: Inactivo">
                <span class="w-2 h-2 rounded-full bg-gray-400"></span>
                <span>Inactivo</span>
            </span>`;
    } else {
        estadoBadgeHTML = `
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-300 shadow-sm" title="Estado: Activo">
                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Activo</span>
            </span>`;
    }

    const fechaNacimiento = jugador.fechaNacimiento || '25 de diciembre de 2004';

    const fotoJugador = jugador.foto || {
        'agustin-vilhelm': 'images/foto_agustin.jpg',
        'leandro-zavala': 'images/foto_zavala.png',
        'francisco-lizama': 'images/foto_lizama.png',
        'benjamin-garces': 'images/foto_garces.jpg',
        'cristobal-santibanez': 'images/foto_kryz.png',
        'matias-paredes': 'images/foto_paredes.png',
        'diego-manque': 'images/foto_diego.png',
        'sebastian-sandoval': 'images/foto_saso.jpg',
        'matias-bustamante': 'images/foto_matib.png'
    }[playerId];

    // Header
    document.getElementById('player-header').innerHTML = `
        <div class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div class="relative">
                <div class="w-48 h-60 bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center text-white rounded-lg shadow-lg relative overflow-hidden">
                    ${fotoJugador ? `
                        <img src="${fotoJugador}" alt="Foto de ${jugador.nombre}" class="w-full h-full object-cover">
                    ` : `
                        <i class="fas fa-user text-8xl mb-4 text-gray-300"></i>
                    `}
                </div>
                <div class="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-red-800 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg z-10">
                    ${jugador.numero}
                </div>
            </div>
            <div class="flex-1 text-center md:text-left">
                <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                    <h1 class="text-4xl font-bold text-red-800 dark:text-red-400">${jugador.nombre}</h1>
                    ${estadoBadgeHTML}
                </div>
                <p class="text-xl text-gray-600 dark:text-gray-300 mb-2">${jugador.posicion}</p>
                <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                    <span class="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 px-3.5 py-1.5 rounded-full text-sm font-semibold border border-red-200 dark:border-red-800/50 shadow-sm">
                        <i class="fas fa-birthday-cake text-red-600 dark:text-red-400"></i>
                        <span>Cumpleaños: <strong>${fechaNacimiento}</strong></span>
                    </span>
                </div>
                <p class="text-lg text-gray-700 dark:text-gray-300 italic mb-6">"${jugador.frase}"</p>
            </div>
        </div>

        <div class="flex gap-3 mt-4">
            <button onclick="cambiarTemporadaJugador('${playerId}', 2025)" id="btn-jugador-2025"
                class="px-4 py-1 rounded-full font-bold ${temporadaJugador === 2025 ? 'bg-red-800 text-white' : 'bg-gray-200 text-gray-700'}">2025</button>
            <button onclick="cambiarTemporadaJugador('${playerId}', 2026)" id="btn-jugador-2026"
                class="px-4 py-1 rounded-full font-bold ${temporadaJugador === 2026 ? 'bg-red-800 text-white' : 'bg-gray-200 text-gray-700'}">2026</button>
        </div>
    `;

    // Stats generales
    const partidosFiltrados = jugador.partidos.filter(p => {
        const pd = partidosData[p.id] || partidosData[String(p.id)];
        return pd && pd.temporada === temporadaJugador;
    });
    const totalGoles = partidosFiltrados.reduce((sum, p) => sum + p.goles, 0);
    const totalAsistencias = partidosFiltrados.reduce((sum, p) => sum + p.asistencias, 0);
    const partidosJugados = partidosFiltrados.length;
    const totalContribuciones = totalGoles + totalAsistencias;

    // Calcular porcentaje de victorias históricas del jugador
    let victoriasJugador = 0;
    partidosFiltrados.forEach(p => {
        const pd = partidosData[p.id] || partidosData[String(p.id)];
        if (pd && pd.resultado) {
            const [gf, gc] = pd.resultado.split('-').map(Number);
            if (gf > gc) victoriasJugador++;
        }
    });
    const porcentajeVictorias = partidosJugados > 0 ? ((victoriasJugador / partidosJugados) * 100).toFixed(1) : 0;

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
            <div class="text-xs text-gray-500 mt-1">de ${Object.values(partidosData).filter(p => p.temporada === temporadaJugador).length} totales</div>
        </div>
        <div class="stat-card bg-white rounded-lg p-6 shadow-lg text-center">
            <div class="text-3xl font-bold text-orange-600 mb-2">${totalContribuciones}</div>
            <div class="text-sm text-gray-600">Contribuciones</div>
            <div class="text-xs text-gray-500 mt-1">Goles + Asistencias</div>
        </div>
        <div class="stat-card bg-white rounded-lg p-6 shadow-lg text-center">
            <div class="text-3xl font-bold text-red-700 mb-2">${porcentajeVictorias}%</div>
            <div class="text-sm text-gray-600">% Victorias</div>
            <div class="text-xs text-gray-500 mt-1">${victoriasJugador} de ${partidosJugados} partidos</div>
        </div>
    `;

    // Rendimiento por partido
    let matchPerformancesHTML = '';
    partidosFiltrados.forEach(partido => {
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

    // Scroll instantáneo arriba sin animación
    window.scrollTo({ top: detalles.getBoundingClientRect().top + window.scrollY - 80, behavior: 'instant' });
};

// Vuelve al equipo desde el perfil de un jugador
window.backToTeam = function() {
    document.getElementById('player-details-section').classList.add('hidden');
    ['inicio', 'historia', 'equipo', 'partidos', 'rivales'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('hidden');
    });
    window.history.pushState({ section: 'equipo' }, '', '#equipo');
    if (typeof window.restoreScrollOrSection === 'function') {
        window.restoreScrollOrSection('equipo');
    } else {
        window.scrollTo({ top: window.savedScrollPosition || 0, behavior: 'instant' });
    }
};

window.cambiarTemporadaJugador = function(playerId, temporada) {
    temporadaJugador = temporada;
    showPlayerDetails(playerId);
    document.getElementById('btn-jugador-2025').className = temporada === 2025
        ? 'px-4 py-1 rounded-full font-bold bg-red-800 text-white'
        : 'px-4 py-1 rounded-full font-bold bg-gray-200 text-gray-700';
    document.getElementById('btn-jugador-2026').className = temporada === 2026
        ? 'px-4 py-1 rounded-full font-bold bg-red-800 text-white'
        : 'px-4 py-1 rounded-full font-bold bg-gray-200 text-gray-700';
};
