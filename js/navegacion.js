// ============================================================
// NAVEGACION - Menú móvil, navbar, dark mode, historial
// ============================================================

// Sincroniza el color de fondo del menú móvil según el modo actual
function syncMobileMenuColor() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;
    const isDark = document.documentElement.classList.contains('dark');
    mobileMenu.style.background = isDark 
        ? 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)' 
        : 'linear-gradient(180deg, #991b1b 0%, #7f1d1d 100%)';
}

// Función global para restaurar la posición de scroll guardada o volver a una sección específica
window.restoreScrollOrSection = function(fallbackSectionId) {
    const savedPos = window.savedScrollPosition;
    window.savedScrollPosition = null;

    // Doble requestAnimationFrame para asegurar que el navegador haya finalizado el reflow y layout
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (typeof savedPos === 'number' && savedPos > 50) {
                window.scrollTo({ top: savedPos, behavior: 'instant' });
            } else if (fallbackSectionId) {
                const target = document.getElementById(fallbackSectionId);
                if (target) {
                    const navHeight = document.querySelector('nav')?.offsetHeight || 70;
                    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
                    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
        });
    });
};

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
    syncMobileMenuColor();
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
    // Aplicar color correcto al menú móvil desde el inicio
    syncMobileMenuColor();

    // --- Menú móvil ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    function openMenu() {
        if (!mobileMenu || !mobileMenuButton || !menuOverlay) return;
        mobileMenuButton.classList.add('active');
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.classList.add('overflow-hidden');
    }

    function closeMenu() {
        if (!mobileMenu || !mobileMenuButton || !menuOverlay) return;
        mobileMenuButton.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    }

    function toggleMenu() {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (mobileMenuButton) mobileMenuButton.addEventListener('click', toggleMenu);
    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

    // Cerrar menú con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
    });

    // --- Clicks en los enlaces de navegación (Navbar, Menú móvil, Footer, Hero) ---
    document.querySelectorAll('nav a[href^="#"], #mobile-menu a[href^="#"], footer a[href^="#"], a.hero-btn, a.hero-btn-secondary').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const seccionId = href.split('#')[1];

            // Cerrar menú móvil si está abierto
            closeMenu();

            if (seccionId === 'stats-section') {
                if (typeof showStats === 'function') {
                    showStats();
                } else {
                    const el = document.getElementById('stats-section');
                    if (el) el.classList.remove('hidden');
                }
                return;
            }

            // Para secciones principales: asegurarse de que estén visibles
            ['inicio', 'historia', 'equipo', 'partidos', 'rivales'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove('hidden');
            });

            // Ocultar vistas de detalles y sub-secciones
            ['stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.add('hidden');
            });
            const rd = document.getElementById('rival-details');
            if (rd) rd.classList.add('hidden');
            const rc = document.getElementById('rivales-container');
            if (rc) rc.classList.remove('hidden');

            if (seccionId === 'partidos' && typeof renderMatches === 'function') renderMatches('todos');
            if (seccionId === 'rivales' && typeof renderRivales === 'function') renderRivales();

            // Scroll a la sección correspondiente
            if (seccionId === 'inicio') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const target = document.getElementById(seccionId);
                if (target) {
                    const navHeight = document.querySelector('nav')?.offsetHeight || 70;
                    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
                    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
                }
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
        } else if (s.section === 'stats-section') {
            if (typeof showStats === 'function') showStats();
        } else if (s.section === 'rivales') {
            backToRivales();
        } else if (['inicio', 'historia'].includes(s.section)) {
            ['inicio', 'historia', 'equipo', 'partidos', 'rivales'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove('hidden');
            });
            ['stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.add('hidden');
            });
            const rd = document.getElementById('rival-details');
            if (rd) rd.classList.add('hidden');
            const rc = document.getElementById('rivales-container');
            if (rc) rc.classList.remove('hidden');

            if (s.section === 'inicio') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const target = document.getElementById(s.section);
                if (target) {
                    const navHeight = document.querySelector('nav')?.offsetHeight || 70;
                    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
                    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
                }
            }
        }
    } else {
        ['inicio', 'historia', 'equipo', 'partidos', 'rivales'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('hidden');
        });
        ['stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        const rd = document.getElementById('rival-details');
        if (rd) rd.classList.add('hidden');
        const rc = document.getElementById('rivales-container');
        if (rc) rc.classList.remove('hidden');
    }
});

document.getElementById('footer-year').textContent = new Date().getFullYear();
