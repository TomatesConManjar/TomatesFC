// ============================================================
// MAIN - Inicialización: render inicial, búsquedas y carrusel
// ============================================================
function initMobileCarousel() {
    const carousel = document.getElementById('mobile-carousel');
    const prevBtn = document.getElementById('mobile-prev');
    const nextBtn = document.getElementById('mobile-next');
    if (!carousel || !prevBtn || !nextBtn) return;

    let current = 0;
    const total = 9;

    function update() {
        carousel.style.transform = `translateX(${-(current * 100)}%)`;
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === total - 1;
    }

    nextBtn.addEventListener('click', () => { if (current < total - 1) { current++; update(); } });
    prevBtn.addEventListener('click', () => { if (current > 0) { current--; update(); } });

    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    carousel.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (diff > 50 && current < total - 1) { current++; update(); }
        if (diff < -50 && current > 0) { current--; update(); }
    });

    update();
}
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

    // Buscador en la sección Equipo (aplica a mobile grid Y desktop carousel)
    const playerSearch = document.getElementById('playerSearch');
    if (playerSearch) {
        playerSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('#mobile-grid .player-card').forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                card.classList.toggle('hidden', !name.includes(searchTerm));
            });
            document.querySelectorAll('#players-carousel .player-card').forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                card.classList.toggle('hidden', !name.includes(searchTerm));
            });
        });
    }

    // Carrusel de jugadores (solo en desktop lg+)
    initCarousel();
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) initCarousel();
    });
});

// Inicializa (o re-inicializa) el carrusel de jugadores desktop
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

    let currentSlide = 0;
    const totalSlides = 7;

    function updateCarousel() {
        carousel.style.transform = `translateX(${-(currentSlide * 25)}%)`;
        carousel.style.overflowX = 'visible';
        newPrev.disabled = currentSlide === 0;
        newNext.disabled = currentSlide === totalSlides - 1;
    }

    newNext.addEventListener('click', function() {
        if (currentSlide < totalSlides - 1) { currentSlide++; updateCarousel(); }
    });
    newPrev.addEventListener('click', function() {
        if (currentSlide > 0) { currentSlide--; updateCarousel(); }
    });
    updateCarousel();
}
