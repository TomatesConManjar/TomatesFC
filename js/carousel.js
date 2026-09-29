// ============================================================
// CAROUSEL - Carrusel de jugadores en la sección Equipo
// Dependencias: ninguna (solo DOM)
// ============================================================

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
