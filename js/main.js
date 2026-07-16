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

    function updateUI() {
        if (!carousel) return;
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        
        // Update Buttons
        newPrev.disabled = carousel.scrollLeft <= 5;
        newNext.disabled = carousel.scrollLeft >= maxScrollLeft - 5;

        // Update Indicators (Dashes)
        const indicatorsContainer = document.getElementById('carousel-indicators');
        if (indicatorsContainer) {
            const visibleWidth = carousel.clientWidth;
            const totalWidth = carousel.scrollWidth;
            
            if (totalWidth <= visibleWidth) {
                indicatorsContainer.innerHTML = '';
            } else {
                const numPages = Math.ceil(totalWidth / visibleWidth);
                let activeIndex = 0;
                if (maxScrollLeft > 0) {
                    activeIndex = Math.round((carousel.scrollLeft / maxScrollLeft) * (numPages - 1));
                }

                if (indicatorsContainer.children.length !== numPages) {
                    indicatorsContainer.innerHTML = '';
                    for (let i = 0; i < numPages; i++) {
                        const dot = document.createElement('div');
                        dot.className = 'carousel-dot' + (i === activeIndex ? ' active' : '');
                        dot.addEventListener('click', () => {
                            const scrollTarget = (maxScrollLeft / (numPages - 1)) * i;
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

    newNext.addEventListener('click', function() {
        const scrollAmount = carousel.clientWidth * 0.8;
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    newPrev.addEventListener('click', function() {
        const scrollAmount = carousel.clientWidth * 0.8;
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    carousel.addEventListener('scroll', updateUI);
    // Timeout para asegurar que el DOM y CSS estén listos para medir anchos
    setTimeout(updateUI, 100);
    window.addEventListener('resize', updateUI);
}
