// ============================================================
// PARTIDOS - Renderizado, filtros y detalles de partidos
// ============================================================
let temporadaActual = 2026;
let filtroActual = 'todos';
let ordenCronologico = 'desc';

// Filtra partidos por resultado y actualiza estilos de botones
window.filterMatches = function(filter) {
    filtroActual = filter;
    renderMatches(filter);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.remove('bg-gray-200', 'text-gray-700');
            btn.classList.add('bg-red-800', 'text-white');
        } else {
            btn.classList.remove('bg-red-800', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
        }
    });
};

window.cambiarTemporada = function(temporada) {
    temporadaActual = temporada;
    filtroActual = 'todos'; // Reiniciar filtro al cambiar de temporada
    document.getElementById('btn-temp-2025').className = temporada === 2025 
        ? 'px-4 py-1 rounded-full font-bold bg-red-800 text-white'
        : 'px-4 py-1 rounded-full font-bold bg-gray-200 text-gray-700';
    document.getElementById('btn-temp-2026').className = temporada === 2026 
        ? 'px-4 py-1 rounded-full font-bold bg-red-800 text-white'
        : 'px-4 py-1 rounded-full font-bold bg-gray-200 text-gray-700';
    renderMatches('todos');
};

// Toggle del botón de orden cronológico
window.toggleSortMatches = function() {
    ordenCronologico = ordenCronologico === 'desc' ? 'asc' : 'desc';
    const btn = document.getElementById('sort-matches-btn');
    if (btn) {
        btn.innerHTML = ordenCronologico === 'desc' 
            ? '<i class="fas fa-sort"></i> Mostrar: Recientes Primero' 
            : '<i class="fas fa-sort"></i> Mostrar: Antiguos Primero';
    }
    renderMatches(filtroActual);
};

// Renderiza la racha reciente (Form Guide) de los últimos 5 partidos de la temporada
function renderFormGuide(temporada) {
    const rachaContainer = document.getElementById('racha-reciente');
    if (!rachaContainer) return;
    rachaContainer.innerHTML = '';

    // Obtener los partidos de la temporada ordenados por ID cronológico
    const partidosDeTemporada = Object.entries(partidosData)
        .filter(([id, partido]) => partido.temporada === temporada)
        .sort((a, b) => Number(a[0]) - Number(b[0]));

    // Tomar los últimos 5 partidos
    const ultimosPartidos = partidosDeTemporada.slice(-5);

    if (ultimosPartidos.length === 0) {
        rachaContainer.innerHTML = '<span class="text-gray-500 text-sm">Sin partidos jugados</span>';
        return;
    }

    ultimosPartidos.forEach(([id, partido]) => {
        const [golesLocal, golesVisitante] = partido.resultado.split('-').map(Number);
        let resultado = golesLocal > golesVisitante ? 'victoria' :
                        golesLocal === golesVisitante ? 'empate' : 'derrota';

        let letra = resultado === 'victoria' ? 'V' :
                    resultado === 'empate' ? 'E' : 'D';

        const tooltip = `${partido.rival} (${partido.resultado}) - ${partido.fecha}`;
        
        const dot = document.createElement('div');
        dot.className = `form-dot ${resultado}`;
        dot.setAttribute('data-tooltip', tooltip);
        dot.textContent = letra;
        
        dot.addEventListener('click', () => {
            if (typeof showMatchDetails === 'function') {
                showMatchDetails(id);
            }
        });

        rachaContainer.appendChild(dot);
    });
}

