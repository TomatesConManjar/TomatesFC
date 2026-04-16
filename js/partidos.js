// ============================================================
// PARTIDOS - Renderizado, filtros y detalles de partidos
// ============================================================

// Filtra partidos por resultado y actualiza estilos de botones
window.filterMatches = function(filter) {
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

// Renderiza las tarjetas de partidos según el filtro aplicado
function renderMatches(filter = 'todos') {
    const container = document.getElementById('matches-container');
    if (!container) return;
    container.innerHTML = '';

    let total = 0, victorias = 0, empates = 0, derrotas = 0;

    Object.entries(partidosData).forEach(([id, partido]) => {
        total++;
        const [golesLocal, golesVisitante] = partido.resultado.split('-').map(Number);
        let resultado = golesLocal > golesVisitante ? 'victoria' :
                        golesLocal === golesVisitante ? 'empate' : 'derrota';

        if (resultado === 'victoria') victorias++;
        else if (resultado === 'empate') empates++;
        else derrotas++;

        if (filter !== 'todos' && filter !== resultado) return;

        const escudoRival = getEscudoRival(partido.rival);
        container.innerHTML += `
            <div class="match-card p-6 hover:shadow-lg transition" data-result="${resultado}">
                <div class="flex justify-between items-center mb-4">
                    <span class="bg-green-600 text-white px-3 py-1 rounded-full text-sm">${partido.tipo}</span>
                    <p class="text-gray-600">${partido.fecha}</p>
                </div>
                <div class="flex items-center justify-between my-4">
                    <div class="text-center">
                        <img src="https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/Tomates_FC__13_-removebg-preview%20(1).png" alt="Escudo Tomates FC" class="mx-auto h-16 w-16 object-contain">
                        <p class="font-bold mt-2">Tomates FC</p>
                        <span class="text-4xl font-bold text-gray-800">${golesLocal}</span>
                    </div>
                    <div class="text-center mx-4">
                        <p class="font-bold text-xl">VS</p>
                        <p class="text-gray-600 text-sm">${partido.hora}</p>
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
    const btnMap = { 'todos': total, 'victorias': victorias, 'empates': empates, 'derrotas': derrotas };
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

    const historiaEl = document.querySelector('#historia .grid.md\\:grid-cols-3 > div:nth-child(3) p.text-gray-600');
    if (historiaEl) {
        historiaEl.textContent = `Tenemos la gran cantidad de ${golesAnotados} goles como equipo y con un promedio de ${promedio} goles por partido.`;
    }

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
        ['inicio', 'historia', 'equipo', 'partidos', 'rivales', 'stats-section', 'player-details-section'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });

        const matchDetailsSection = document.getElementById('match-details-section');
        if (!matchDetailsSection) return;
        matchDetailsSection.classList.remove('hidden');
        window.history.pushState({ section: 'match-details', partidoId }, '', `#partido/${partidoId}`);

        const offset = 50;
        const topPosition = matchDetailsSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: topPosition, behavior: 'smooth' });

        const partido = partidosData[partidoId];
        if (!partido) return;

        const escudoRival = getEscudoRival(partido.rival);
        const [golesLocal, golesVisitante] = partido.resultado.split('-');

        document.getElementById('match-header').innerHTML = `
            <div class="flex items-center justify-center space-x-8 mb-8">
                <div class="text-center">
                    <img src="https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/Tomates_FC__13_-removebg-preview%20(1).png" alt="Escudo Tomates FC" class="h-20 w-20 mx-auto mb-2">
                    <p class="font-bold text-lg">Tomates FC</p>
                    <span class="text-4xl font-bold text-red-800">${golesLocal}</span>
                </div>
                <div class="text-center">
                    <p class="text-2xl font-bold text-gray-600">VS</p>
                    <p class="text-sm text-green-600 font-semibold">${partido.tipo} • ${partido.hora}</p>
                    <p class="text-sm text-blue-600 font-semibold">${partido.lugar}</p>
                </div>
                <div class="text-center">
                    <img src="${escudoRival}" alt="Escudo ${partido.rival}" class="h-20 w-20 mx-auto mb-2">
                    <p class="font-bold text-lg">${partido.rival}</p>
                    <span class="text-4xl font-bold text-gray-800">${golesVisitante}</span>
                </div>
            </div>
        `;

        const playersContainer = document.getElementById('match-players');
        if (!playersContainer) return;
        playersContainer.innerHTML = '';
        partido.jugadores.forEach(jugador => {
            playersContainer.innerHTML += `
                <div class="bg-white rounded-lg p-6 shadow-lg border-2 border-red-100 hover:border-red-300 transition">
                    <h3 class="font-bold text-xl mb-3 text-red-800">${jugador.nombre}</h3>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">⚽ Goles:</span>
                            <span class="font-bold text-green-600">${jugador.goles}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">🎯 Asistencias:</span>
                            <span class="font-bold text-blue-600">${jugador.asistencias}</span>
                        </div>
                    </div>
                </div>
            `;
        });
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
        document.getElementById(id).classList.remove('hidden');
    });
    window.history.pushState({ section: 'partidos' }, '', '#partidos');
    renderMatches('todos');
    const title = document.getElementById('partidos-title');
    if (title) {
        const offset = 80;
        window.scrollTo({ top: title.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
};
