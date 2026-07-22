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
            window.showPlayerStatsSubSection();
            const offset = 80;
            window.scrollTo({ top: statsSection.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error en showStats:', error);
    }
};

// Función legacy (puede ser llamada desde historial de navegación)
window.showStatsDashboardHome = function() {
    window.showPlayerStatsSubSection();
};

// Muestra las estadísticas individuales de los jugadores
window.showPlayerStatsSubSection = function() {
    const playersView = document.getElementById('stats-players-view');
    const comparisonView = document.getElementById('stats-comparison-view');
    const title = document.getElementById('stats-section-title');
    const tabStats = document.getElementById('tab-estadisticas');
    const tabComp = document.getElementById('tab-comparador');
    if (playersView) playersView.classList.remove('hidden');
    if (comparisonView) comparisonView.classList.add('hidden');
    if (title) title.textContent = 'ESTADÍSTICAS';
    if (tabStats) { tabStats.className = 'px-6 py-2 rounded-full font-bold bg-red-800 text-white transition'; }
    if (tabComp)  { tabComp.className  = 'px-6 py-2 rounded-full font-bold bg-gray-200 text-gray-700 transition'; }
    renderTeamStats();
};

// Muestra el comparador de jugadores H2H
window.showPlayerComparisonSubSection = function() {
    const playersView = document.getElementById('stats-players-view');
    const comparisonView = document.getElementById('stats-comparison-view');
    const title = document.getElementById('stats-section-title');
    const tabStats = document.getElementById('tab-estadisticas');
    const tabComp = document.getElementById('tab-comparador');
    if (playersView) playersView.classList.add('hidden');
    if (comparisonView) comparisonView.classList.remove('hidden');
    if (title) title.textContent = 'COMPARADOR';
    if (tabStats) { tabStats.className = 'px-6 py-2 rounded-full font-bold bg-gray-200 text-gray-700 transition'; }
    if (tabComp)  { tabComp.className  = 'px-6 py-2 rounded-full font-bold bg-red-800 text-white transition'; }
    initPlayerComparison();
};


