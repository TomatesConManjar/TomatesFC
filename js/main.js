// ============================================================
// MAIN - Inicialización: render inicial, búsquedas y carrusel
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

    // Render inicial
    renderMatches('todos');
    updateTeamStats();
    renderRivales();

    // Poblar Banda de Stats del Hero con datos reales
    (function populateHeroStats() {
        try {
            let pj = 0, victorias = 0, empates = 0, goles = 0;
            Object.values(partidosData).forEach(p => {
                const [gf, gc] = p.resultado.split('-').map(Number);
                pj++;
                goles += gf;
                if (gf > gc) victorias++;
                else if (gf === gc) empates++;
            });
            const setPJ  = document.getElementById('hero-stat-pj');
            const setV   = document.getElementById('hero-stat-v');
            const setE   = document.getElementById('hero-stat-e');
            const setGF  = document.getElementById('hero-stat-gf');
            if (setPJ)  setPJ.textContent  = pj;
            if (setV)   setV.textContent   = victorias;
            if (setE)   setE.textContent   = empates;
            if (setGF)  setGF.textContent  = goles;
        } catch(e) { console.warn('Hero stats:', e); }
    })();


    // Buscador en la sección de Estadísticas del equipo
    const playerSearchStats = document.getElementById('playerSearchStats');
    if (playerSearchStats) {
        playerSearchStats.addEventListener('input', function(e) {
            renderTeamStats(e.target.value);
        });
    }

    // Buscador en la sección Equipo (aplica a carousel unificado)
    const playerSearch = document.getElementById('playerSearch');
    if (playerSearch) {
        playerSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('#players-carousel .player-card').forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                card.classList.toggle('hidden', !name.includes(searchTerm));
            });
        });
    }

    // Buscadores rápidos en el Navbar (Punto 1)
    const equipoNavSearch = document.getElementById('equipo-nav-search');
    if (equipoNavSearch) {
        equipoNavSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Filtrar todos los <li> hermanos excepto el buscador
            const items = this.closest('ul').querySelectorAll('li:not(:first-child)');
            items.forEach(li => {
                const text = li.textContent.toLowerCase();
                li.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
        // Prevenir que el clic en el buscador cierre el menú
        equipoNavSearch.addEventListener('click', e => e.stopPropagation());
    }

    const rivalesNavSearch = document.getElementById('rivales-nav-search');
    if (rivalesNavSearch) {
        rivalesNavSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const items = this.closest('ul').querySelectorAll('li:not(:first-child)');
            items.forEach(li => {
                const text = li.textContent.toLowerCase();
                li.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
        rivalesNavSearch.addEventListener('click', e => e.stopPropagation());
    }

    // Buscador Rápido de Rivales (Punto 3F)
    const rivalSearchInput = document.getElementById('rivalSearchInput');
    if (rivalSearchInput) {
        rivalSearchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('#rivales-container > div').forEach(card => {
                // Buscamos el nombre del rival, usualmente en un h3 o p con clase bold
                const rivalName = card.querySelector('h3')?.textContent.toLowerCase() || '';
                card.classList.toggle('hidden', !rivalName.includes(searchTerm));
            });
        });
    }


    // Carrusel unificado
    initCarousel();

    // Animaciones al hacer scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejamos de observar una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
});

// ============================================================
// PUNTO 4 - Barra de Progreso de Scroll
// ============================================================
(function initScrollProgressBar() {
    const bar = document.getElementById('scroll-progress-bar');
    if (!bar) return;

    function updateScrollBar() {
        const scrollTop    = window.scrollY || document.documentElement.scrollTop;
        const docHeight    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        bar.style.width = scrollPercent.toFixed(2) + '%';

        // Mostrar el punto dorado cuando ya hay algo de scroll
        if (scrollPercent > 1) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    }

    window.addEventListener('scroll', updateScrollBar, { passive: true });
    // Actualizar al cargar por si ya hay scroll guardado
    updateScrollBar();
})();

