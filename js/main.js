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
    if (window.innerWidth >= 1024) initCarousel();
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
    const totalSlides = 6;

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