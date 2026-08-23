// Año activo del filtro de estadísticas individuales
let statsYear = 'historico';

// Cambia el año del filtro de estadísticas y actualiza botones
window.setStatsYear = function(year) {
    statsYear = year;
    const years = [2025, 2026, 'historico'];
    years.forEach(y => {
        const btn = document.getElementById(`stats-year-${y}`);
        if (!btn) return;
        if (y === year) {
            btn.className = 'px-5 py-2 rounded-full font-bold bg-red-800 text-white transition';
        } else {
            btn.className = 'px-5 py-2 rounded-full font-bold bg-gray-200 text-gray-700 transition';
        }
    });
    const searchTerm = document.getElementById('playerSearchStats')?.value || '';
    renderTeamStats(searchTerm);
};

// Renderiza tarjetas de estadísticas de jugadores en la sección "Stats"
function renderTeamStats(searchTerm = '') {
    const container = document.getElementById('stats-players-container');
    if (!container) return;
    container.innerHTML = '';

    Object.entries(jugadoresData).forEach(([playerId, jugador]) => {
        if (searchTerm && !jugador.nombre.toLowerCase().includes(searchTerm.toLowerCase())) return;

        // Filtrar partidos según statsYear
        const partidosFiltrados = statsYear === 'historico'
            ? jugador.partidos
            : jugador.partidos.filter(p => {
                const pd = partidosData[p.id] || partidosData[String(p.id)];
                return pd && pd.temporada === statsYear;
            });

        const totalGoles = partidosFiltrados.reduce((sum, p) => sum + p.goles, 0);
        const totalAsistencias = partidosFiltrados.reduce((sum, p) => sum + p.asistencias, 0);
        const partidosJugados = partidosFiltrados.length;
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
        window.savedScrollPosition = window.scrollY;
        ['inicio', 'historia', 'equipo', 'partidos', 'rivales', 'match-details-section', 'player-details-section'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        const statsSection = document.getElementById('stats-section');
        if (statsSection) {
            statsSection.classList.remove('hidden');
            window.showPlayerStatsSubSection();
            window.scrollTo({ top: 0, behavior: 'instant' });
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
    // Restaurar botón activo del filtro de año
    setStatsYear(statsYear);
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
    window.scrollTo({ top: window.savedScrollPosition || 0, behavior: 'instant' });
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

    window.savedScrollPosition = window.scrollY;

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

    // Scroll instantáneo arriba sin animación
    window.scrollTo({ top: detalles.getBoundingClientRect().top + window.scrollY - 80, behavior: 'instant' });
};

// Vuelve al equipo desde el perfil de un jugador
window.backToTeam = function() {
    document.getElementById('player-details-section').classList.add('hidden');
    ['inicio', 'historia', 'equipo', 'partidos', 'rivales'].forEach(id => {
        document.getElementById(id).classList.remove('hidden');
    });
    window.history.pushState({ section: 'equipo' }, '', '#equipo');
    window.scrollTo({ top: window.savedScrollPosition || 0, behavior: 'instant' });
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

// ============================================================
// PIZARRA TÁCTICA - Generador de Alineaciones
// ============================================================

// Datos de jugadores para la pizarra
const TACTICAL_PLAYERS = [
    { id: 'agustin-vilhelm',      name: 'A. Vilhelm',   num: 1,  img: 'images/foto_agustin.jpg',  pos: 'GK' },
    { id: 'leandro-zavala',       name: 'L. Zavala',    num: 5,  img: 'images/foto_zavala.png',   pos: 'DEF' },
    { id: 'francisco-lizama',     name: 'F. Lizama',    num: 6,  img: 'images/foto_lizama.png',   pos: 'DEF' },
    { id: 'benjamin-garces',      name: 'B. Garcés',    num: 7,  img: 'images/foto_garces.jpg',   pos: 'DEL' },
    { id: 'cristobal-santibanez', name: 'C. Santibáñez',num: 8,  img: 'images/foto_kryz.png',    pos: 'DEL' },
    { id: 'matias-paredes',       name: 'M. Paredes',   num: 9,  img: 'images/foto_paredes.png',  pos: 'DEL' },
    { id: 'diego-manque',         name: 'D. Manque',    num: 10, img: 'images/foto_diego.png',    pos: 'MED' },
    { id: 'sebastian-sandoval',   name: 'S. Sandoval',  num: 11, img: 'images/foto_saso.jpg',     pos: 'MED' },
    { id: 'matias-bustamante',    name: 'M. Bustamante',num: 14, img: 'images/foto_matib.png',   pos: 'MED' },
];

// Coordenadas de posición para cada formación (% x, % y — referenciados al campo)
const FORMATIONS = {
    // --- FÚTBOL 5 (1 Arquero + 4 Jugadores de Campo) ---
    '1-2-1': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DF',  x: 50, y: 72 },
        { label: 'MD',  x: 70, y: 50 }, { label: 'MI', x: 30, y: 50 },
        { label: 'DC',  x: 50, y: 28 },
    ],
    '1-1-2': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DF',  x: 50, y: 72 },
        { label: 'MC',  x: 50, y: 50 },
        { label: 'DC',  x: 68, y: 28 }, { label: 'DC', x: 32, y: 28 },
    ],
    '2-1-1': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DFD', x: 68, y: 70 }, { label: 'DFI', x: 32, y: 70 },
        { label: 'MC',  x: 50, y: 50 },
        { label: 'DC',  x: 50, y: 28 },
    ],

    // --- FÚTBOL 6 (1 Arquero + 5 Jugadores de Campo) ---
    '1-1-3': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DF',  x: 50, y: 72 },
        { label: 'MC',  x: 50, y: 50 },
        { label: 'ED',  x: 80, y: 28 }, { label: 'DC', x: 50, y: 28 }, { label: 'EI', x: 20, y: 28 },
    ],
    '1-2-2': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DF',  x: 50, y: 72 },
        { label: 'MD',  x: 68, y: 50 }, { label: 'MI', x: 32, y: 50 },
        { label: 'DC',  x: 68, y: 28 }, { label: 'DC', x: 32, y: 28 },
    ],
    '1-3-1': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DF',  x: 50, y: 72 },
        { label: 'MD',  x: 76, y: 50 }, { label: 'MC', x: 50, y: 50 }, { label: 'MI', x: 24, y: 50 },
        { label: 'DC',  x: 50, y: 28 },
    ],
    '2-1-2': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DFD', x: 68, y: 70 }, { label: 'DFI', x: 32, y: 70 },
        { label: 'MC',  x: 50, y: 50 },
        { label: 'DC',  x: 68, y: 28 }, { label: 'DC', x: 32, y: 28 },
    ],
    '2-2-1': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DFD', x: 68, y: 70 }, { label: 'DFI', x: 32, y: 70 },
        { label: 'MD',  x: 68, y: 50 }, { label: 'MI', x: 32, y: 50 },
        { label: 'DC',  x: 50, y: 28 },
    ],
    '3-1-1': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'LD',  x: 76, y: 70 }, { label: 'DF', x: 50, y: 72 }, { label: 'LI', x: 24, y: 70 },
        { label: 'MC',  x: 50, y: 50 },
        { label: 'DC',  x: 50, y: 28 },
    ],

    // --- FÚTBOL 7 (1 Arquero + 6 Jugadores de Campo) ---
    '1-1-4': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DF',  x: 50, y: 72 },
        { label: 'MC',  x: 50, y: 50 },
        { label: 'EI',  x: 80, y: 28 }, { label: 'DC', x: 60, y: 28 }, { label: 'DC', x: 40, y: 28 }, { label: 'ED', x: 20, y: 28 },
    ],
    '1-2-3': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DF',  x: 50, y: 72 },
        { label: 'MD',  x: 68, y: 50 }, { label: 'MI', x: 32, y: 50 },
        { label: 'DD',  x: 75, y: 28 }, { label: 'DC', x: 50, y: 28 }, { label: 'DI', x: 25, y: 28 },
    ],
    '1-3-2': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DF',  x: 50, y: 72 },
        { label: 'MD',  x: 75, y: 50 }, { label: 'MC', x: 50, y: 50 }, { label: 'MI', x: 25, y: 50 },
        { label: 'DC',  x: 68, y: 28 }, { label: 'DC', x: 32, y: 28 },
    ],
    '2-1-3': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DFD', x: 68, y: 72 }, { label: 'DFI', x: 32, y: 72 },
        { label: 'MC',  x: 50, y: 50 },
        { label: 'DD',  x: 75, y: 28 }, { label: 'DC', x: 50, y: 28 }, { label: 'DI', x: 25, y: 28 },
    ],
    '1-4-1': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DF',  x: 50, y: 72 },
        { label: 'MI',  x: 78, y: 50 }, { label: 'MC', x: 58, y: 50 }, { label: 'MC', x: 42, y: 50 }, { label: 'MD',  x: 22, y: 50 },
        { label: 'DC',  x: 50, y: 28 },
    ],
    '2-2-2': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DFD', x: 70, y: 70 }, { label: 'DFI', x: 30, y: 70 },
        { label: 'MD',  x: 65, y: 50 }, { label: 'MI', x: 35, y: 50 },
        { label: 'DC',  x: 70, y: 28 }, { label: 'DC', x: 30, y: 28 },
    ],
    '2-3-1': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'DFD', x: 70, y: 70 }, { label: 'DFI', x: 30, y: 70 },
        { label: 'MD',  x: 72, y: 50 }, { label: 'MC', x: 50, y: 48 }, { label: 'MI', x: 28, y: 50 },
        { label: 'DC',  x: 50, y: 28 },
    ],
    '3-1-2': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'LD',  x: 75, y: 70 }, { label: 'DF', x: 50, y: 72 }, { label: 'LI', x: 25, y: 70 },
        { label: 'MC',  x: 50, y: 50 },
        { label: 'DC',  x: 70, y: 28 }, { label: 'DC', x: 30, y: 28 },
    ],
    '3-2-1': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'LD',  x: 75, y: 70 }, { label: 'DF', x: 50, y: 72 }, { label: 'LI', x: 25, y: 70 },
        { label: 'MD',  x: 65, y: 50 }, { label: 'MI', x: 35, y: 50 },
        { label: 'DC',  x: 50, y: 28 },
    ],
    '4-1-1': [
        { label: 'GK',  x: 50, y: 88 },
        { label: 'LD',  x: 80, y: 70 }, { label: 'DFD', x: 60, y: 72 }, { label: 'DFI', x: 40, y: 72 }, { label: 'LI', x: 20, y: 70 },
        { label: 'MC',  x: 50, y: 52 },
        { label: 'DC',  x: 50, y: 28 },
    ],
};

