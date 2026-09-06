// ============================================================
// RIVALES - Estadísticas, tarjetas y detalles por rival
// ============================================================

// Retorna la URL del escudo según el nombre del rival
function getEscudoRival(rival) {
    const escudos = {
        'Vaqueros':       'images/escudo_default.png',
        'Real Justicia':  'images/escudo_real_justicia.png',
        'Equipo Maradona':'images/escudo_default.png',
        'Manchester ICI': 'images/escudo_manchester_ici.png',
        'Resistencia IC': 'images/escudo_resistencia.png',
        'Medicina FC': 'images/escudo_Medicina_FC.png',
        'Interdiktos': 'images/escudo_interdiktos.png',
        'Real Madrici': 'images/escudo_real_madrici.png',
        'Rupu FC': 'images/escudo_Rupu_FC.png',
        'Real Nutrid': 'images/escudo_Real_Nutrid.png',
        'default':        'images/escudo_default.png'
    };
    return escudos[rival] || escudos['default'];
}

// Calcula y ordena estadísticas agrupadas por rival
function getRivalesStats() {
    const rivalesStats = {};
    Object.values(partidosData).forEach(partido => {
        const rival = partido.rival;
        if (!rivalesStats[rival]) {
            rivalesStats[rival] = { partidos: 0, victorias: 0, empates: 0, derrotas: 0, golesFavor: 0, golesContra: 0, matches: [] };
        }
        const [gf, gc] = partido.resultado.split('-').map(Number);
        rivalesStats[rival].partidos++;
        rivalesStats[rival].golesFavor += gf;
        rivalesStats[rival].golesContra += gc;
        rivalesStats[rival].matches.push(partido);
        if (gf > gc) rivalesStats[rival].victorias++;
        else if (gf === gc) rivalesStats[rival].empates++;
        else rivalesStats[rival].derrotas++;
    });
    return Object.entries(rivalesStats)
        .sort(([, a], [, b]) => b.partidos - a.partidos)
        .map(([rival, stats]) => ({
            rival, ...stats,
            porcentajeVictorias: Math.round((stats.victorias / stats.partidos) * 100)
        }));
}

// Renderiza las tarjetas de resumen por rival
window.renderRivales = function() {
    const rivales = getRivalesStats();
    const container = document.getElementById('rivales-container');
    if (!container) return;
    container.innerHTML = '';
    rivales.forEach(rivalData => {
        const escudoRival = getEscudoRival(rivalData.rival);
        
        // 1. Insignia de balance
        let balanceBadge = '';
        if (rivalData.victorias > rivalData.derrotas) {
            balanceBadge = `<span class="rival-badge rival-badge-favorable"><i class="fas fa-arrow-trend-up mr-1"></i>Favorable</span>`;
        } else if (rivalData.victorias === rivalData.derrotas) {
            balanceBadge = `<span class="rival-badge rival-badge-parejo"><i class="fas fa-scale-balanced mr-1"></i>Parejo</span>`;
        } else {
            balanceBadge = `<span class="rival-badge rival-badge-desfavorable"><i class="fas fa-fire mr-1"></i>Por Vencer</span>`;
        }

        // 2. Barra de efectividad
        const winrate = rivalData.porcentajeVictorias;
        const winrateGradient = winrate >= 60 
            ? 'from-emerald-500 to-green-600' 
            : (winrate >= 40 ? 'from-amber-500 to-yellow-600' : 'from-red-500 to-rose-600');

        container.innerHTML += `
            <div class="rival-card group" onclick="showRivalDetails('${rivalData.rival}')">
                <div class="flex items-center justify-between mb-4 w-full">
                    <span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">${rivalData.partidos} ${rivalData.partidos === 1 ? 'partido' : 'partidos'}</span>
                    ${balanceBadge}
                </div>

                <div class="rival-crest-wrapper mb-3">
                    <img src="${escudoRival}" alt="Escudo ${rivalData.rival}" class="rival-crest-img">
                </div>

                <h3 class="rival-name text-center">${rivalData.rival}</h3>

                <!-- Récord en píldoras (W-D-L) -->
                <div class="flex items-center justify-center gap-2 my-3">
                    <span class="rival-record-pill record-w" title="Victorias">${rivalData.victorias}V</span>
                    <span class="rival-record-pill record-d" title="Empates">${rivalData.empates}E</span>
                    <span class="rival-record-pill record-l" title="Derrotas">${rivalData.derrotas}D</span>
                </div>

                <!-- Barra de efectividad -->
                <div class="rival-winrate-box w-full">
                    <div class="flex justify-between items-center text-xs font-bold mb-1.5">
                        <span class="text-gray-500 dark:text-gray-400 font-semibold">Efectividad</span>
                        <span class="font-extrabold text-red-800 dark:text-red-400">${winrate}%</span>
                    </div>
                    <div class="w-full h-2.5 bg-gray-200 dark:bg-gray-700/80 rounded-full overflow-hidden p-0.5 border border-gray-300/40 dark:border-gray-600/30">
                        <div class="h-full rounded-full bg-gradient-to-r ${winrateGradient} transition-all duration-700" style="width: ${Math.max(winrate, 5)}%"></div>
                    </div>
                    <div class="flex justify-between items-center text-[11px] text-gray-500 dark:text-gray-400 mt-2 font-medium">
                        <span>Goles: <strong class="text-gray-700 dark:text-gray-200">${rivalData.golesFavor} GF</strong></span>
                        <span>Contra: <strong class="text-gray-700 dark:text-gray-200">${rivalData.golesContra} GC</strong></span>
                    </div>
                </div>

                <button class="rival-action-btn mt-5 w-full">
                    <span>Ver Historial</span>
                    <i class="fas fa-arrow-right ml-1 transition-transform duration-300 group-hover:translate-x-1.5"></i>
                </button>
            </div>
        `;
    });
};

