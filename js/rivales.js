// ============================================================
// RIVALES - Estadísticas, tarjetas y detalles por rival
// ============================================================

// Retorna la URL del escudo según el nombre del rival
function getEscudoRival(rival) {
    const escudos = {
        'Vaqueros':       'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png',
        'Real Justicia':  'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__3___1_-removebg-preview.png',
        'Equipo Maradona':'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png',
        'Manchester ICI': 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__2_-removebg-preview.png',
        'Resistencia IC': 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__1_-removebg-preview%20(1).png',
        'default':        'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/refs/heads/main/500x500__4_-removebg-preview.png'
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
        container.innerHTML += `
            <div class="rival-card" onclick="showRivalDetails('${rivalData.rival}')">
                <img src="${escudoRival}" alt="Escudo ${rivalData.rival}" class="mx-auto h-16 w-16 object-contain mb-4">
                <h3 class="rival-name text-center">${rivalData.rival}</h3>
                <div class="rival-stats">
                    <div class="rival-stat"><strong>${rivalData.partidos}</strong>Partidos</div>
                    <div class="rival-stat"><strong>${rivalData.victorias}</strong>G</div>
                    <div class="rival-stat"><strong>${rivalData.empates}</strong>E</div>
                    <div class="rival-stat"><strong>${rivalData.derrotas}</strong>P</div>
                    <div class="rival-stat"><strong>${rivalData.golesFavor} - ${rivalData.golesContra}</strong>GF - GC</div>
                    <div class="rival-stat"><strong>${rivalData.porcentajeVictorias}%</strong>Victorias</div>
                </div>
                <button onclick="showRivalDetails('${rivalData.rival}')" class="w-full bg-gray-100 hover:bg-red-100 text-red-800 py-2 rounded-full transition mt-4">
                    Ver detalles
                </button>
            </div>
        `;
    });
};

// Muestra el detalle de partidos y jugadores contra un rival
window.showRivalDetails = function(rivalName) {
    const rivalData = getRivalesStats().find(r => r.rival === rivalName);
    if (!rivalData) return;

    ['inicio', 'historia', 'equipo', 'partidos', 'stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    document.getElementById('rivales').classList.remove('hidden');
    document.getElementById('rivales-container').classList.add('hidden');
    document.getElementById('rival-details').classList.remove('hidden');

    const escudoRival = getEscudoRival(rivalName);
    document.getElementById('rival-header').innerHTML = `
        <div class="flex items-center justify-between mb-6">
            <div class="text-center">
                <img src="https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/Tomates_FC__13_-removebg-preview%20(1).png" alt="Tomates FC" class="h-16 w-16 mx-auto mb-2">
                <p class="font-bold">Tomates FC</p>
            </div>
            <div class="text-center">
                <h2 class="text-2xl font-bold text-red-800 mb-2">${rivalName}</h2>
                <p class="text-gray-600">Partidos: ${rivalData.partidos} | G: ${rivalData.victorias} E: ${rivalData.empates} P: ${rivalData.derrotas} | GF: ${rivalData.golesFavor} - ${rivalData.golesContra}</p>
            </div>
            <div class="text-center">
                <img src="${escudoRival}" alt="${rivalName}" class="h-16 w-16 mx-auto mb-2">
                <p class="font-bold">${rivalName}</p>
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
                        <div>⚽ <span class="rival-player-goles">${j.goles}</span> Goles</div>
                        <div>🎯 <span class="rival-player-asist">${j.asistencias}</span> Asist.</div>
                    </div>
                `).join('')}
               </div>`
            : '<p class="text-gray-500 text-sm italic mt-2">No hay datos de jugadores disponibles.</p>';

        matchesContainer.innerHTML += `
            <div class="rival-match-card">
                <div class="rival-match-header">
                    <p class="text-sm text-gray-600 flex-1">${partido.fecha} • ${partido.lugar} • ${partido.hora}</p>
                    <p class="text-sm text-gray-500 flex-1 text-right">${partido.tipo}</p>
                </div>
                <div class="rival-match-result ${resultadoClass}">${partido.resultado} (${resultadoText})</div>
                ${jugadoresHTML}
            </div>
        `;
    });

    const offset = 80;
    const detailsSection = document.getElementById('rival-details');
    window.scrollTo({ top: detailsSection.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    window.history.pushState({ section: 'rival-details', rival: rivalName }, '', `#rivales/${rivalName}`);
};

// Vuelve a la lista de tarjetas de rivales
window.backToRivales = function() {
    document.getElementById('rival-details').classList.add('hidden');
    ['stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    ['inicio', 'historia', 'equipo', 'partidos', 'rivales'].forEach(id => {
        document.getElementById(id).classList.remove('hidden');
    });
    document.getElementById('rivales-container').classList.remove('hidden');
    renderRivales();
    renderMatches('todos');
    window.history.pushState({ section: 'rivales' }, '', '#rivales');
    const tituloRivales = document.querySelector('#rivales h2');
    if (tituloRivales) {
        const offset = 80;
        window.scrollTo({ top: tituloRivales.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
};