let currentFormation = '3-2-1';
// Mapeo posición índice → jugador asignado (id)
let lineupAssignments = {}; // { 0: 'agustin-vilhelm', 1: 'leandro-zavala', ... }

// Estado de selección para interacción por Clic / Tap
// null | { type: 'bench', playerId: string } | { type: 'pitch', slotIdx: number, playerId: string }
let activeSelection = null;

function getTacticalPlayerById(id) {
    return TACTICAL_PLAYERS.find(p => p.id === id);
}

// Renderiza el banco de suplentes
function renderBench() {
    const bench = document.getElementById('bench-container');
    if (!bench) return;
    const assignedIds = Object.values(lineupAssignments);

    bench.innerHTML = TACTICAL_PLAYERS.map(p => {
        const isSelected = activeSelection && activeSelection.type === 'bench' && activeSelection.playerId === p.id;
        const isOnPitch = assignedIds.includes(p.id);

        return `
            <div class="bench-player-chip ${isOnPitch ? 'on-pitch' : ''} ${isSelected ? 'selected-chip' : ''}"
                 title="${p.name} #${p.num}"
                 draggable="true"
                 data-player-id="${p.id}">
                <img class="bench-avatar" src="${p.img}" alt="${p.name}"
                     onerror="this.src='images/logo_tomates.png'">
                <span class="bench-name">${p.name}</span>
            </div>
        `;
    }).join('');

    // Event listeners para los chips del banco (Click, Drag, Touch)
    bench.querySelectorAll('.bench-player-chip').forEach(chip => {
        const pId = chip.dataset.playerId;

        // Clic / Tap
        chip.addEventListener('click', e => {
            e.stopPropagation();
            handleSelectBench(pId);
        });

        // HTML5 Drag
        chip.addEventListener('dragstart', e => {
            e.dataTransfer.setData('application/json', JSON.stringify({ type: 'bench', playerId: pId }));
            e.dataTransfer.setData('text/plain', pId);
        });

        // Touch Drag (Mobile)
        chip.addEventListener('touchstart', e => {
            touchDragStart(e, { type: 'bench', playerId: pId });
        }, { passive: true });
    });

    // Dropzone sobre el contenedor del banco
    bench.addEventListener('dragover', e => {
        e.preventDefault();
        bench.classList.add('drag-over');
    });
    bench.addEventListener('dragleave', () => bench.classList.remove('drag-over'));
    bench.addEventListener('drop', e => {
        e.preventDefault();
        bench.classList.remove('drag-over');
        try {
            const raw = e.dataTransfer.getData('application/json');
            const data = raw ? JSON.parse(raw) : null;
            if (data && data.type === 'pitch') {
                delete lineupAssignments[data.slotIdx];
                activeSelection = null;
                renderPitchTokens();
                renderBench();
            }
        } catch (err) {}
    });

    // Clic en fondo del banco (para enviar titular al banco)
    bench.onclick = (e) => {
        if (e.target === bench && activeSelection && activeSelection.type === 'pitch') {
            delete lineupAssignments[activeSelection.slotIdx];
            activeSelection = null;
            renderPitchTokens();
            renderBench();
        }
    };
}

