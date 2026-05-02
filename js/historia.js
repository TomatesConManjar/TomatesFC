//HISTORIA y PIE DE PAGINA

document.addEventListener('DOMContentLoaded', function() {

    const partidos = Object.values(partidosData);
    const totalPartidos = partidos.length;
    const totalJugadores = Object.keys(jugadoresData).length;

    let victorias = 0, empates = 0, derrotas = 0, totalGoles = 0;

    partidos.forEach(p => {
        if (p.resultado) {
            const [gf, gc] = p.resultado.split('-').map(Number);
            totalGoles += gf;
            if (gf > gc) victorias++;
            else if (gf === gc) empates++;
            else derrotas++;
        }
    });

    const pctVictoria = totalPartidos > 0 ? Math.round((victorias / totalPartidos) * 100) : 0;
    const promGoles = totalPartidos > 0 ? (totalGoles / totalPartidos).toFixed(1) : 0;

    // Sección Historia
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    set('stat-partidos-titulo', `${totalPartidos} partidos`);
    set('stat-partidos-desc', `Hemos disputado ${totalPartidos} partidos con un porcentaje de victoria del ${pctVictoria}%.`);
    set('stat-jugadores-titulo', `${totalJugadores} Jugadores`);
    set('stat-jugadores-desc', `Contamos con un plantel de ${totalJugadores} jugadores talentosos y comprometidos con el equipo.`);
    set('stat-goles-titulo', `${totalGoles} Goles`);
    set('stat-goles-desc', `Tenemos la gran cantidad de ${totalGoles} goles como equipo y con un promedio de ${promGoles} goles por partido.`);

    // Pie de página
    set('footer-partidos', totalPartidos);
    set('footer-victorias', victorias);
    set('footer-empates', empates);
    set('footer-derrotas', derrotas);
    set('footer-goles', totalGoles);
});
