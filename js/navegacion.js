// ============================================================
// NAVEGACION - Menú móvil, navbar, dark mode, historial
// ============================================================

// Toggle dark mode (llamado desde el botón en el navbar)
window.toggleDarkMode = function() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    const icon = document.getElementById('darkModeIcon');
    if (isDark) {
        if (icon) icon.className = 'fas fa-sun';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        if (icon) icon.className = 'fas fa-moon';
        localStorage.setItem('darkMode', 'disabled');
    }
};

document.addEventListener('DOMContentLoaded', function() {

    // --- Aplicar preferencia de dark mode guardada ---
    const darkModeSetting = localStorage.getItem('darkMode');
    const html = document.documentElement;
    const icon = document.getElementById('darkModeIcon');
    if (darkModeSetting === 'enabled') {
        html.classList.add('dark');
        if (icon) icon.className = 'fas fa-sun';
    } else {
        html.classList.remove('dark');
        if (icon) icon.className = 'fas fa-moon';
    }

    // --- Menú móvil ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    function toggleMenu() {
        mobileMenuButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('hidden');
            menuOverlay.classList.remove('hidden');
        } else {
            setTimeout(() => {
                if (!mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.add('hidden');
                    menuOverlay.classList.add('hidden');
                }
            }, 300);
        }
    }

    function closeMenu() {
        mobileMenuButton.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
        setTimeout(() => {
            if (!mobileMenu.classList.contains('active')) {
                mobileMenu.classList.add('hidden');
                menuOverlay.classList.add('hidden');
            }
        }, 300);
    }

    if (mobileMenuButton) mobileMenuButton.addEventListener('click', toggleMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
    mobileMenuLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Cerrar menú con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
    });

    // --- Clicks en los enlaces del navbar ---
    document.querySelectorAll('nav a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccionId = this.getAttribute('href').split('#')[1];

            // Ocultar todas las secciones
            ['inicio', 'historia', 'equipo', 'partidos', 'rivales',
             'stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.add('hidden');
            });

            // Mostrar según sección seleccionada
            if (seccionId === 'inicio') {
                ['inicio', 'historia', 'equipo', 'partidos', 'rivales'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.classList.remove('hidden');
                });
                renderMatches('todos');
                renderRivales();
            } else if (['historia', 'equipo', 'partidos', 'rivales'].includes(seccionId)) {
                const el = document.getElementById(seccionId);
                if (el) el.classList.remove('hidden');
                if (seccionId === 'partidos') renderMatches('todos');
                if (seccionId === 'rivales') {
                    renderRivales();
                    const rd = document.getElementById('rival-details');
                    if (rd) rd.classList.add('hidden');
                    const rc = document.getElementById('rivales-container');
                    if (rc) rc.classList.remove('hidden');
                }
            }

            // Scroll con offset del navbar
            const el = document.getElementById(seccionId);
            if (el) {
                window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            }
            window.history.pushState({ section: seccionId }, '', `#${seccionId}`);
        });
    });
});

// --- Navegación con botones atrás/adelante del navegador ---
window.addEventListener('popstate', function(event) {
    if (event.state) {
        const s = event.state;
        if (s.section === 'player-details' && s.playerId) {
            showPlayerDetails(s.playerId);
        } else if (s.section === 'equipo') {
            backToTeam();
        } else if (s.section === 'match-details' && s.partidoId) {
            showMatchDetails(s.partidoId);
        } else if (s.section === 'partidos') {
            backToMatches();
        } else if (s.section === 'rival-details' && s.rival) {
            showRivalDetails(s.rival);
        } else if (s.section === 'rivales') {
            document.getElementById('rival-details').classList.add('hidden');
            document.getElementById('rivales-container').classList.remove('hidden');
            ['inicio', 'historia', 'equipo', 'partidos', 'stats-section',
             'player-details-section', 'match-details-section'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.add('hidden');
            });
            document.getElementById('rivales').classList.remove('hidden');
            renderRivales();
            const el = document.getElementById('rivales');
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        }
    } else {
        ['inicio', 'historia', 'equipo', 'partidos'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('hidden');
        });
        ['stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
    }
});