// Renderiza las fichas en la cancha
function renderPitchTokens() {
    const pitch = document.getElementById('tactical-pitch');
    if (!pitch) return;
    pitch.querySelectorAll('.pitch-player-token').forEach(el => el.remove());

    const positions = FORMATIONS[currentFormation] || FORMATIONS['3-2-1'];
    positions.forEach((pos, idx) => {
        const assignedId = lineupAssignments[idx];
        const player = assignedId ? getTacticalPlayerById(assignedId) : null;
        const isSelected = activeSelection && activeSelection.type === 'pitch' && activeSelection.slotIdx === idx;

        const token = document.createElement('div');
        token.className = `pitch-player-token ${isSelected ? 'selected-token' : ''}`;
        token.style.left = `${pos.x}%`;
        token.style.top = `${pos.y}%`;
        token.setAttribute('data-slot', idx);
        token.setAttribute('draggable', 'true');
        token.setAttribute('title', player ? `${player.name} — ${pos.label}` : `Posición: ${pos.label}`);

        const avatarSrc = player ? player.img : 'images/logo_tomates.png';
        const numBadge = player ? `<span class="pitch-token-number">${player.num}</span>` : '';
        token.innerHTML = `
            <div class="pitch-token-avatar-container">
                <img class="pitch-token-avatar"
                     src="${avatarSrc}"
                     alt="${player ? player.name : pos.label}"
                     onerror="this.src='images/logo_tomates.png'">
                ${numBadge}
            </div>
            <span class="pitch-token-name">${player ? player.name : pos.label}</span>
        `;

        // 1. Clic / Tap
        token.addEventListener('click', e => {
            e.stopPropagation();
            handleSelectPitch(idx);
        });

        // 2. HTML5 Drag Start
        token.addEventListener('dragstart', e => {
            e.dataTransfer.setData('application/json', JSON.stringify({ type: 'pitch', slotIdx: idx, playerId: assignedId }));
            e.dataTransfer.setData('text/plain', assignedId || '');
        });

        // 3. HTML5 Drag Over & Drop
        token.addEventListener('dragover', e => {
            e.preventDefault();
            token.classList.add('drag-over');
        });
        token.addEventListener('dragleave', () => token.classList.remove('drag-over'));
        token.addEventListener('drop', e => {
            e.preventDefault();
            token.classList.remove('drag-over');
            try {
                const raw = e.dataTransfer.getData('application/json');
                const data = raw ? JSON.parse(raw) : null;
                if (data) {
                    executeDropAction(data, idx);
                }
            } catch (err) {}
        });

        // 4. Touch Drag Start (Mobile)
        token.addEventListener('touchstart', e => {
            touchDragStart(e, { type: 'pitch', slotIdx: idx, playerId: assignedId });
        }, { passive: true });

        pitch.appendChild(token);
    });
}