// Vuelve al listado completo desde la sección de estadísticas
window.goBack = function() {
    ['inicio', 'historia', 'equipo', 'partidos', 'rivales'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('hidden');
    });
    ['stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    window.history.pushState({ section: 'equipo' }, '', '#equipo');
    const equipoSection = document.getElementById('equipo');
    const offset = 80;
    window.scrollTo({ top: equipoSection.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
};


// Año activo del comparador (2025, 2026 o 'historico')
let compareYear = 2025;

// Cambia el año del comparador y actualiza los botones
window.setCompareYear = function(year) {
    compareYear = year;
    const years = [2025, 2026, 'historico'];
    years.forEach(y => {
        const btn = document.getElementById(`compare-year-${y}`);
        if (!btn) return;
        if (y === year) {
            btn.className = 'px-5 py-2 rounded-full font-bold bg-red-800 text-white transition';
        } else {
            btn.className = 'px-5 py-2 rounded-full font-bold bg-gray-200 text-gray-700 transition';
        }
    });
    comparePlayers();
};

// Inicializa el comparador de jugadores (carga los dropdowns)
function initPlayerComparison() {
    const select1 = document.getElementById('compare-select-1');
    const select2 = document.getElementById('compare-select-2');
    if (!select1 || !select2) return;

    select1.innerHTML = '';
    select2.innerHTML = '';

    const keys = Object.keys(jugadoresData);
    keys.forEach((key) => {
        const pName = jugadoresData[key].nombre;
        select1.innerHTML += `<option value="${key}">${pName}</option>`;
        select2.innerHTML += `<option value="${key}">${pName}</option>`;
    });

    // Seleccionar por defecto el primero y el segundo
    if (keys.length > 1) {
        select1.value = keys[0];
        select2.value = keys[1];
    }

    // Restaurar estilo del botón activo de año
    window.setCompareYear(compareYear);
}


// Ejecuta la comparación y dibuja la UI del H2H
window.comparePlayers = function() {
    const select1 = document.getElementById('compare-select-1');
    const select2 = document.getElementById('compare-select-2');
    if (!select1 || !select2) return;

    const p1Id = select1.value;
    const p2Id = select2.value;

    const p1 = jugadoresData[p1Id];
    const p2 = jugadoresData[p2Id];
    if (!p1 || !p2) return;

    // Filtrar partidos según año seleccionado
    const filtrarPartidos = (jugador) => {
        return jugador.partidos.filter(p => {
            if (compareYear === 'historico') return true;
            const pd = partidosData[p.id] || partidosData[String(p.id)];
            return pd && pd.temporada === compareYear;
        });
    };

    // Calcular estadísticas con filtro de temporada
    const calcStats = (jugador) => {
        const partsFiltrados = filtrarPartidos(jugador);
        const goles = partsFiltrados.reduce((sum, p) => sum + p.goles, 0);
        const asistencias = partsFiltrados.reduce((sum, p) => sum + p.asistencias, 0);
        const partidos = partsFiltrados.length;
        const golesPP = partidos > 0 ? (goles / partidos) : 0;
        const asistPP = partidos > 0 ? (asistencias / partidos) : 0;
        const gAPP = partidos > 0 ? ((goles + asistencias) / partidos) : 0;

        // Porcentaje de victorias
        let victorias = 0;
        partsFiltrados.forEach(p => {
            const pd = partidosData[p.id] || partidosData[String(p.id)];
            if (pd && pd.resultado) {
                const [gf, gc] = pd.resultado.split('-').map(Number);
                if (gf > gc) victorias++;
            }
        });
        const pctVictorias = partidos > 0 ? (victorias / partidos) * 100 : 0;

        return { goles, asistencias, partidos, golesPP, asistPP, gAPP, victorias, pctVictorias };
    };

    const s1 = calcStats(p1);
    const s2 = calcStats(p2);

    // Renderizar tarjetas de perfil
    const renderCard = (cardId, jugador) => {
        const card = document.getElementById(cardId);
        if (!card) return;
        card.innerHTML = `
            <div class="inline-block relative">
                <img src="${jugador.imagenCamiseta}" alt="${jugador.nombre}" class="compare-jersey-img rounded-xl" onerror="this.src='https://via.placeholder.com/150x200?text=Camiseta'">
                <div class="absolute -top-2 -right-2 bg-red-800 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
                    #${jugador.numero}
                </div>
            </div>
            <h4 class="text-xl font-bold text-gray-800 dark:text-white mt-4">${jugador.nombre}</h4>
            <p class="text-gray-500 dark:text-gray-400 text-sm font-semibold">${jugador.posicion}</p>
        `;
    };

    renderCard('compare-card-1', p1);
    renderCard('compare-card-2', p2);

    // Configuración de métricas a comparar
    const statsConfig = [
        { key: 'partidos',     label: 'Partidos Jugados',      isFloat: false, decimals: 0 },
        { key: 'goles',        label: 'Goles Totales',         isFloat: false, decimals: 0 },
        { key: 'asistencias',  label: 'Asistencias Totales',   isFloat: false, decimals: 0 },
        { key: 'golesPP',      label: 'Promedio Goles/Partido', isFloat: true,  decimals: 2 },
        { key: 'asistPP',      label: 'Promedio Asist/Partido', isFloat: true,  decimals: 2 },
        { key: 'gAPP',         label: 'Promedio G+A/Partido',  isFloat: true,  decimals: 2 },
        { key: 'pctVictorias', label: '% Victorias',           isFloat: true,  decimals: 1, suffix: '%' },
    ];

    const container = document.getElementById('compare-stats-container');
    if (!container) return;
    container.innerHTML = '';

    statsConfig.forEach(cfg => {
        const val1 = s1[cfg.key];
        const val2 = s2[cfg.key];

        const suffix = cfg.suffix || '';
        const displayVal1 = cfg.isFloat ? val1.toFixed(cfg.decimals) + suffix : val1 + suffix;
        const displayVal2 = cfg.isFloat ? val2.toFixed(cfg.decimals) + suffix : val2 + suffix;

        const maxVal = Math.max(val1, val2, 0.01);
        const percent1 = (val1 / maxVal) * 100;
        const percent2 = (val2 / maxVal) * 100;

        const isWinner1 = val1 > val2;
        const isWinner2 = val2 > val1;

        container.innerHTML += `
            <div class="compare-stat-row">
                <!-- Etiquetas de valores y Nombre de la métrica -->
                <div class="flex justify-between items-center mb-2">
                    <span class="text-lg font-bold text-gray-700 dark:text-gray-300 w-16 text-left ${isWinner1 ? 'compare-winner' : ''}">${displayVal1}</span>
                    <span class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">${cfg.label}</span>
                    <span class="text-lg font-bold text-gray-700 dark:text-gray-300 w-16 text-right ${isWinner2 ? 'compare-winner' : ''}">${displayVal2}</span>
                </div>
                <!-- Barras de comparación -->
                <div class="flex items-center gap-4">
                    <!-- Jugador 1 Bar (de derecha a izquierda) -->
                    <div class="compare-bar-left">
                        <div class="compare-fill compare-fill-left" style="width: ${percent1}%; background-color: ${isWinner1 ? '#10B981' : '#EF4444'}"></div>
                    </div>
                    <!-- Jugador 2 Bar (de izquierda a derecha) -->
                    <div class="compare-bar-right">
                        <div class="compare-fill compare-fill-right" style="width: ${percent2}%; background-color: ${isWinner2 ? '#10B981' : '#D97706'}"></div>
                    </div>
                </div>
            </div>
        `;
    });
};



let temporadaJugador = 2025;
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
