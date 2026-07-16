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

    function updateButtons() {
        if (!carousel) return;
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        newPrev.disabled = carousel.scrollLeft <= 5;
        newNext.disabled = carousel.scrollLeft >= maxScrollLeft - 5;
    }

    newNext.addEventListener('click', function() {
        const scrollAmount = carousel.clientWidth * 0.8;
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    newPrev.addEventListener('click', function() {
        const scrollAmount = carousel.clientWidth * 0.8;
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    carousel.addEventListener('scroll', updateButtons);
    updateButtons();
    window.addEventListener('resize', updateButtons);
}