// Lógica de Selección por Clic/Tap en puesto de la cancha
function handleSelectPitch(slotIdx) {
    if (!activeSelection) {
        // Si no hay nada seleccionado, seleccionamos este puesto (si está ocupado)
        if (lineupAssignments[slotIdx]) {
            activeSelection = { type: 'pitch', slotIdx, playerId: lineupAssignments[slotIdx] };
        }
    } else if (activeSelection.type === 'bench') {
        // Teníamos seleccionado un jugador del banco -> lo colocamos aquí
        const benchPlayerId = activeSelection.playerId;
        // Si el jugador del banco ya estaba en otra posición del campo, liberar esa posición
        Object.keys(lineupAssignments).forEach(k => {
            if (lineupAssignments[k] === benchPlayerId) delete lineupAssignments[k];
        });
        lineupAssignments[slotIdx] = benchPlayerId;
        activeSelection = null;
    } else if (activeSelection.type === 'pitch') {
        if (activeSelection.slotIdx === slotIdx) {
            // Clic en la misma ficha -> Deseleccionar
            activeSelection = null;
        } else {
            // Clic en otra ficha de la cancha -> Intercambiar posiciones!
            const fromSlot = activeSelection.slotIdx;
            const fromId = lineupAssignments[fromSlot];
            const toId = lineupAssignments[slotIdx];

            if (toId) lineupAssignments[fromSlot] = toId; else delete lineupAssignments[fromSlot];
            if (fromId) lineupAssignments[slotIdx] = fromId; else delete lineupAssignments[fromSlot];

            activeSelection = null;
        }
    }
    renderPitchTokens();
    renderBench();
}