// Renderiza las tarjetas de partidos según el filtro aplicado
function renderMatches(filter = 'todos') {
    // Renderizar la racha reciente
    renderFormGuide(temporadaActual);

    const container = document.getElementById('matches-container');
    if (!container) return;
    container.innerHTML = '';

    let total = 0, victorias = 0, empates = 0, derrotas = 0;

    // Calcular totales primero para los contadores
    Object.entries(partidosData).forEach(([id, partido]) => {
        if (partido.temporada !== temporadaActual) return;
        const [golesLocal, golesVisitante] = partido.resultado.split('-').map(Number);
        let resultado = golesLocal > golesVisitante ? 'victoria' :
                        golesLocal === golesVisitante ? 'empate' : 'derrota';

        if (resultado === 'victoria') victorias++;
        else if (resultado === 'empate') empates++;
        else derrotas++;
        total++;
    });

    // Obtener y ordenar partidos de la temporada activa
    const partidosFiltrados = Object.entries(partidosData)
        .filter(([id, partido]) => partido.temporada === temporadaActual);

    if (ordenCronologico === 'desc') {
        partidosFiltrados.sort((a, b) => Number(b[0]) - Number(a[0]));
    } else {
        partidosFiltrados.sort((a, b) => Number(a[0]) - Number(b[0]));
    }

    partidosFiltrados.forEach(([id, partido]) => {
        const [golesLocal, golesVisitante] = partido.resultado.split('-').map(Number);
        let resultado = golesLocal > golesVisitante ? 'victoria' :
                        golesLocal === golesVisitante ? 'empate' : 'derrota';

        if (filter !== 'todos' && filter !== resultado) return;

        const escudoRival = getEscudoRival(partido.rival);
        container.innerHTML += `
            <div class="match-card p-6 hover:shadow-lg transition flex flex-col justify-between h-full" data-result="${resultado}">
                <div class="flex justify-end items-center mb-4">
                    <p class="text-gray-600">${partido.fecha}</p>
                </div>
                <div class="flex items-center justify-between my-4">
                    <div class="text-center">
                        <img src="images/logo_tomates.png" alt="Escudo Tomates FC" class="mx-auto h-16 w-16 object-contain">
                        <p class="font-bold mt-2">Tomates FC</p>
                        <span class="text-4xl font-bold text-gray-800">${golesLocal}</span>
                    </div>
                    <div class="text-center mx-4">
                        <p class="font-bold text-xl">VS</p>
                    </div>
                    <div class="text-center">
                        <img src="${escudoRival}" alt="Escudo ${partido.rival}" class="mx-auto h-16 w-16 object-contain">
                        <p class="font-bold mt-2">${partido.rival}</p>
                        <span class="text-4xl font-bold text-gray-800">${golesVisitante}</span>
                    </div>
                </div>
                <button onclick="showMatchDetails(${id})" class="w-full bg-gray-100 hover:bg-red-100 text-red-800 py-2 rounded-full transition">
                    Ver detalles
                </button>
            </div>
        `;
    });

    // Actualizar contadores en botones de filtro
    const btnMap = { 'todos': total, 'victoria': victorias, 'empate': empates, 'derrota': derrotas };
    Object.entries(btnMap).forEach(([key, count]) => {
        const btn = document.querySelector(`button[data-filter="${key}"]`);
        if (btn) btn.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)} (${count})`;
    });
}

// Actualiza estadísticas del equipo en las secciones de historia y footer
function updateTeamStats() {
    let totalPartidos = 0, victorias = 0, empates = 0, derrotas = 0, golesAnotados = 0;
    Object.values(partidosData).forEach(partido => {
        totalPartidos++;
        const [gf, gc] = partido.resultado.split('-').map(Number);
        golesAnotados += gf;
        if (gf > gc) victorias++;
        else if (gf === gc) empates++;
        else derrotas++;
    });
    const promedio = (golesAnotados / totalPartidos).toFixed(2);

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const totalJugadores = Object.keys(jugadoresData).length;

    set('stat-partidos-titulo', `${totalPartidos} partidos`);
    set('stat-partidos-desc', `Hemos disputado ${totalPartidos} partidos con un porcentaje de victoria del ${Math.round((victorias/totalPartidos)*100)}%.`);
    set('stat-jugadores-titulo', `${totalJugadores} Jugadores`);
    set('stat-jugadores-desc', `Contamos con un plantel de ${totalJugadores} jugadores talentosos y comprometidos con el equipo.`);
    set('stat-goles-titulo', `${golesAnotados} Goles`);
    set('stat-goles-desc', `Tenemos la gran cantidad de ${golesAnotados} goles como equipo y con un promedio de ${promedio} goles por partido.`);

    const footerEl = document.querySelector('footer ul.space-y-2.text-gray-300');
    if (footerEl) {
        footerEl.innerHTML = `
            <li><span class="font-semibold">Partidos:</span> ${totalPartidos}</li>
            <li><span class="font-semibold">Victorias:</span> ${victorias}</li>
            <li><span class="font-semibold">Empates:</span> ${empates}</li>
            <li><span class="font-semibold">Derrotas:</span> ${derrotas}</li>
            <li><span class="font-semibold">Goles anotados:</span> ${golesAnotados}</li>
        `;
    }
}

// Muestra el detalle completo de un partido específico
window.showMatchDetails = function(partidoId) {
    try {
        const matchDetailsSection = document.getElementById('match-details-section');
        if (matchDetailsSection && matchDetailsSection.classList.contains('hidden')) {
            window.savedScrollPosition = window.scrollY;
        }

        ['inicio', 'historia', 'equipo', 'partidos', 'rivales', 'stats-section', 'player-details-section'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });

        if (!matchDetailsSection) return;
        matchDetailsSection.classList.remove('hidden');
        window.history.pushState({ section: 'match-details', partidoId }, '', `#partido/${partidoId}`);

        window.scrollTo({ top: 0, behavior: 'instant' });

        const partido = partidosData[partidoId];
        if (!partido) return;

        const escudoRival = getEscudoRival(partido.rival);
        const [golesLocal, golesVisitante] = partido.resultado.split('-');
        const gl = parseInt(golesLocal) || 0;
        const gv = parseInt(golesVisitante) || 0;

        let resultadoClass = 'empate', resultadoLabel = 'Empate', resultadoBadgeBg = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
        if (gl > gv) {
            resultadoClass = 'victoria';
            resultadoLabel = 'Victoria';
            resultadoBadgeBg = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
        } else if (gl < gv) {
            resultadoClass = 'derrota';
            resultadoLabel = 'Derrota';
            resultadoBadgeBg = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
        }

        document.getElementById('match-header').innerHTML = `
            <div class="rival-versus-banner relative overflow-hidden rounded-3xl p-6 md:p-8 shadow-2xl text-white">
                <div class="versus-bg-glow"></div>
                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                    <!-- Local: Tomates FC -->
                    <div class="flex flex-col items-center flex-1 text-center">
                        <div class="versus-shield-box">
                            <img src="images/logo_tomates.png" alt="Tomates FC" class="h-16 w-16 md:h-20 md:w-20 object-contain drop-shadow-xl">
                        </div>
                        <h3 class="font-black text-2xl md:text-3xl tracking-wide uppercase mt-3 text-white">Tomates FC</h3>
                        <span class="text-xs uppercase font-bold tracking-widest text-red-300 mt-0.5">Local</span>
                    </div>

                    <!-- Centro: Marcador, VS y Datos -->
                    <div class="flex flex-col items-center justify-center text-center px-4">
                        <span class="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${resultadoBadgeBg} mb-3 shadow-lg">
                            <i class="fas ${resultadoClass === 'victoria' ? 'fa-trophy' : resultadoClass === 'empate' ? 'fa-handshake' : 'fa-times-circle'}"></i>
                            ${resultadoLabel}
                        </span>
                        <div class="flex items-center justify-center gap-4 my-1">
                            <span class="text-4xl md:text-6xl font-black font-bebas text-white tracking-wider drop-shadow-lg">${golesLocal}</span>
                            <span class="text-2xl md:text-3xl font-bold text-red-400/80 mx-1">:</span>
                            <span class="text-4xl md:text-6xl font-black font-bebas text-white tracking-wider drop-shadow-lg">${golesVisitante}</span>
                        </div>
                        <div class="versus-summary-pill mt-3">
                            <span class="flex items-center gap-1.5 text-gray-200">
                                <i class="fas fa-calendar-alt text-red-400"></i> ${partido.fecha}
                            </span>
                            <span>•</span>
                            <span class="flex items-center gap-1.5 text-gray-200">
                                <i class="fas fa-clock text-amber-400"></i> ${partido.hora}
                            </span>
                            <span>•</span>
                            <span class="flex items-center gap-1.5 text-gray-200">
                                <i class="fas fa-map-marker-alt text-blue-400"></i> ${partido.lugar}
                            </span>
                        </div>
                    </div>

                    <!-- Visitante: Rival -->
                    <div class="flex flex-col items-center flex-1 text-center">
                        <div class="versus-shield-box">
                            <img src="${escudoRival}" alt="${partido.rival}" class="h-16 w-16 md:h-20 md:w-20 object-contain drop-shadow-xl">
                        </div>
                        <h3 class="font-black text-2xl md:text-3xl tracking-wide uppercase mt-3 text-white">${partido.rival}</h3>
                        <span class="text-xs uppercase font-bold tracking-widest text-gray-300 mt-0.5">Rival</span>
                    </div>
                </div>
            </div>
        `;

        const playersContainer = document.getElementById('match-players');
        if (!playersContainer) return;
        playersContainer.innerHTML = '';
        if (!partido.jugadores || partido.jugadores.length === 0) {
            playersContainer.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center col-span-full italic py-4">No hay estadísticas de jugadores registradas para este partido.</p>';
        } else {
            partido.jugadores.forEach(jugador => {
                playersContainer.innerHTML += `
                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-red-100 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500 transition duration-300">
                        <h3 class="font-bold text-xl mb-3 text-red-800 dark:text-red-400">${jugador.nombre}</h3>
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600 dark:text-gray-300 font-medium">⚽ Goles:</span>
                                <span class="font-bold text-green-600 dark:text-green-400 text-lg">${jugador.goles}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600 dark:text-gray-300 font-medium">🎯 Asistencias:</span>
                                <span class="font-bold text-blue-600 dark:text-blue-400 text-lg">${jugador.asistencias}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error('Error en showMatchDetails:', error);
    }
};

// Vuelve a la lista de partidos desde el detalle
window.backToMatches = function() {
    document.getElementById('match-details-section').classList.add('hidden');
    document.getElementById('stats-section').classList.add('hidden');
    document.getElementById('player-details-section').classList.add('hidden');
    ['inicio', 'historia', 'equipo', 'partidos', 'rivales'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('hidden');
    });
    window.history.pushState({ section: 'partidos' }, '', '#partidos');
    renderMatches(filtroActual);
    
    if (typeof window.restoreScrollOrSection === 'function') {
        window.restoreScrollOrSection('partidos');
    } else {
        window.scrollTo({ top: window.savedScrollPosition || 0, behavior: 'instant' });
    }
};
