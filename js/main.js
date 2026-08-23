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

// Inicializa el carrusel de jugadores
function initCarousel() {
    const carousel = document.getElementById('players-carousel');
    let prevBtn = document.getElementById('carousel-prev');
    let nextBtn = document.getElementById('carousel-next');
    if (!carousel || !prevBtn || !nextBtn) return;

    // Clonar botones para eliminar event listeners previos
    const newPrev = prevBtn.cloneNode(true);
    const newNext = nextBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrev, prevBtn);
    nextBtn.parentNode.replaceChild(newNext, nextBtn);

    function updateUI() {
        if (!carousel) return;
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        
        // Update Buttons
        newPrev.disabled = carousel.scrollLeft <= 5;
        newNext.disabled = carousel.scrollLeft >= maxScrollLeft - 5;

        // Update Indicators (Dashes) - Una línea por jugador
        const indicatorsContainer = document.getElementById('carousel-indicators');
        if (indicatorsContainer) {
            const numDots = carousel.querySelectorAll('.player-card:not(.hidden)').length;
            
            if (numDots === 0) {
                indicatorsContainer.innerHTML = '';
            } else {
                let activeIndex = 0;
                if (maxScrollLeft > 0) {
                    activeIndex = Math.round((carousel.scrollLeft / maxScrollLeft) * (numDots - 1));
                }

                if (indicatorsContainer.children.length !== numDots) {
                    indicatorsContainer.innerHTML = '';
                    for (let i = 0; i < numDots; i++) {
                        const dot = document.createElement('div');
                        dot.className = 'carousel-dot' + (i === activeIndex ? ' active' : '');
                        dot.addEventListener('click', () => {
                            const scrollTarget = (maxScrollLeft / (numDots - 1)) * i;
                            carousel.scrollTo({ left: scrollTarget, behavior: 'smooth' });
                        });
                        indicatorsContainer.appendChild(dot);
                    }
                } else {
                    Array.from(indicatorsContainer.children).forEach((dot, index) => {
                        dot.classList.toggle('active', index === activeIndex);
                    });
                }
            }
        }
    }

    function getScrollAmount() {
        const card = carousel.querySelector('.player-card:not(.hidden)');
        if (!card) return carousel.clientWidth * 0.8;
        
        // Calcular el ancho de una tarjeta más el gap
        const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
        const cardWidth = card.clientWidth + gap;
        
        // Desplazar la cantidad de cartas que caben enteras (al menos 1)
        const cardsInView = Math.max(1, Math.floor(carousel.clientWidth / cardWidth));
        return cardWidth * cardsInView;
    }

    newNext.addEventListener('click', function() {
        carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
    
    newPrev.addEventListener('click', function() {
        carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    carousel.addEventListener('scroll', updateUI);
    // Timeout para asegurar que el DOM y CSS estén listos para medir anchos
    setTimeout(updateUI, 100);
    window.addEventListener('resize', updateUI);
}

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