// Muestra el detalle de partidos y jugadores contra un rival
window.showRivalDetails = function(rivalName) {
    const rivalData = getRivalesStats().find(r => r.rival === rivalName);
    if (!rivalData) return;

    const rivalDetails = document.getElementById('rival-details');
    if (rivalDetails && rivalDetails.classList.contains('hidden')) {
        window.savedScrollPosition = window.scrollY;
    }

    ['inicio', 'historia', 'equipo', 'partidos', 'stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    document.getElementById('rivales').classList.remove('hidden');
    document.getElementById('rivales-container').classList.add('hidden');
    if (rivalDetails) rivalDetails.classList.remove('hidden');

    const escudoRival = getEscudoRival(rivalName);
    
    // 3. Banner Versus Cinematográfico
    document.getElementById('rival-header').innerHTML = `
        <div class="rival-versus-banner relative overflow-hidden rounded-3xl p-6 md:p-8 shadow-2xl text-white">
            <div class="versus-bg-glow"></div>
            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                <!-- Local: Tomates FC -->
                <div class="flex flex-col items-center flex-1 text-center">
                    <div class="versus-shield-box">
                        <img src="images/logo_tomates.png" alt="Tomates FC" class="h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow-xl">
                    </div>
                    <h3 class="font-black text-2xl md:text-3xl tracking-wide uppercase mt-2 text-white">Tomates FC</h3>
                    <span class="text-xs uppercase tracking-widest text-red-300 font-bold">Temuco • F7</span>
                </div>

                <!-- Centro: Marcador H2H & VS -->
                <div class="flex flex-col items-center justify-center text-center px-4">
                    <span class="versus-vs-badge">VS</span>
                    <div class="versus-score-row mt-3">
                        <div class="versus-stat-col">
                            <span class="text-green-400 font-black text-3xl md:text-5xl font-bebas">${rivalData.victorias}</span>
                            <span class="text-[10px] uppercase font-bold tracking-widest text-gray-300">Victorias</span>
                        </div>
                        <span class="versus-stat-dash text-gray-400 text-2xl font-light">-</span>
                        <div class="versus-stat-col">
                            <span class="text-amber-300 font-black text-3xl md:text-5xl font-bebas">${rivalData.empates}</span>
                            <span class="text-[10px] uppercase font-bold tracking-widest text-gray-300">Empates</span>
                        </div>
                        <span class="versus-stat-dash text-gray-400 text-2xl font-light">-</span>
                        <div class="versus-stat-col">
                            <span class="text-red-400 font-black text-3xl md:text-5xl font-bebas">${rivalData.derrotas}</span>
                            <span class="text-[10px] uppercase font-bold tracking-widest text-gray-300">Derrotas</span>
                        </div>
                    </div>
                    <div class="versus-summary-pill mt-4">
                        <span>${rivalData.partidos} ${rivalData.partidos === 1 ? 'partido' : 'partidos'}</span>
                        <span>•</span>
                        <span>${rivalData.golesFavor} GF / ${rivalData.golesContra} GC (${(rivalData.golesFavor - rivalData.golesContra) >= 0 ? '+' : ''}${rivalData.golesFavor - rivalData.golesContra})</span>
                        <span>•</span>
                        <span class="text-yellow-400">${rivalData.porcentajeVictorias}% Éxito</span>
                    </div>
                </div>

                <!-- Visitante: Rival -->
                <div class="flex flex-col items-center flex-1 text-center">
                    <div class="versus-shield-box">
                        <img src="${escudoRival}" alt="${rivalName}" class="h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow-xl">
                    </div>
                    <h3 class="font-black text-2xl md:text-3xl tracking-wide uppercase mt-2 text-white">${rivalName}</h3>
                    <span class="text-xs uppercase tracking-widest text-gray-300 font-bold">Rival Histórico</span>
                </div>
            </div>
        </div>
    `;

    const matchesContainer = document.getElementById('rival-matches-container');
    matchesContainer.innerHTML = '';
    rivalData.matches.forEach(partido => {
        const [gf, gc] = partido.resultado.split('-');
        let resultadoClass = 'derrota', resultadoText = 'Derrota';
        if (parseInt(gf) > parseInt(gc)) { resultadoClass = 'victoria'; resultadoText = 'Victoria'; }
        else if (parseInt(gf) === parseInt(gc)) { resultadoClass = 'empate'; resultadoText = 'Empate'; }

        const jugadoresHTML = (partido.jugadores && partido.jugadores.length > 0)
            ? `<div class="rival-players-container">
                ${partido.jugadores.map(j => `
                    <div class="rival-player-card">
                        <div class="rival-player-name">${j.nombre}</div>
                        <div class="flex items-center justify-center gap-3 text-xs font-semibold mt-1">
                            <span class="text-green-600 dark:text-green-400 font-bold">⚽ ${j.goles}</span>
                            <span class="text-blue-600 dark:text-blue-400 font-bold">🎯 ${j.asistencias}</span>
                        </div>
                    </div>
                `).join('')}
               </div>`
            : '<p class="text-gray-500 text-sm italic mt-2">No hay datos de jugadores disponibles.</p>';

        matchesContainer.innerHTML += `
            <div class="rival-match-card result-border-${resultadoClass}">
                <div class="rival-match-header">
                    <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <i class="fas fa-calendar-alt text-red-700"></i>
                        <span>${partido.fecha} • ${partido.lugar} • ${partido.hora}</span>
                    </div>
                    <span class="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">${partido.tipo}</span>
                </div>
                <div class="rival-match-result ${resultadoClass}">${partido.resultado} (${resultadoText})</div>
                ${jugadoresHTML}
            </div>
        `;
    });

    window.scrollTo({ top: 0, behavior: 'instant' });
    window.history.pushState({ section: 'rival-details', rival: rivalName }, '', `#rivales/${rivalName}`);
};

// Vuelve a la lista de tarjetas de rivales
window.backToRivales = function() {
    const rivalDetails = document.getElementById('rival-details');
    if (rivalDetails) rivalDetails.classList.add('hidden');
    ['stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    ['inicio', 'historia', 'equipo', 'partidos', 'rivales'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('hidden');
    });
    const rivalesContainer = document.getElementById('rivales-container');
    if (rivalesContainer) rivalesContainer.classList.remove('hidden');
    renderRivales();
    renderMatches('todos');
    window.history.pushState({ section: 'rivales' }, '', '#rivales');
    
    if (typeof window.restoreScrollOrSection === 'function') {
        window.restoreScrollOrSection('rivales');
    } else {
        window.scrollTo({ top: window.savedScrollPosition || 0, behavior: 'instant' });
    }
};