// Lógica de Selección por Clic/Tap en chip del banco
function handleSelectBench(playerId) {
    const assignedSlot = Object.keys(lineupAssignments).find(k => lineupAssignments[k] === playerId);

    if (!activeSelection) {
        // Seleccionar jugador del banco
        if (assignedSlot !== undefined) {
            activeSelection = { type: 'pitch', slotIdx: parseInt(assignedSlot), playerId };
        } else {
            activeSelection = { type: 'bench', playerId };
        }
    } else if (activeSelection.type === 'pitch') {
        const fromSlot = activeSelection.slotIdx;
        const fromPlayerId = lineupAssignments[fromSlot];

        if (assignedSlot !== undefined) {
            // Intercambiar dos jugadores titulares en el campo
            const toSlot = parseInt(assignedSlot);
            if (fromSlot !== toSlot) {
                lineupAssignments[fromSlot] = playerId;
                lineupAssignments[toSlot] = fromPlayerId;
            }
        } else {
            // Intercambiar titular con jugador suplente del banco
            lineupAssignments[fromSlot] = playerId;
        }
        activeSelection = null;
    } else if (activeSelection.type === 'bench') {
        if (activeSelection.playerId === playerId) {
            activeSelection = null;
        } else {
            activeSelection = { type: 'bench', playerId };
        }
    }
    renderPitchTokens();
    renderBench();
}

// Ejecuta la acción cuando se suelta un arrastre (Drop) en una ficha de la cancha
function executeDropAction(dragData, targetSlotIdx) {
    if (dragData.type === 'bench') {
        assignPlayerToSlot(targetSlotIdx, dragData.playerId);
    } else if (dragData.type === 'pitch') {
        const fromSlot = dragData.slotIdx;
        if (fromSlot !== targetSlotIdx) {
            const fromId = lineupAssignments[fromSlot];
            const toId = lineupAssignments[targetSlotIdx];

            if (toId) lineupAssignments[fromSlot] = toId; else delete lineupAssignments[fromSlot];
            if (fromId) lineupAssignments[targetSlotIdx] = fromId; else delete lineupAssignments[targetSlotIdx];
        }
    }
    activeSelection = null;
    renderPitchTokens();
    renderBench();
}

