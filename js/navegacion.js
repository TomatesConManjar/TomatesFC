// ============================================================
// NAVEGACION - Menú móvil, navbar, dark mode, historial
// ============================================================

// Sincroniza el color de fondo del menú móvil según el modo actual
function syncMobileMenuColor() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;
    const isDark = document.documentElement.classList.contains('dark');
    mobileMenu.style.background = isDark 
        ? 'linear-gradient(180deg, #12151e 0%, #0b0e14 100%)' 
        : 'linear-gradient(180deg, #160406 0%, #800f14 50%, #991b1b 100%)';
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

// Sincroniza iconos y textos del modo oscuro en Navbar desktop y menú móvil
function updateDarkModeUI(isDark) {
    // Icono Navbar Desktop
    const navIcon = document.getElementById('darkModeIconNav');
    if (navIcon) navIcon.className = isDark ? 'fas fa-sun text-yellow-400 text-lg' : 'fas fa-moon text-lg';

    // Icono y Texto en Menú Móvil
    const mobileIcon = document.getElementById('mobileDarkModeIcon');
    const mobileText = document.getElementById('mobileDarkModeText');
    if (mobileIcon) mobileIcon.className = isDark ? 'fas fa-sun text-yellow-400 text-lg w-5 text-center' : 'fas fa-moon text-yellow-400 text-lg w-5 text-center';
    if (mobileText) mobileText.textContent = isDark ? 'Modo Claro' : 'Modo Oscuro';

    // Compatibilidad legacy si existe el icono antiguo
    const legacyIcon = document.getElementById('darkModeIcon');
    if (legacyIcon) legacyIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// Poblar dinámicamente los submenús del Navbar (Equipo y Rivales) desde data.js
function populateNavbarSubmenus() {
    // Submenú de Equipo
    const equipoContainer = document.getElementById('equipo-nav-items');
    if (equipoContainer && typeof jugadoresData !== 'undefined') {
        equipoContainer.innerHTML = Object.entries(jugadoresData).map(([id, j]) => `
            <li class="nav-player-item"><a href="javascript:void(0);" onclick="showPlayerDetails('${id}')" class="block px-4 py-2 hover:bg-red-700 transition text-sm">${j.nombre}</a></li>
        `).join('');
    }

    // Submenú de Rivales
    const rivalesContainer = document.getElementById('rivales-nav-items');
    if (rivalesContainer && typeof partidosData !== 'undefined') {
        const uniqueRivales = [...new Set(Object.values(partidosData).map(p => p.rival))].sort((a, b) => a.localeCompare(b, 'es'));
        rivalesContainer.innerHTML = uniqueRivales.map(rival => `
            <li class="nav-rival-item"><a href="javascript:void(0);" onclick="showRivalDetails('${rival}')" class="block px-4 py-2 hover:bg-red-700 transition text-sm">${rival}</a></li>
        `).join('');
    }
}

// Toggle dark mode (llamado desde el Navbar o Menú Móvil)
window.toggleDarkMode = function() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    updateDarkModeUI(isDark);
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    syncMobileMenuColor();
};

document.addEventListener('DOMContentLoaded', function() {

    // --- Aplicar preferencia de dark mode guardada ---
    const isDark = localStorage.getItem('darkMode') === 'enabled';
    const html = document.documentElement;
    if (isDark) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    updateDarkModeUI(isDark);
    syncMobileMenuColor();

    // --- Poblar submenús dinámicos de jugadores y rivales ---
    populateNavbarSubmenus();

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

    // --- Manejo de ruta inicial según hash en la URL ---
    function handleInitialRoute() {
        const hash = window.location.hash;
        if (!hash) return;
        if (hash === '#stats-section' || hash === '#estadisticas') {
            if (typeof showStats === 'function') showStats();
        } else if (hash.startsWith('#jugador/')) {
            const playerId = hash.replace('#jugador/', '');
            if (typeof showPlayerDetails === 'function') showPlayerDetails(playerId);
        } else if (hash.startsWith('#partido/')) {
            const partidoId = hash.replace('#partido/', '');
            if (typeof showMatchDetails === 'function') showMatchDetails(partidoId);
        } else if (hash.startsWith('#rivales/')) {
            const rivalName = decodeURIComponent(hash.replace('#rivales/', ''));
            if (typeof showRivalDetails === 'function') showRivalDetails(rivalName);
        }
    }
    handleInitialRoute();
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
        const hash = window.location.hash;
        if (hash === '#stats-section' || hash === '#estadisticas') {
            if (typeof showStats === 'function') showStats();
            return;
        }
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
