// ============================================================
// TACTICA - Pizarra Táctica Interactiva y Exportación
// Dependencias: data.js (jugadoresData), html2canvas (CDN)
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
        { label: 'ED',  x: 80, y: 28 }, { label: 'DC', x: 60, y: 28 }, { label: 'DC', x: 40, y: 28 }, { label: 'EI', x: 20, y: 28 },
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
        { label: 'MD',  x: 78, y: 50 }, { label: 'MC', x: 58, y: 50 }, { label: 'MC', x: 42, y: 50 }, { label: 'MI',  x: 22, y: 50 },
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

let currentFormation = '1-4-1';
// Mapeo posición índice → jugador asignado (id)
let lineupAssignments = {}; // { 0: 'agustin-vilhelm', 1: 'leandro-zavala', ... }

// Estado de selección para interacción por Clic / Tap
// null | { type: 'bench', playerId: string } | { type: 'pitch', slotIdx: number, playerId: string } | { type: 'empty-slot', slotIdx: number }
let activeSelection = null;

function getTacticalPlayerById(id) {
    return TACTICAL_PLAYERS.find(p => p.id === id);
}

// Actualiza el texto de instrucciones con el estado actual
function updateInstructionText() {
    const el = document.getElementById('tactical-instructions');
    if (!el) return;

    if (!activeSelection) {
        el.innerHTML = '<i class="fas fa-hand-pointer mr-1 text-amber-500"></i> Toca un jugador y luego la posición a la que quiere ir';
        return;
    }

    if (activeSelection.type === 'bench') {
        const player = getTacticalPlayerById(activeSelection.playerId);
        const name = player ? player.name : 'Jugador';
        el.innerHTML = `<span class="text-amber-400 font-semibold"><i class="fas fa-check-circle mr-1"></i> ${name} seleccionado</span> — Toca la posición en la cancha donde quieres ubicarlo`;
    } else if (activeSelection.type === 'pitch') {
        const player = getTacticalPlayerById(activeSelection.playerId);
        const name = player ? player.name : 'Titular';
        el.innerHTML = `<span class="text-amber-400 font-semibold"><i class="fas fa-check-circle mr-1"></i> ${name} seleccionado</span> — Toca otra posición para moverlo o el banco para sacarlo`;
    } else if (activeSelection.type === 'empty-slot') {
        const positions = FORMATIONS[currentFormation] || FORMATIONS['1-4-1'];
        const posLabel = (positions[activeSelection.slotIdx] && positions[activeSelection.slotIdx].label) || 'Posición';
        el.innerHTML = `<span class="text-amber-400 font-semibold"><i class="fas fa-bullseye mr-1"></i> Posición ${posLabel} seleccionada</span> — Toca un jugador del banco para ubicarlo aquí`;
    }
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
                 data-player-id="${p.id}">
                <img class="bench-avatar" src="${p.img}" alt="${p.name}"
                     onerror="this.src='images/logo_tomates.png'">
                <span class="bench-name">${p.name}</span>
            </div>
        `;
    }).join('');

    // Event listeners para los chips del banco (Click / Tap)
    bench.querySelectorAll('.bench-player-chip').forEach(chip => {
        const pId = chip.dataset.playerId;
        chip.addEventListener('click', e => {
            e.stopPropagation();
            handleSelectBench(pId);
        });
    });

    // Clic en fondo o espacio vacío del banco (para enviar titular al banco o cancelar selección)
    bench.onclick = (e) => {
        const chip = e.target.closest('.bench-player-chip');
        if (chip) return; // Si tocó un chip, lo maneja el chip

        if (activeSelection && activeSelection.type === 'pitch') {
            delete lineupAssignments[activeSelection.slotIdx];
            activeSelection = null;
            renderPitchTokens();
            renderBench();
        } else if (activeSelection) {
            activeSelection = null;
            renderPitchTokens();
            renderBench();
        }
    };

    updateInstructionText();
}

// Renderiza las fichas en la cancha
function renderPitchTokens() {
    const pitch = document.getElementById('tactical-pitch');
    if (!pitch) return;
    pitch.querySelectorAll('.pitch-player-token').forEach(el => el.remove());

    if (activeSelection) {
        pitch.classList.add('has-selection');
    } else {
        pitch.classList.remove('has-selection');
    }

    const positions = FORMATIONS[currentFormation] || FORMATIONS['1-4-1'];
    positions.forEach((pos, idx) => {
        const assignedId = lineupAssignments[idx];
        const player = assignedId ? getTacticalPlayerById(assignedId) : null;
        const isSelected = activeSelection && (
            (activeSelection.type === 'pitch' && activeSelection.slotIdx === idx) ||
            (activeSelection.type === 'empty-slot' && activeSelection.slotIdx === idx)
        );

        const token = document.createElement('div');
        token.className = `pitch-player-token ${isSelected ? 'selected-token' : ''} ${!player ? 'empty-token' : ''}`;
        token.style.left = `${pos.x}%`;
        token.style.top = `${pos.y}%`;
        token.setAttribute('data-slot', idx);
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

        // Clic / Tap
        token.addEventListener('click', e => {
            e.stopPropagation();
            handleSelectPitch(idx);
        });

        pitch.appendChild(token);
    });

    updateInstructionText();
}

// Lógica de Selección por Clic/Tap en puesto de la cancha
function handleSelectPitch(slotIdx) {
    const currentOccupant = lineupAssignments[slotIdx];

    if (!activeSelection) {
        // Nada seleccionado previamente
        if (currentOccupant) {
            // Selecciona al jugador titular en cancha
            activeSelection = { type: 'pitch', slotIdx, playerId: currentOccupant };
        } else {
            // Selecciona el slot vacío como destino
            activeSelection = { type: 'empty-slot', slotIdx };
        }
    } else if (activeSelection.type === 'bench') {
        // Había un jugador del banco seleccionado -> ubicarlo en este slot
        const benchPlayerId = activeSelection.playerId;
        // Si ya estaba en otra posición del campo, liberar la anterior
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
            // Clic en otra ficha de la cancha -> Mover o intercambiar posiciones
            const fromSlot = activeSelection.slotIdx;
            const fromPlayer = lineupAssignments[fromSlot];
            const toPlayer = lineupAssignments[slotIdx];

            if (toPlayer) {
                lineupAssignments[fromSlot] = toPlayer;
            } else {
                delete lineupAssignments[fromSlot];
            }

            if (fromPlayer) {
                lineupAssignments[slotIdx] = fromPlayer;
            } else {
                delete lineupAssignments[slotIdx];
            }

            activeSelection = null;
        }
    } else if (activeSelection.type === 'empty-slot') {
        if (activeSelection.slotIdx === slotIdx) {
            // Clic en el mismo slot vacío -> Deseleccionar
            activeSelection = null;
        } else if (currentOccupant) {
            // Si el slot tocado tiene jugador, moverlo al slot vacío previo
            lineupAssignments[activeSelection.slotIdx] = currentOccupant;
            delete lineupAssignments[slotIdx];
            activeSelection = null;
        } else {
            // Cambiar de slot vacío objetivo
            activeSelection = { type: 'empty-slot', slotIdx };
        }
    }

    renderPitchTokens();
    renderBench();
}

// Lógica de Selección por Clic/Tap en chip del banco
function handleSelectBench(playerId) {
    const assignedSlot = Object.keys(lineupAssignments).find(k => lineupAssignments[k] === playerId);

    if (!activeSelection) {
        if (assignedSlot !== undefined) {
            // Este jugador ya está en cancha -> seleccionarlo como titular
            activeSelection = { type: 'pitch', slotIdx: parseInt(assignedSlot), playerId };
        } else {
            // Seleccionar jugador del banco
            activeSelection = { type: 'bench', playerId };
        }
    } else if (activeSelection.type === 'empty-slot') {
        // Había un puesto de la cancha seleccionado -> colocar este jugador ahí
        const targetSlot = activeSelection.slotIdx;
        Object.keys(lineupAssignments).forEach(k => {
            if (lineupAssignments[k] === playerId) delete lineupAssignments[k];
        });
        lineupAssignments[targetSlot] = playerId;
        activeSelection = null;
    } else if (activeSelection.type === 'pitch') {
        const fromSlot = activeSelection.slotIdx;
        const fromPlayerId = lineupAssignments[fromSlot];

        if (fromPlayerId === playerId) {
            // Tocar el mismo jugador titular en el banco -> Sacarlo de la cancha (enviar al banco)
            delete lineupAssignments[fromSlot];
            activeSelection = null;
        } else if (assignedSlot !== undefined) {
            // Tocar otro jugador que ya está en cancha -> Intercambiar ambos puestos
            const toSlot = parseInt(assignedSlot);
            if (fromSlot !== toSlot) {
                lineupAssignments[fromSlot] = playerId;
                lineupAssignments[toSlot] = fromPlayerId;
            }
            activeSelection = null;
        } else {
            // Tocar un suplente del banco -> Sustituir al titular por este suplente
            lineupAssignments[fromSlot] = playerId;
            activeSelection = null;
        }
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

function assignPlayerToSlot(slotIdx, playerId) {
    Object.keys(lineupAssignments).forEach(k => {
        if (lineupAssignments[k] === playerId) delete lineupAssignments[k];
    });
    lineupAssignments[slotIdx] = playerId;
    renderPitchTokens();
    renderBench();
}

// Deseleccionar al hacer clic fuera de la pizarra y el banco
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

            const container = token.querySelector('.pitch-token-avatar-container');
            if (container) { container.style.width = '70px'; container.style.height = '70px'; }

            const avatar = token.querySelector('.pitch-token-avatar');
            if (avatar) { avatar.style.width = '100%'; avatar.style.height = '100%'; avatar.style.borderWidth = '3.5px'; }

            const numBadge = token.querySelector('.pitch-token-number');
            if (numBadge) {
                numBadge.style.width = '24px'; numBadge.style.height = '24px';
                numBadge.style.fontSize = '12px'; numBadge.style.bottom = '-6px'; numBadge.style.borderWidth = '2px';
            }

            const nameLabel = token.querySelector('.pitch-token-name');
            if (nameLabel) {
                nameLabel.style.marginTop = '10px'; nameLabel.style.fontSize = '12px';
                nameLabel.style.padding = '3px 12px'; nameLabel.style.borderRadius = '8px';
                nameLabel.style.borderWidth = '1.5px'; nameLabel.style.maxWidth = '110px';
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
        // Sincronizar formación con el select si existe
        const formationSelect = document.getElementById('formation-select');
        if (formationSelect && formationSelect.value) {
            currentFormation = formationSelect.value;
        }
        // Inicializar pizarra si es la primera vez
        renderPitchTokens();
        renderBench();
    }
};

// Hacer las funciones del popup accesibles globalmente
window.assignPlayerToSlot = assignPlayerToSlot;