// ---- Touch Drag (Mobile) ----
let _touchGhost = null;
let _touchDragData = null;

function removeTouchGhost() {
    if (_touchGhost) { _touchGhost.remove(); _touchGhost = null; }
}

function touchDragStart(e, dragData) {
    const targetEl = e.currentTarget;
    _touchDragData = dragData;

    removeTouchGhost();
    _touchGhost = targetEl.cloneNode(true);
    _touchGhost.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        opacity: 0.85;
        transform: scale(1.2);
        transition: none;
    `;
    document.body.appendChild(_touchGhost);

    const touch = e.touches[0];
    _touchGhost.style.left = `${touch.clientX - 25}px`;
    _touchGhost.style.top  = `${touch.clientY - 45}px`;

    targetEl.addEventListener('touchmove', touchDragMove, { passive: false });
    targetEl.addEventListener('touchend', touchDragEnd);
}

function touchDragMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    if (_touchGhost) {
        _touchGhost.style.left = `${touch.clientX - 25}px`;
        _touchGhost.style.top  = `${touch.clientY - 45}px`;
    }
    document.querySelectorAll('.pitch-player-token, #bench-container').forEach(t => t.classList.remove('drag-over'));
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropTarget = el ? (el.closest('.pitch-player-token') || el.closest('#bench-container')) : null;
    if (dropTarget) dropTarget.classList.add('drag-over');
}

function touchDragEnd(e) {
    const touch = e.changedTouches[0];
    removeTouchGhost();
    document.querySelectorAll('.pitch-player-token, #bench-container').forEach(t => t.classList.remove('drag-over'));

    if (!_touchDragData) return;

    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const token = el ? el.closest('.pitch-player-token') : null;
    const bench = el ? el.closest('#bench-container') : null;

    if (token) {
        const slotIdx = parseInt(token.getAttribute('data-slot'));
        if (_touchDragData.type === 'pitch' && slotIdx === _touchDragData.slotIdx) {
            handleSelectToken(slotIdx, _touchDragData.playerId);
        } else {
            executeDropAction(_touchDragData, slotIdx);
            activeSelection = null;
        }
    } else if (bench && _touchDragData.type === 'pitch') {
        delete lineupAssignments[_touchDragData.slotIdx];
        activeSelection = null;
        renderPitchTokens();
        renderBench();
    } else if (bench && _touchDragData.type === 'bench') {
        handleSelectBench(_touchDragData.playerId);
    } else {
        if (_touchDragData.type === 'bench') {
            handleSelectBench(_touchDragData.playerId);
        } else if (_touchDragData.type === 'pitch') {
            handleSelectToken(_touchDragData.slotIdx, _touchDragData.playerId);
        }
    }

    _touchDragData = null;
    const targetEl = e.currentTarget;
    targetEl.removeEventListener('touchmove', touchDragMove);
    targetEl.removeEventListener('touchend', touchDragEnd);
}

function assignPlayerToSlot(slotIdx, playerId) {
    Object.keys(lineupAssignments).forEach(k => {
        if (lineupAssignments[k] === playerId) delete lineupAssignments[k];
    });
    lineupAssignments[slotIdx] = playerId;
    renderPitchTokens();
    renderBench();
}

// Deseleccionar al hacer clic fuera de la pizarra
document.addEventListener('click', e => {
    const tacticaView = document.getElementById('tactical-pitch-view');
    if (tacticaView && !tacticaView.contains(e.target) && activeSelection) {
        activeSelection = null;
        renderPitchTokens();
        renderBench();
    }
});

window.applyFormation = function(formation) {
    currentFormation = formation;
    const total = FORMATIONS[formation] ? FORMATIONS[formation].length : 7;
    Object.keys(lineupAssignments).forEach(k => {
        if (parseInt(k) >= total) delete lineupAssignments[k];
    });
    activeSelection = null;
    renderPitchTokens();
    renderBench();
};

window.resetLineup = function() {
    lineupAssignments = {};
    activeSelection = null;
    renderPitchTokens();
    renderBench();
};

window.exportLineup = async function() {
    const pitch = document.getElementById('tactical-pitch');
    if (!pitch) return;
    const btn = document.getElementById('export-lineup-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> Generando...';
    btn.disabled = true;

    try {
        const totalPlayers = FORMATIONS[currentFormation] ? FORMATIONS[currentFormation].length : 7;
        const modeLabel = `FÚTBOL ${totalPlayers}`;
        const formattedFormation = currentFormation.split('-').join(' - ');

        // Crear contenedor para la tarjeta de exportación
        const exportCard = document.createElement('div');
        exportCard.id = 'export-card-temp';
        exportCard.style.position = 'fixed';
        exportCard.style.left = '-9999px';
        exportCard.style.top = '-9999px';
        exportCard.style.width = '640px';
        exportCard.style.padding = '28px';
        exportCard.style.background = 'linear-gradient(135deg, #2d060e 0%, #120005 50%, #400311 100%)';
        exportCard.style.border = '5px solid #fbbf24';
        exportCard.style.borderRadius = '24px';
        exportCard.style.fontFamily = "'Outfit', sans-serif";
        exportCard.style.color = '#ffffff';
        exportCard.style.display = 'flex';
        exportCard.style.flexDirection = 'column';
        exportCard.style.gap = '24px';
        exportCard.style.boxShadow = '0 25px 60px rgba(0,0,0,0.8)';
        exportCard.style.boxSizing = 'border-box';

        // 1. Header HTML
        const headerDiv = document.createElement('div');
        headerDiv.style.display = 'flex';
        headerDiv.style.alignItems = 'center';
        headerDiv.style.justifyContent = 'space-between';
        headerDiv.style.borderBottom = '2px solid rgba(251, 191, 36, 0.25)';
        headerDiv.style.paddingBottom = '16px';
        headerDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 18px;">
                <img src="images/logo_tomates.png" style="width: 75px; height: 75px; object-fit: contain; filter: drop-shadow(0 0 10px rgba(251,191,36,0.5));">
                <div>
                    <div style="font-family: 'Bebas Neue', sans-serif; font-size: 46px; line-height: 1; letter-spacing: 2px; font-style: italic; font-weight: 900; background: linear-gradient(180deg, #ffffff 0%, #fde68a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">TOMATES FC</div>
                    <div style="font-size: 13px; color: #fbbf24; letter-spacing: 3px; font-weight: 800; margin-top: 4px;">ALINEACIÓN TITULAR</div>
                </div>
            </div>
            <div style="background: rgba(0,0,0,0.45); border: 2px solid #fbbf24; border-radius: 12px; padding: 6px 16px; text-align: center; min-width: 100px;">
                <div style="font-size: 9px; color: #fbbf24; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">FORMACIÓN</div>
                <div style="font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: white; letter-spacing: 2px; margin-top: 2px; font-weight: bold;">${formattedFormation}</div>
            </div>
        `;
        exportCard.appendChild(headerDiv);

        // 2. Cancha Clonada y redimensionada
        const pitchClone = pitch.cloneNode(true);
        pitchClone.style.width = '580px';
        pitchClone.style.maxWidth = 'none';
        pitchClone.style.height = '828px'; // Mantiene proporción 7:10
        pitchClone.style.border = '4px solid rgba(255,255,255,0.3)';
        pitchClone.style.borderRadius = '16px';
        pitchClone.style.boxShadow = '0 12px 30px rgba(0,0,0,0.5)';
        pitchClone.style.margin = '0 auto';
        pitchClone.style.position = 'relative';

        // Redimensionar las fichas en el clon
        pitchClone.querySelectorAll('.pitch-player-token').forEach(token => {
            token.style.transform = 'translate(-50%, -50%)'; // Evita desalineación
            
            // Contenedor Avatar
            const container = token.querySelector('.pitch-token-avatar-container');
            if (container) {
                container.style.width = '70px';
                container.style.height = '70px';
            }
            
            // Imagen Avatar
            const avatar = token.querySelector('.pitch-token-avatar');
            if (avatar) {
                avatar.style.width = '100%';
                avatar.style.height = '100%';
                avatar.style.borderWidth = '3.5px';
            }
            
            // Número de camiseta
            const numBadge = token.querySelector('.pitch-token-number');
            if (numBadge) {
                numBadge.style.width = '24px';
                numBadge.style.height = '24px';
                numBadge.style.fontSize = '12px';
                numBadge.style.bottom = '-6px';
                numBadge.style.borderWidth = '2px';
            }
            
            // Nombre del jugador
            const nameLabel = token.querySelector('.pitch-token-name');
            if (nameLabel) {
                nameLabel.style.marginTop = '10px';
                nameLabel.style.fontSize = '12px';
                nameLabel.style.padding = '3px 12px';
                nameLabel.style.borderRadius = '8px';
                nameLabel.style.borderWidth = '1.5px';
                nameLabel.style.maxWidth = '110px';
            }
        });
        exportCard.appendChild(pitchClone);

        // 3. Footer HTML
        const footerDiv = document.createElement('div');
        footerDiv.style.display = 'flex';
        footerDiv.style.alignItems = 'center';
        footerDiv.style.justifyContent = 'space-between';
        footerDiv.style.paddingTop = '16px';
        footerDiv.style.borderTop = '2px solid rgba(251, 191, 36, 0.25)';
        footerDiv.style.fontSize = '14px';
        footerDiv.style.fontWeight = '800';
        footerDiv.style.color = 'rgba(255,255,255,0.85)';
        footerDiv.style.letterSpacing = '1px';
        footerDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fbbf24" stroke-width="2.5" style="display:inline-block; vertical-align:middle;">
                    <rect x="2" y="2" width="20" height="20" rx="3"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <circle cx="12" cy="12" r="4"/>
                </svg>
                <span style="text-transform: uppercase;">${modeLabel}</span>
            </div>
            <div>
                <img src="images/logo_tomates.png" style="width: 28px; height: 28px; object-fit: contain;">
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#fbbf24" style="display:inline-block; vertical-align:middle;">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span style="margin-left: 2.2px; font-family: 'Outfit', sans-serif;">tomates._fc._</span>
            </div>
        `;
        exportCard.appendChild(footerDiv);

        // Añadir temporalmente al DOM para que html2canvas lo dibuje
        document.body.appendChild(exportCard);

        const canvas = await html2canvas(exportCard, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true,
        });

        // Remover temporal del DOM
        document.body.removeChild(exportCard);

        const link = document.createElement('a');
        link.download = `alineacion-tomatesfc-${currentFormation}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (err) {
        console.error('Error exportando alineación:', err);
        alert('No se pudo exportar la imagen. Intenta de nuevo.');
        // Intentar limpiar por si acaso
        const temp = document.getElementById('export-card-temp');
        if (temp) temp.remove();
    }
    btn.innerHTML = originalText;
    btn.disabled = false;
};

// Función para cambiar entre Plantilla y Pizarra Táctica
window.showTeamTab = function(tab) {
    const plantillaView = document.getElementById('plantilla-view');
    const tacticaView = document.getElementById('tactical-pitch-view');
    const tabPlantilla = document.getElementById('tab-plantilla-btn');
    const tabTactica = document.getElementById('tab-tactica-btn');

    if (tab === 'plantilla') {
        plantillaView.classList.remove('hidden');
        tacticaView.classList.add('hidden');
        tabPlantilla.classList.add('active');
        tabTactica.classList.remove('active');
    } else {
        plantillaView.classList.add('hidden');
        tacticaView.classList.remove('hidden');
        tabPlantilla.classList.remove('active');
        tabTactica.classList.add('active');
        // Inicializar pizarra si es la primera vez
        renderPitchTokens();
        renderBench();
    }
};

// Hacer las funciones del popup accesibles globalmente
window.assignPlayerToSlot = assignPlayerToSlot;
