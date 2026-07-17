// ============================================================
// MAIN - Inicialización: render inicial, búsquedas y carrusel
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

    // Render inicial
    renderMatches('todos');
    updateTeamStats();
    renderRivales();

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

