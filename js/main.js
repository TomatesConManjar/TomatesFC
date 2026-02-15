  <script>
      tailwind.config = {
          darkMode: 'class',
      }
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
        // JavaScript para el menú móvil
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const menuOverlay = document.getElementById('menu-overlay');
            const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
            // Función para abrir/cerrar el menú
            function toggleMenu() {
                mobileMenuButton.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                menuOverlay.classList.toggle('active');
                document.body.classList.toggle('overflow-hidden');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('hidden');
                    menuOverlay.classList.remove('hidden');
                } else {
                    // Para que la animación de salida se vea, espera un poco antes de ocultar
                    setTimeout(() => {
                        if (!mobileMenu.classList.contains('active')) {
                            mobileMenu.classList.add('hidden');
                            menuOverlay.classList.add('hidden');
                        }
                    }, 300); // coincide con la duración de la transición CSS
                }
            }
            // Función para cerrar el menú
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
            // Event listeners
            mobileMenuButton.addEventListener('click', toggleMenu);
            menuOverlay.addEventListener('click', closeMenu);
            // Cerrar menú al hacer clic en un enlace
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    closeMenu();
                    // No manipular visibilidad aquí, solo cerrar menú
                });
            });
            // Obtener los enlaces del navbar
            const navbarEnlaces = document.querySelectorAll('nav a[href^="#"]');
            // Agregar evento de clic a los enlaces del navbar
            navbarEnlaces.forEach(enlace => {
                enlace.addEventListener('click', function(e) {
                    e.preventDefault();
                    const seccionId = this.getAttribute('href').split('#')[1];
                    // Ocultar todas las secciones principales y detalles
                    ['inicio', 'historia', 'equipo', 'partidos', 'rivales', 'stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.classList.add('hidden');
                    });
                    // Mostrar la sección seleccionada si es una sección principal
                    if (seccionId === 'inicio') {
                        // Mostrar todas las secciones deseadas al hacer clic en "Inicio"
                        ['inicio', 'historia', 'equipo', 'partidos', 'rivales'].forEach(id => {
                            const el = document.getElementById(id);
                            if (el) el.classList.remove('hidden');
                        });
                        // Renderizar contenido dinámico para todas
                        renderMatches('todos');
                        renderRivales();
                    } else if (['historia', 'equipo', 'partidos', 'rivales'].includes(seccionId)) {
                        // Mostrar solo la sección seleccionada
                        const el = document.getElementById(seccionId);
                        if (el) el.classList.remove('hidden');
                        // Renderizar contenido dinámico específico
                        if (seccionId === 'partidos') renderMatches('todos');
                        if (seccionId === 'rivales') renderRivales();
                    }
                    // Lógica específica para rivales (si no se capturó arriba)
                    if (seccionId === 'rivales') {
                    const rivalesSection = document.getElementById('rivales');
                        if (rivalesSection) {
                            rivalesSection.classList.remove('hidden');
                            renderRivales(); // Renderizar tarjetas de rivales
                        }
                    }
                    // Scroll con offset
                    const offset = 80;
                    const el = document.getElementById(seccionId);
                    if (el) {
                        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                        const offsetPosition = elementPosition - offset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                    // Actualizar URL
                    window.history.pushState({section: seccionId}, '', `#${seccionId}`);
                });
            });
            // Cerrar menú con ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeMenu();
                }
            });
        window.filterMatches = function(filter) {
            console.log('Filtro seleccionado:', filter);
            renderMatches(filter);
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                if (btn.dataset.filter === filter) {
                    btn.classList.remove('bg-gray-200', 'text-gray-700');
                    btn.classList.add('bg-red-800', 'text-white');
                } else {
                    btn.classList.remove('bg-red-800', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700');
                }
            });
        };
        // MODO OSCURO
        window.toggleDarkMode = function() {
            const html = document.documentElement;
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            const icon = document.getElementById('darkModeIcon');
            if (isDark) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('darkMode', 'disabled');
            }
        };
        // Al cargar la página, aplicar modo oscuro si está habilitado
        const darkModeSetting = localStorage.getItem('darkMode');
        const html = document.documentElement;
        const icon = document.getElementById('darkModeIcon');
        if (darkModeSetting === 'enabled') {
            html.classList.add('dark');
            icon.className = 'fas fa-sun';
        } else {
            html.classList.remove('dark');
            icon.className = 'fas fa-moon';
        }
            renderMatches('todos');
            updateTeamStats();
            renderRivales();
        // Event listener para el buscador de stats del equipo
        const playerSearchStats = document.getElementById('playerSearchStats');
        if (playerSearchStats) {
            playerSearchStats.addEventListener('input', function(e) {
                const searchTerm = e.target.value;
                renderTeamStats(searchTerm);
            });
        }
        // Buscador de jugadores en la sección equipo
        const playerSearch = document.getElementById('playerSearch');
        if (playerSearch) {
            playerSearch.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const playerCards = document.querySelectorAll('#equipo .player-card');
                playerCards.forEach(card => {
                    const playerName = card.querySelector('h3').textContent.toLowerCase();
                    if (playerName.includes(searchTerm)) {
                        card.classList.remove('hidden');  // Muestra el card
                    } else {
                        card.classList.add('hidden');  // Oculta el card
                    }
                });
            });    
            // Inicializar carrusel
            if (window.innerWidth >= 1024) { // lg breakpoint en Tailwind
                initCarousel();
            }
            // Re-inicializar en resize (para responsive)
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 1024) {
                    initCarousel();
                }
            });
            // Función para inicializar el carrusel
            function initCarousel() {
                const carousel = document.getElementById('players-carousel');
                const prevBtn = document.getElementById('carousel-prev');
                const nextBtn = document.getElementById('carousel-next');
                let currentSlide = 0;
                const totalSlides = 6; // 8 jugadores / 4 por slide
                if (!carousel || !prevBtn || !nextBtn) return;
                function updateCarousel() {
                    const translateX = - (currentSlide * 25); // 50% por slide (para 4 cards)
                    carousel.style.transform = `translateX(${translateX}%)`;
                    prevBtn.disabled = currentSlide === 0;
                    nextBtn.disabled = currentSlide === totalSlides - 1;
                    // Ajuste adicional: Asegura que el carrusel sea visible
                    carousel.style.overflowX = 'visible';  // Forzar visibilidad para depuración
                }
                nextBtn.addEventListener('click', function() {
                    if (currentSlide < totalSlides - 1) {
                        currentSlide++;
                        updateCarousel();
                    }
                });
                prevBtn.addEventListener('click', function() {
                    if (currentSlide > 0) {
                        currentSlide--;
                        updateCarousel();
                    }
                });
                // Actualizar búsqueda para incluir carrusel
                const playerSearch = document.getElementById('playerSearch');
                if (playerSearch) {
                    playerSearch.addEventListener('input', function(e) {
                        const searchTerm = e.target.value.toLowerCase();
                        // Buscar en mobile grid
                        const mobileCards = document.querySelectorAll('#mobile-grid .player-card');
                        mobileCards.forEach(card => {
                            const playerName = card.querySelector('h3').textContent.toLowerCase();
                            if (playerName.includes(searchTerm)) {
                                card.classList.remove('hidden');  // Muestra el card
                            } else {
                                card.classList.add('hidden');  // Oculta el card
                            }
                        });
                        const desktopCards = document.querySelectorAll('#players-carousel .player-card');
                        desktopCards.forEach(card => {
                            const playerName = card.querySelector('h3').textContent.toLowerCase();
                            if (playerName.includes(searchTerm)) {
                                card.classList.remove('hidden');  // Remueve la clase para mostrar
                            } else {
                                card.classList.add('hidden');  // Añade la clase para ocultar
                            }
                        });
                        if (searchTerm) {
                            currentSlide = 0;  // Vuelve al primer slide
                            updateCarousel();
                        }
                    });
                }
                // Inicial slide
                updateCarousel();
            }
        }
        });
        // Función para renderizar estadísticas del equipo dinámicamente
        function renderTeamStats(searchTerm = '') {
            const container = document.getElementById('stats-players-container');
            if (!container) {
                console.error('No se encontró el contenedor stats-players-container');
                return;
            }
            container.innerHTML = ''; // Limpiar contenido previo
            // Iterar sobre todos los jugadores en jugadoresData
            Object.entries(jugadoresData).forEach(([playerId, jugador]) => {
                const nombreLower = jugador.nombre.toLowerCase();
                // Filtrar por búsqueda si hay término
                if (searchTerm && !nombreLower.includes(searchTerm.toLowerCase())) {
                    return; // Omitir este jugador
                }
                // Calcular totals (igual que en showPlayerDetails)
                const totalGoles = jugador.partidos.reduce((sum, p) => sum + p.goles, 0);
                const totalAsistencias = jugador.partidos.reduce((sum, p) => sum + p.asistencias, 0);
                const partidosJugados = jugador.partidos.length;
                const golesPorPartido = partidosJugados > 0 ? (totalGoles / partidosJugados).toFixed(2) : 0;
                const asistenciasPorPartido = partidosJugados > 0 ? (totalAsistencias / partidosJugados).toFixed(2) : 0;
                // Generar HTML de la tarjeta (mismo estilo que antes, pero dinámico)
                const playerCardHTML = `
                    <div class="player-card player-card-enhanced rounded-lg overflow-hidden shadow-lg transition duration-300 cursor-pointer" onclick="showPlayerDetails('${playerId}')">
                        <div class="w-full h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center text-white rounded-t-lg relative">
                            <img src="${jugador.imagenCamiseta}" alt="Camiseta de ${jugador.nombre}" class="w-full h-full object-cover rounded-t-lg" onerror="this.src='https://via.placeholder.com/300x400?text=Imagen+No+Cargada'">
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-xl mb-2 text-red-800">${jugador.nombre}</h3>
                            <p class="text-gray-600 mb-4">${jugador.posicion} #${jugador.numero}</p>
                            <div class="space-y-3">
                                <div class="flex items-center justify-between py-2 border-b border-gray-100">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-green-600 text-sm">⚽</span>
                                        </div>
                                        <span class="font-semibold text-gray-700">Goles</span>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-2xl font-bold text-green-600">${totalGoles}</span>
                                        <p class="text-xs text-gray-500">${golesPorPartido} por partido</p>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between py-2 border-b border-gray-100">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-blue-600 text-sm">🎯</span>
                                        </div>
                                        <span class="font-semibold text-gray-700">Asistencias</span>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-2xl font-bold text-blue-600">${totalAsistencias}</span>
                                        <p class="text-xs text-gray-500">${asistenciasPorPartido} por partido</p>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between py-2">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-purple-600 text-sm">📅</span>
                                        </div>
                                        <span class="font-semibold text-gray-700">Partidos</span>
                                    </div>
                                    <span class="text-xl font-bold text-purple-600">${partidosJugados}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += playerCardHTML;
            });
            // Si no hay jugadores que coincidan con la búsqueda, mostrar mensaje
            if (container.innerHTML === '' && searchTerm) {
                container.innerHTML = '<p class="col-span-full text-center text-gray-500 py-8">No se encontraron jugadores con ese nombre.</p>';
            }
        }
        // Actualizar la función showStats para usar el render dinámico
        window.showStats = function() {
            console.log('showStats llamado');
            try {
                // Ocultar secciones principales
                document.getElementById('inicio').classList.add('hidden');
                document.getElementById('historia').classList.add('hidden');
                document.getElementById('equipo').classList.add('hidden');
                document.getElementById('partidos').classList.add('hidden');
                document.getElementById('rivales').classList.add('hidden');
                document.getElementById('match-details-section').classList.add('hidden');
                document.getElementById('player-details-section').classList.add('hidden');
                // Mostrar stats-section
                const statsSection = document.getElementById('stats-section');
                if (statsSection) {
                    statsSection.classList.remove('hidden');
                    // Renderizar stats dinámicamente (sin filtro inicial)
                    renderTeamStats();
                }
                // Scroll suave
                const offset = 80;
                const topPosition = statsSection.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth'
                });
            } catch (error) {
                console.error('Error en showStats:', error);
            }
        };
    </script>
    <script>
        window.goBack = function() {
            document.getElementById('inicio').classList.remove('hidden');
            document.getElementById('historia').classList.remove('hidden');
            document.getElementById('equipo').classList.remove('hidden');
            document.getElementById('partidos').classList.remove('hidden');
            document.getElementById('rivales').classList.remove('hidden');
            document.getElementById('stats-section').classList.add('hidden');
            document.getElementById('player-details-section').classList.add('hidden');
            document.getElementById('match-details-section').classList.add('hidden');
            window.history.pushState({section: 'equipo'}, '', '#equipo');
            // Desplazamiento suave a la sección de plantilla
            const equipoSection = document.getElementById('equipo');
            const offset = 80; // Ajusta este valor según sea necesario
            const topPosition = equipoSection.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });
        }
        // Datos de los partidos con jugadores
        const partidosData = {
            1: {
                fecha: "Lunes 20 Enero",
                rival: "Vaqueros",
                resultado: "22-10",
                lugar: "Cancha Los Pablos",
                tipo: "Amistoso",
                hora: "12:00 hrs",
                jugadores: [
                    { nombre: "Leandro Zavala", goles: 0, asistencias: 1 },
                    { nombre: "Benjamín Garcés", goles: 12, asistencias: 4 },
                    { nombre: "Diego Manque", goles: 7, asistencias: 8 },
                    { nombre: "Sebastián Sandoval", goles: 1, asistencias: 1 },
                ]
            },
            2: {
                fecha: "Lunes 3 Marzo",
                rival: "Vaqueros",
                resultado: "19-15",
                lugar: "Cancha Los Pablos",
                tipo: "Amistoso",
                hora: "11:00 hrs",
                jugadores: [
                    { nombre: "Leandro Zavala", goles: 1, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 7, asistencias: 1 },
                    { nombre: "Cristóbal Santibáñez", goles: 7, asistencias: 1 },
                    { nombre: "Diego Manque", goles: 3, asistencias: 5 },
                    { nombre: "Sebastián Sandoval", goles: 1, asistencias: 7 },
                ]
            },
            3: {
                fecha: "Viernes 28 Marzo",
                rival: "Manchester ICI",
                resultado: "4-15",
                lugar: "Canchas UFRO",
                tipo: "Amistoso",
                hora: "13:00 hrs",
                jugadores: [
                    { nombre: "Leandro Zavala", goles: 1, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 0, asistencias: 0 },
                    { nombre: "Cristóbal Santibáñez", goles: 0, asistencias: 0 },
                    { nombre: "Diego Manque", goles: 1, asistencias: 0 },
                    { nombre: "Sebastián Sandoval", goles: 1, asistencias: 1 },
                ]
            },
            4: {
                fecha: "Jueves 1 Mayo",
                rival: "Vaqueros",
                resultado: "5-15",
                lugar: "Cancha Los Pablos",
                tipo: "Amistoso",
                hora: "12:00 hrs",
                jugadores: [
                    { nombre: "Francisco Lizama", goles: 1, asistencias: 0 },
                    { nombre: "Leandro Zavala", goles: 1, asistencias: 1 },
                    { nombre: "Benjamín Garcés", goles: 1, asistencias: 0 },
                    { nombre: "Cristóbal Santibáñez", goles: 1, asistencias: 0 },
                    { nombre: "Diego Manque", goles: 0, asistencias: 1 },
                    { nombre: "Sebastián Sandoval", goles: 1, asistencias: 1 },
                ]
            },
            5: {
                fecha: "Viernes 9 Mayo",
                rival: "Real Justicia",
                resultado: "10-8",
                lugar: "Canchas Holandesa",
                tipo: "Amistoso",
                hora: "14:00 hrs",
                jugadores: [
                    { nombre: "Francisco Lizama", goles: 0, asistencias: 0 },
                    { nombre: "Leandro Zavala", goles: 5, asistencias: 4 },
                    { nombre: "Benjamín Garcés", goles: 1, asistencias: 2 },
                    { nombre: "Diego Manque", goles: 1, asistencias: 3 },
                    { nombre: "Sebastián Sandoval", goles: 2, asistencias: 2 },
                ]
            },
            6: {
                fecha: "Sabado 24 Mayo",
                rival: "Microdosis",
                resultado: "2-15",
                lugar: "Canchas Santa Laura",
                tipo: "Amistoso",
                hora: "14:00 hrs",
                jugadores: [
                    { nombre: "Francisco Lizama", goles: 0, asistencias: 0 },
                    { nombre: "Leandro Zavala", goles: 0, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 1, asistencias: 0 },
                    { nombre: "Matías Paredes", goles: 0, asistencias: 1 },
                    { nombre: "Diego Manque", goles: 0, asistencias: 0 },
                    { nombre: "Sebastián Sandoval", goles: 1, asistencias: 0 },

                ]
            },
            7: {
                fecha: "Viernes 30 Mayo",
                rival: "Real Justicia",
                resultado: "10-7",
                lugar: "Canchas Holandesa",
                tipo: "Amistoso",
                hora: "14:00 hrs",
                jugadores: [
                    { nombre: "Francisco Lizama", goles: 0, asistencias: 0 },
                    { nombre: "Leandro Zavala", goles: 4, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 1, asistencias: 3 },
                    { nombre: "Diego Manque", goles: 2, asistencias: 2 },
                    { nombre: "Sebastián Sandoval", goles: 2, asistencias: 0 },
                ]
            },
            8: {
                fecha: "Viernes 27 Junio",
                rival: "Resistencia IC",
                resultado: "5-5",
                lugar: "Canchas UFRO",
                tipo: "Amistoso",
                hora: "12:00 hrs",
                jugadores: [
                    { nombre: "Francisco Lizama", goles: 0, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 1, asistencias: 1 },
                    { nombre: "Diego Manque", goles: 0, asistencias: 2 },
                    { nombre: "Sebastián Sandoval", goles: 0, asistencias: 0 },
                ]
            },
            9: {
                fecha: "Lunes 14 Julio",
                rival: "Vaqueros",
                resultado: "13-14",
                lugar: "Cancha Los Pablos",
                tipo: "Amistoso",
                hora: "15:00 hrs",
                jugadores: [
                    { nombre: "Benjamín Garcés", goles: 2, asistencias: 2 },
                    { nombre: "Cristóbal Santibáñez", goles: 2, asistencias: 2 },
                    { nombre: "Matías Paredes", goles: 5, asistencias: 1 },
                    { nombre: "Diego Manque", goles: 1, asistencias: 4 },
                    { nombre: "Sebastián Sandoval", goles: 2, asistencias: 1 },
                    { nombre: "Matías Bustamante", goles: 1, asistencias: 1 },
                ]
            },
            10: {
                fecha: "Viernes 18 Julio",
                rival: "Real Justicia",
                resultado: "6-7",
                lugar: "Canchas UFRO",
                tipo: "Amistoso",
                hora: "12:00 hrs",
                jugadores: [
                    { nombre: "Benjamín Garcés", goles: 2, asistencias: 1 },
                    { nombre: "Matías Paredes", goles: 1, asistencias: 0 },
                    { nombre: "Diego Manque", goles: 1, asistencias: 3 },
                    { nombre: "Sebastián Sandoval", goles: 0, asistencias: 0 },
                ]
            },
            11: {
                fecha: "Jueves 31 Julio",
                rival: "Vaqueros",
                resultado: "10-14",
                lugar: "Cancha Los Pablos",
                tipo: "Amistoso",
                hora: "17:00 hrs",
                jugadores: [
                    { nombre: "Benjamín Garcés", goles: 2, asistencias: 1 },
                    { nombre: "Cristóbal Santibáñez", goles: 3, asistencias: 0 },
                    { nombre: "Matías Paredes", goles: 2, asistencias: 0 },
                    { nombre: "Diego Manque", goles: 0, asistencias: 1 },
                    { nombre: "Sebastián Sandoval", goles: 2, asistencias: 3 },
                ]
            },
            12: {
                fecha: "Sabado 23 Agosto",
                rival: "Equipo Pablismo",
                resultado: "5-5",
                lugar: "Canchas Santa Laura",
                tipo: "Amistoso",
                hora: "14:00 hrs",
                jugadores: [
                    { nombre: "Benjamín Garcés", goles: 0, asistencias: 1 },
                    { nombre: "Cristóbal Santibáñez", goles: 2, asistencias: 0 },
                    { nombre: "Diego Manque", goles: 2, asistencias: 0 },
                    { nombre: "Sebastián Sandoval", goles: 1, asistencias: 1 },
                    { nombre: "Matías Bustamante", goles: 0, asistencias: 1 },
                ]
            },
            13: {
                fecha: "Jueves 04 Septiembre",
                rival: "Equipo Maradona",
                resultado: "13-5",
                lugar: "Canchas UFRO",
                tipo: "Amistoso",
                hora: "19:00 hrs",
                jugadores: [
                    { nombre: "Leandro Zavala", goles: 0, asistencias: 1 },
                    { nombre: "Benjamín Garcés", goles: 1, asistencias: 3 },
                    { nombre: "Cristóbal Santíbáñez", goles: 3, asistencias: 0 },
                    { nombre: "Diego Manque", goles: 2, asistencias: 0 },
                    { nombre: "Sebastián Sandoval", goles: 1, asistencias: 2 },
                ]
            },
            14: {
                fecha: "Jueves 11 Septiembre",
                rival: "Equipo David",
                resultado: "5-8",
                lugar: "Canchas Holandesa",
                tipo: "Amistoso",
                hora: "17:00 hrs",
                jugadores: [
                    { nombre: "Leandro Zavala", goles: 1, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 0, asistencias: 2 },
                    { nombre: "Cristóbal Santíbáñez", goles: 3, asistencias: 0 },
                    { nombre: "Diego Manque", goles: 1, asistencias: 1 },
                    { nombre: "Sebastián Sandoval", goles: 0, asistencias: 1 },
                ]
            },
            15: {
                fecha: "Miercoles 17 Septiembre",
                rival: "Hipogolemicos",
                resultado: "9-5",
                lugar: "Canchas Santa Laura",
                tipo: "Amistoso",
                hora: "15:00 hrs",
                jugadores: [
                    { nombre: "Leandro Zavala", goles: 1, asistencias: 3 },
                    { nombre: "Francisco Lizama", goles: 0, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 1, asistencias: 2 },
                    { nombre: "Diego Manque", goles: 2, asistencias: 1 },
                    { nombre: "Sebastián Sandoval", goles: 2, asistencias: 2 },
                ]
            },
            16: {
                fecha: "Viernes 26 Septiembre",
                rival: "Pirula",
                resultado: "12-4",
                lugar: "Canchas Sportwash",
                tipo: "Amistoso",
                hora: "19:00 hrs",
                jugadores: [
                    { nombre: "Leandro Zavala", goles: 0, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 3, asistencias: 3 },
                    { nombre: "Cristóbal Santibáñez", goles: 1, asistencias: 1 },
                    { nombre: "Diego Manque", goles: 1, asistencias: 6 },
                    { nombre: "Sebastián Sandoval", goles: 7, asistencias: 0 },
                    { nombre: "Matías Bustamante", goles: 0, asistencias: 1 },
                ]
            },
            17: {
                fecha: "Viernes 10 Octubre",
                rival: "Equipo Maradona",
                resultado: "7-11",
                lugar: "Canchas UFRO",
                tipo: "Amistoso",
                hora: "17:00 hrs",
                jugadores: [
                    { nombre: "Francisco Lizama", goles: 0, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 1, asistencias: 1 },
                    { nombre: "Cristóbal Santibáñez", goles: 1, asistencias: 0 },
                    { nombre: "Matías Paredes", goles: 3, asistencias: 1 },
                    { nombre: "Diego Manque", goles: 1, asistencias: 2 },
                    { nombre: "Sebastián Sandoval", goles: 1, asistencias: 0 },
                    { nombre: "Matías Bustamante", goles: 0, asistencias: 0 },
                ]
            },
            18: {
                fecha: "Martes 14 Octubre",
                rival: "Hipogolemicos",
                resultado: "11-5",
                lugar: "Canchas Santa Laura",
                tipo: "Amistoso",
                hora: "15:00 hrs",
                jugadores: [
                    { nombre: "Leandro Zavala", goles: 0, asistencias: 0 },
                    { nombre: "Francisco Lizama", goles: 0, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 3, asistencias: 2 },
                    { nombre: "Cristóbal Santibáñez", goles: 2, asistencias: 0 },
                    { nombre: "Diego Manque", goles: 1, asistencias: 1 },
                    { nombre: "Sebastián Sandoval", goles: 2, asistencias: 1 },
                ]
            },
            19: {
                fecha: "Jueves 16 Octubre",
                rival: "Conoco Grande",
                resultado: "20-22",
                lugar: "Cancha Conoco Grande",
                tipo: "Amistoso",
                hora: "16:00 hrs",
                jugadores: [
                    { nombre: "Leandro Zavala", goles: 1, asistencias: 4 },
                    { nombre: "Francisco Lizama", goles: 0, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 6, asistencias: 2 },
                    { nombre: "Diego Manque", goles: 6, asistencias: 4 },
                    { nombre: "Sebastián Sandoval", goles: 7, asistencias: 3 },
                ]
            },
            20: {
                fecha: "Viernes 24 Octubre",
                rival: "Equipo Maradona",
                resultado: "11-13",
                lugar: "Canchas Sportwash",
                tipo: "Amistoso",
                hora: "19:00 hrs",
                jugadores: [
                    { nombre: "Francisco Lizama", goles: 0, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 0, asistencias: 1 },
                    { nombre: "Cristóbal Santibáñez", goles: 1, asistencias: 0 },
                    { nombre: "Matías Paredes", goles: 5, asistencias: 1 },
                    { nombre: "Diego Manque", goles: 1, asistencias: 0 },
                    { nombre: "Sebastián Sandoval", goles: 2, asistencias: 1 },
                    { nombre: "Matías Bustamante", goles: 1, asistencias: 1 },
                ]
            },
            21: {
                fecha: "Jueves 30 Octubre",
                rival: "Pirula",
                resultado: "5-4",
                lugar: "Canchas Sport One",
                tipo: "Amistoso",
                hora: "17:00 hrs",
                jugadores: [
                    { nombre: "Benjamín Garcés", goles: 1, asistencias: 1 },
                    { nombre: "Cristóbal Santibáñez", goles: 1, asistencias: 0 },
                    { nombre: "Matías Paredes", goles: 3, asistencias: 2 },
                    { nombre: "Diego Manque", goles: 0, asistencias: 0 },
                    { nombre: "Sebastián Sandoval", goles: 0, asistencias: 1 },
                ]
            },
            22: {
                fecha: "Martes 04 Noviembre",
                rival: "Equipo Giovanni",
                resultado: "5-13",
                lugar: "Canchas Santa Laura",
                tipo: "Amistoso",
                hora: "15:00 hrs",
                jugadores: [
                    { nombre: "Francisco Lizama", goles: 0, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 0, asistencias: 0 },
                    { nombre: "Cristóbal Santibáñez", goles: 1, asistencias: 1 },
                    { nombre: "Matías Paredes", goles: 4, asistencias: 0 },
                    { nombre: "Diego Manque", goles: 0, asistencias: 1 },
                    { nombre: "Sebastián Sandoval", goles: 0, asistencias: 1 },
                ]
            },
            23: {
                fecha: "Miercoles 05 Noviembre",
                rival: "Pirula",
                resultado: "6-10",
                lugar: "Canchas Santa Laura",
                tipo: "Amistoso",
                hora: "14:00 hrs",
                jugadores: [
                    { nombre: "Francisco Lizama", goles: 0, asistencias: 1 },
                    { nombre: "Benjamín Garcés", goles: 4, asistencias: 0 },
                    { nombre: "Diego Manque", goles: 1, asistencias: 2 },
                    { nombre: "Sebastián Sandoval", goles: 0, asistencias: 1 },
                ]
            },
            24: {
                fecha: "Jueves 13 Noviembre",
                rival: "Pirula",
                resultado: "15-12",
                lugar: "Canchas Santa Laura",
                tipo: "Amistoso",
                hora: "17:00 hrs",
                jugadores: [
                    { nombre: "Benjamín Garcés", goles: 0, asistencias: 2 },
                    { nombre: "Matías Paredes", goles: 6, asistencias: 2 },
                    { nombre: "Diego Manque", goles: 2, asistencias: 2 },
                    { nombre: "Sebastián Sandoval", goles: 4, asistencias: 0 },
                ]
            },
            25: {
                fecha: "Viernes 14 Noviembre",
                rival: "Real Justicia",
                resultado: "7-12",
                lugar: "Canchas Holandesa",
                tipo: "Amistoso",
                hora: "17:00 hrs",
                jugadores: [
                    { nombre: "Benjamín Garcés", goles: 1, asistencias: 1 },
                    { nombre: "Cristóbal Santibáñez", goles: 2, asistencias: 1 },
                    { nombre: "Diego Manque", goles: 1, asistencias: 2 },
                    { nombre: "Sebastián Sandoval", goles: 3, asistencias: 1 },
                    { nombre: "Matías Bustamante", goles: 0, asistencias: 1 },
                ]
            },
            26: {
                fecha: "Sábado 29 Noviembre",
                rival: "Pirula",
                resultado: "11-10",
                lugar: "Canchas Santa Laura",
                tipo: "Amistoso",
                hora: "12:00 hrs",
                jugadores: [
                    { nombre: "Francisco Lizama", goles: 0, asistencias: 1 },
                    { nombre: "Benjamín Garcés", goles: 3, asistencias: 2 },
                    { nombre: "Diego Manque", goles: 1, asistencias: 3 },
                    { nombre: "Sebastián Sandoval", goles: 1, asistencias: 1 },
                    { nombre: "Matías Bustamante", goles: 0, asistencias: 3 },
                ]
            },
            27: {
                fecha: "Domingo 14 Diciembre",
                rival: "Equipo Pablismo",
                resultado: "5-18",
                lugar: "Canchas Santa Laura",
                tipo: "Amistoso",
                hora: "17:00 hrs",
                jugadores: [
                    { nombre: "Francisco Lizama", goles: 0, asistencias: 0 },
                    { nombre: "Benjamín Garcés", goles: 2, asistencias: 0 },
                    { nombre: "Cristóbal Santibáñez", goles: 1, asistencias: 0 },
                    { nombre: "Diego Manque", goles: 1, asistencias: 2 },
                    { nombre: "Sebastián Sandoval", goles: 0, asistencias: 0 },
                    { nombre: "Matías Bustamante", goles: 0, asistencias: 1 }
                ]
            }
        };
        function renderMatches(filter = 'todos') {
            console.log('renderMatches llamado con filtro:', filter);
            const container = document.getElementById('matches-container');
            if (!container) {
                console.error('No se encontró el contenedor matches-container');
                return;
            }
            container.innerHTML = ''; // limpiar contenido previo
            // Contadores para estadísticas
            let total = 0, victorias = 0, empates = 0, derrotas = 0;
            Object.entries(partidosData).forEach(([id, partido]) => {
                total++;
                const [golesLocal, golesVisitante] = partido.resultado.split('-').map(Number);
                let resultado = '';
                if (golesLocal > golesVisitante) resultado = 'victoria';
                else if (golesLocal === golesVisitante) resultado = 'empate';
                else resultado = 'derrota';
                // Contar resultados
                if (resultado === 'victoria') victorias++;
                else if (resultado === 'empate') empates++;
                else if (resultado === 'derrota') derrotas++;
                // Filtrar partidos según filtro
                if (filter !== 'todos' && filter !== resultado) {
                    console.log(`Omitiendo partido ${id} por filtro ${filter} (resultado: ${resultado})`);
                    return;
                }
                console.log(`Mostrando partido ${id} (resultado: ${resultado})`);
                // Obtener escudo rival
                let escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/refs/heads/main/500x500__4_-removebg-preview.png';
                switch(partido.rival) {
                    case 'Vaqueros': escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png'; break;
                    case 'Manchester ICI': escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__2_-removebg-preview.png'; break;
                    case 'Real Justicia': escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__3___1_-removebg-preview.png'; break;
                    case 'Resistencia IC': escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__1_-removebg-preview%20(1).png'; break;
                    // Otros casos si tienes
                }
                const partidoHTML = `
                    <div class="match-card p-6 hover:shadow-lg transition" data-result="${resultado}">
                        <div class="flex justify-between items-center mb-4">
                            <span class="bg-green-600 text-white px-3 py-1 rounded-full text-sm">${partido.tipo}</span>
                            <p class="text-gray-600">${partido.fecha}</p>
                        </div>
                        <div class="flex items-center justify-between my-4">
                            <div class="text-center">
                                <img src="https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/Tomates_FC__13_-removebg-preview%20(1).png" alt="Escudo Tomates FC" class="mx-auto h-16 w-16 object-contain">
                                <p class="font-bold mt-2">Tomates FC</p>
                                <span class="text-4xl font-bold text-gray-800">${golesLocal}</span>
                            </div>
                            <div class="text-center mx-4">
                                <p class="font-bold text-xl">VS</p>
                                <p class="text-gray-600 text-sm">${partido.hora}</p>
                            </div>
                            <div class="text-center">
                                <img src="${escudoRival}" alt="Escudo ${partido.rival}" class="mx-auto h-16 w-16 object-contain">
                                <p class="font-bold mt-2">${partido.rival}</p>
                                <span class="text-4xl font-bold text-gray-800">${golesVisitante}</span>
                            </div>
                        </div>
                        <button onclick="showMatchDetails(${id})" class="w-full bg-gray-100 hover:bg-red-100 text-red-800 py-2 rounded-full transition">
                            Ver detalles
                        </button>
                    </div>
                `;
                container.innerHTML += partidoHTML;
            });
            // Actualizar botones filtro con conteos
            const btnTodos = document.querySelector('button[data-filter="todos"]');
            const btnVictorias = document.querySelector('button[data-filter="victorias"]');
            const btnEmpates = document.querySelector('button[data-filter="empates"]');
            const btnDerrotas = document.querySelector('button[data-filter="derrotas"]');
            if (btnTodos) btnTodos.textContent = `Todos (${total})`;
            if (btnVictorias) btnVictorias.textContent = `Victorias (${victorias})`;
            if (btnEmpates) btnEmpates.textContent = `Empates (${empates})`;
            if (btnDerrotas) btnDerrotas.textContent = `Derrotas (${derrotas})`;
        }
        function updateTeamStats() {
            let totalPartidos = 0;
            let victorias = 0;
            let empates = 0;
            let derrotas = 0;
            let golesAnotados = 0;
            Object.values(partidosData).forEach(partido => {
                totalPartidos++;
                const [golesLocal, golesVisitante] = partido.resultado.split('-').map(Number);
                golesAnotados += golesLocal;
                if (golesLocal > golesVisitante) victorias++;
                else if (golesLocal === golesVisitante) empates++;
                else derrotas++;
            });
            const promedioGoles = (golesAnotados / totalPartidos).toFixed(2);
            // Actualizar sección historia
            const historiaStats = document.querySelector('#historia .grid.md\\:grid-cols-3 > div:nth-child(3) p.text-gray-600');
            if (historiaStats) {
                historiaStats.textContent = `Tenemos la gran cantidad de ${golesAnotados} goles como equipo y con un promedio de ${promedioGoles} goles por partido.`;
            }
            // Actualizar pie de página
            const footerStats = document.querySelector('footer ul.space-y-2.text-gray-300');
            if (footerStats) {
                footerStats.innerHTML = `
                    <li><span class="font-semibold">Partidos:</span> ${totalPartidos}</li>
                    <li><span class="font-semibold">Victorias:</span> ${victorias}</li>
                    <li><span class="font-semibold">Empates:</span> ${empates}</li>
                    <li><span class="font-semibold">Derrotas:</span> ${derrotas}</li>
                    <li><span class="font-semibold">Goles anotados:</span> ${golesAnotados}</li>
                `;
            }
        }
        window.showMatchDetails = function(partidoId) {
            console.log('showMatchDetails llamado con:', partidoId);
            try {
                document.getElementById('inicio').classList.add('hidden');
                document.getElementById('historia').classList.add('hidden');
                document.getElementById('equipo').classList.add('hidden');
                document.getElementById('partidos').classList.add('hidden');
                document.getElementById('rivales').classList.add('hidden');
                document.getElementById('stats-section').classList.add('hidden');
                document.getElementById('player-details-section').classList.add('hidden');
                const matchDetailsSection = document.getElementById('match-details-section');
                if (!matchDetailsSection) {
                    console.error('No se encontró el elemento match-details-section');
                    return;
                }
                matchDetailsSection.classList.remove('hidden');
                window.history.pushState({section: 'match-details', partidoId: partidoId}, '', `#partido/${partidoId}`);
                const offset = 50;
                const topPosition = matchDetailsSection.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth'
                });
                const partido = partidosData[partidoId];
                if (!partido) {
                    console.error('No se encontró información para el partido con ID:', partidoId);
                    return;
                }
                // Obtener escudo del rival según el nombre
                let escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/refs/heads/main/500x500__4_-removebg-preview.png'; // Default
                switch(partido.rival) {
                    case 'Vaqueros':
                        escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png';
                        break;
                    case 'Manchester ICI':
                        escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__2_-removebg-preview.png';
                        break;
                    case 'Real Justicia':
                        escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__3___1_-removebg-preview.png';
                        break;
                    case 'Resistencia IC':
                        escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__1_-removebg-preview%20(1).png';
                        break;
                    case 'Microdosis':
                        escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png';
                        break;
                    case 'Equipo Pablismo':
                        escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png';
                        break;
                    case 'Equipo Maradona':
                        escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png';
                        break;
                    case 'Equipo David':
                        escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png';
                        break;
                    case 'Hipogolemicos':
                        escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png';
                        break;
                    case 'Pirula':
                        escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png';
                        break;
                    case 'Conoco Grande':
                        escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png';
                        break;
                    case 'Equipo Giovanni':
                        escudoRival = 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png';
                        break;
                }    
                // Crear HTML con escudos y resultado
                const [golesLocal, golesVisitante] = partido.resultado.split('-');
                const matchHeader = `
                    <div class="flex items-center justify-center space-x-8 mb-8">
                        <div class="text-center">
                            <img src="https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/Tomates_FC__13_-removebg-preview%20(1).png" alt="Escudo Tomates FC" class="h-20 w-20 mx-auto mb-2">
                            <p class="font-bold text-lg">Tomates FC</p>
                            <span class="text-4xl font-bold text-red-800">${golesLocal}</span>
                        </div>
                        <div class="text-center">
                            <p class="text-2xl font-bold text-gray-600">VS</p>
                            <p class="text-sm text-green-600 font-semibold">${partido.tipo} • ${partido.hora}</p>
                            <p class="text-sm text-blue-600 font-semibold"> ${partido.lugar}</p>
                        </div>
                        <div class="text-center">
                            <img src="${escudoRival}" alt="Escudo ${partido.rival}" class="h-20 w-20 mx-auto mb-2">
                            <p class="font-bold text-lg">${partido.rival}</p>
                            <span class="text-4xl font-bold text-gray-800">${golesVisitante}</span>
                        </div>
                    </div>
                `;
                document.getElementById('match-header').innerHTML = matchHeader;
                // Cargar jugadores
                const playersContainer = document.getElementById('match-players');
                if (!playersContainer) {
                    console.error('No se encontró el contenedor match-players');
                    return;
                }
                playersContainer.innerHTML = '';
                partido.jugadores.forEach(jugador => {
                    const playerCard = `
                        <div class="bg-white rounded-lg p-6 shadow-lg border-2 border-red-100 hover:border-red-300 transition">
                            <h3 class="font-bold text-xl mb-3 text-red-800">${jugador.nombre}</h3>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">⚽ Goles:</span>
                                    <span class="font-bold text-green-600">${jugador.goles}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">🎯 Asistencias:</span>
                                    <span class="font-bold text-blue-600">${jugador.asistencias}</span>
                                </div>
                            </div>
                        </div>
                    `;
                    playersContainer.innerHTML += playerCard;
                });
            } catch (error) {
                console.error('Error en showMatchDetails:', error);
            }
        };
        window.backToMatches = function() {
            document.getElementById('match-details-section').classList.add('hidden');
            document.getElementById('stats-section').classList.add('hidden');
            document.getElementById('player-details-section').classList.add('hidden');
            document.getElementById('inicio').classList.remove('hidden');
            document.getElementById('historia').classList.remove('hidden');
            document.getElementById('equipo').classList.remove('hidden');
            document.getElementById('partidos').classList.remove('hidden');
            document.getElementById('rivales').classList.remove('hidden');
            window.history.pushState({section: 'partidos'}, '', '#partidos');
            const title = document.getElementById('partidos-title');
            const offset = 80;  // Aumentado de 50 a 80px para compensar navbar (ajusta si es necesario)
            const topPosition = title.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });
        }
        // BUSCADOR DE JUGADORES - SECCIÓN PRINCIPAL
        document.getElementById('playerSearch').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const playerCards = document.querySelectorAll('#equipo .player-card');
            playerCards.forEach(card => {
                const playerName = card.querySelector('h3').textContent.toLowerCase();
                if (playerName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        // Datos completos de los jugadores
        const jugadoresData = {
            'leandro-zavala': {
                nombre: 'Leandro Zavala',
                numero: 5,
                posicion: 'Defensa',
                frase: 'La defensa es el pilar de todo gran equipo',
                imagenCamiseta: 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/refs/heads/main/preview-2025-11-05T15_01_08.804Z.png',
                partidos: [
                    { id: 1, rival: 'Vaqueros', fecha: 'Lunes 20 Enero', goles: 0, asistencias: 1 },
                    { id: 2, rival: 'Vaqueros', fecha: 'Lunes 3 Marzo', goles: 1, asistencias: 0 },
                    { id: 3, rival: 'Manchester ICI', fecha: 'Viernes 28 Marzo', goles: 1, asistencias: 0 },
                    { id: 4, rival: 'Vaqueros', fecha: 'Jueves 1 Mayo', goles: 1, asistencias: 1 },
                    { id: 5, rival: 'Real Justicia', fecha: 'Viernes 9 Mayo', goles: 5, asistencias: 4 },
                    { id: 6, rival: 'Microdosis', fecha: 'Sábado 24 Mayo', goles: 0, asistencias: 0 },
                    { id: 7, rival: 'Real Justicia', fecha: 'Viernes 30 Mayo', goles: 4, asistencias: 0 },
                    { id: 13, rival: 'Equipo Maradona', fecha: 'Jueves 04 Septiembre', goles: 0, asistencias: 1 },
                    { id: 14, rival: 'Equipo David', fecha: 'Jueves 11 Septiembre', goles: 1, asistencias: 0 },
                    { id: 15, rival: 'Hipogolemicos', fecha: 'Miércoles 17 Septiembre', goles: 1, asistencias: 3 },
                    { id: 16, rival: 'Pirula', fecha: 'Viernes 26 Septiembre', goles: 0, asistencias: 0 },
                    { id: 18, rival: 'Hipogolemicos', fecha: 'Martes 14 Octubre', goles: 0, asistencias: 0 },
                    { id: 19, rival: 'Conoco Grande', fecha: 'Jueves 16 Octubre', goles: 1, asistencias: 4 }
                ]
            },
            'francisco-lizama': {
                nombre: 'Francisco Lizama',
                numero: 6,
                posicion: 'Defensa',
                frase: 'La última línea de defensa, siempre alerta',
                imagenCamiseta: 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/refs/heads/main/preview-2025-11-05T15_00_52.091Z.png',
                partidos: [
                    { id: 4, rival: 'Vaqueros', fecha: 'Jueves 1 Mayo', goles: 1, asistencias: 0 },
                    { id: 5, rival: 'Real Justicia', fecha: 'Viernes 9 Mayo', goles: 0, asistencias: 0 },
                    { id: 6, rival: 'Microdosis', fecha: 'Sábado 24 Mayo', goles: 0, asistencias: 0 },
                    { id: 7, rival: 'Real Justicia', fecha: 'Viernes 30 Mayo', goles: 0, asistencias: 0 },
                    { id: 8, rival: 'Resistencia IC', fecha: 'Viernes 27 Junio', goles: 0, asistencias: 0 },
                    { id: 15, rival: 'Hipogolemicos', fecha: 'Miércoles 17 Septiembre', goles: 0, asistencias: 0 },
                    { id: 17, rival: 'Equipo Maradona', fecha: 'Viernes 10 Octubre', goles: 0, asistencias: 0 },
                    { id: 18, rival: 'Hipogolemicos', fecha: 'Martes 14 Octubre', goles: 0, asistencias: 0 },
                    { id: 19, rival: 'Conoco Grande', fecha: 'Jueves 16 Octubre', goles: 0, asistencias: 0 },
                    { id: 20, rival: 'Equipo Maradona', fecha: 'Viernes 24 Octubre', goles: 0, asistencias: 0 },
                    { id: 22, rival: 'Equipo Giovanni', fecha: 'Martes 04 Noviembre', goles: 0, asistencias: 0 },
                    { id: 23, rival: 'Pirula', fecha: 'Miercoles 05 Noviembre', goles: 0, asistencias: 1 },
                    { id: 26, rival: 'Pirula', fecha: 'Sábado 29 Noviembre', goles: 0, asistencias: 1 },
                    { id: 27, rival: 'Equipo Pablismo', fecha: 'Domingo 14 Diciembre', goles: 0, asistencias: 0 }
                ]
            },
            'benjamin-garces': {
                nombre: 'Benjamín Garcés',
                numero: 7,
                posicion: 'Delantero',
                frase: 'Cada gol cuenta, y yo estoy aquí para marcar la diferencia',
                imagenCamiseta: 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/refs/heads/main/preview-2025-11-05T15_00_39.306Z.png',
                partidos: [
                    { id: 1, rival: 'Vaqueros', fecha: 'Lunes 20 Enero', goles: 12, asistencias: 4 },
                    { id: 2, rival: 'Vaqueros', fecha: 'Lunes 3 Marzo', goles: 7, asistencias: 1 },
                    { id: 3, rival: 'Manchester ICI', fecha: 'Viernes 28 Marzo', goles: 0, asistencias: 0 },
                    { id: 4, rival: 'Vaqueros', fecha: 'Jueves 1 Mayo', goles: 1, asistencias: 0 },
                    { id: 5, rival: 'Real Justicia', fecha: 'Viernes 9 Mayo', goles: 1, asistencias: 2 },
                    { id: 6, rival: 'Microdosis', fecha: 'Sábado 24 Mayo', goles: 1, asistencias: 0 },
                    { id: 7, rival: 'Real Justicia', fecha: 'Viernes 30 Mayo', goles: 1, asistencias: 3 },
                    { id: 8, rival: 'Resistencia IC', fecha: 'Viernes 27 Junio', goles: 1, asistencias: 1 },
                    { id: 9, rival: 'Vaqueros', fecha: 'Lunes 14 Julio', goles: 2, asistencias: 2 },
                    { id: 10, rival: 'Real Justicia', fecha: 'Viernes 18 Julio', goles: 2, asistencias: 1 },
                    { id: 11, rival: 'Vaqueros', fecha: 'Jueves 31 Julio', goles: 2, asistencias: 1 },
                    { id: 12, rival: 'Equipo Pablismo', fecha: 'Sábado 23 Agosto', goles: 0, asistencias: 1 },
                    { id: 13, rival: 'Equipo Maradona', fecha: 'Jueves 04 Septiembre', goles: 1, asistencias: 3 },
                    { id: 14, rival: 'Equipo David', fecha: 'Jueves 11 Septiembre', goles: 0, asistencias: 2 },
                    { id: 15, rival: 'Hipogolemicos', fecha: 'Miércoles 17 Septiembre', goles: 1, asistencias: 2 },
                    { id: 16, rival: 'Pirula', fecha: 'Viernes 26 Septiembre', goles: 3, asistencias: 3 },
                    { id: 17, rival: 'Equipo Maradona', fecha: 'Viernes 10 Octubre', goles: 1, asistencias: 1 },
                    { id: 18, rival: 'Hipogolemicos', fecha: 'Martes 14 Octubre', goles: 3, asistencias: 2 },
                    { id: 19, rival: 'Conoco Grande', fecha: 'Jueves 16 Octubre', goles: 6, asistencias: 2 },
                    { id: 20, rival: 'Equipo Maradona', fecha: 'Viernes 24 Octubre', goles: 0, asistencias: 1 },
                    { id: 21, rival: 'Pirula', fecha: 'Jueves 30 Octubre', goles: 1, asistencias: 1 },
                    { id: 22, rival: 'Equipo Giovanni', fecha: 'Martes 04 Noviembre', goles: 0, asistencias: 0 },
                    { id: 23, rival: 'Pirula', fecha: 'Miercoles 05 Noviembre', goles: 4, asistencias: 0 },
                    { id: 24, rival: 'Pirula', fecha: 'Jueves 13 Noviembre', goles: 0, asistencias: 2 },
                    { id: 25, rival: 'Real Justicia', fecha: 'Viernes 14 Noviembre', goles: 1, asistencias: 1 },
                    { id: 26, rival: 'Pirula', fecha: 'Sábado 29 Noviembre', goles: 3, asistencias: 2 },
                    { id: 27, rival: 'Equipo Pablismo', fecha: 'Domingo 14 Diciembre', goles: 2, asistencias: 0 }
                ]
            },
            'cristobal-santibanez': {
                nombre: 'Cristóbal Santibáñez',
                numero: 8,
                posicion: 'Delantero',
                frase: 'Anticipar el juego es lo que me define como delantero',
                imagenCamiseta: 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/refs/heads/main/preview-2025-11-05T15_00_20.611Z.png',
                partidos: [
                    { id: 2, rival: 'Vaqueros', fecha: 'Lunes 3 Marzo', goles: 7, asistencias: 1 },
                    { id: 3, rival: 'Manchester ICI', fecha: 'Viernes 28 Marzo', goles: 0, asistencias: 0 },
                    { id: 4, rival: 'Vaqueros', fecha: 'Jueves 1 Mayo', goles: 1, asistencias: 0 },
                    { id: 9, rival: 'Vaqueros', fecha: 'Lunes 14 Julio', goles: 2, asistencias: 2 },
                    { id: 11, rival: 'Vaqueros', fecha: 'Jueves 31 Julio', goles: 3, asistencias: 0 },
                    { id: 12, rival: 'Equipo Pablismo', fecha: 'Sábado 23 Agosto', goles: 2, asistencias: 0 },
                    { id: 13, rival: 'Equipo Maradona', fecha: 'Jueves 04 Septiembre', goles: 3, asistencias: 0 },
                    { id: 14, rival: 'Equipo David', fecha: 'Jueves 11 Septiembre', goles: 3, asistencias: 0 },
                    { id: 16, rival: 'Pirula', fecha: 'Viernes 26 Septiembre', goles: 1, asistencias: 1 },
                    { id: 17, rival: 'Equipo Maradona', fecha: 'Viernes 10 Octubre', goles: 1, asistencias: 0 },
                    { id: 18, rival: 'Hipogolemicos', fecha: 'Martes 14 Octubre', goles: 2, asistencias: 0 },
                    { id: 20, rival: 'Equipo Maradona', fecha: 'Viernes 24 Octubre', goles: 1, asistencias: 0 },
                    { id: 21, rival: 'Pirula', fecha: 'Jueves 30 Octubre', goles: 1, asistencias: 0 },
                    { id: 22, rival: 'Equipo Giovanni', fecha: 'Martes 04 Noviembre', goles: 1, asistencias: 1 },
                    { id: 25, rival: 'Real Justicia', fecha: 'Viernes 14 Noviembre', goles: 2, asistencias: 1 },
                    { id: 27, rival: 'Equipo Pablismo', fecha: 'Domingo 14 Diciembre', goles: 1, asistencias: 0 }
                ]
            },
            'matias-paredes': {
                nombre: 'Matías Paredes',
                numero: 9,
                posicion: 'Delantero',
                frase: 'Cada gol es un paso más hacia la victoria',
                imagenCamiseta: 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/refs/heads/main/preview-2025-11-05T15_00_04.125Z.png',
                partidos: [
                    { id: 6, rival: 'Microdosis', fecha: 'Sábado 24 Mayo', goles: 0, asistencias: 1 },
                    { id: 9, rival: 'Vaqueros', fecha: 'Lunes 14 Julio', goles: 5, asistencias: 1 },
                    { id: 10, rival: 'Real Justicia', fecha: 'Viernes 18 Julio', goles: 1, asistencias: 0 },
                    { id: 11, rival: 'Vaqueros', fecha: 'Jueves 31 Julio', goles: 2, asistencias: 0 },
                    { id: 17, rival: 'Equipo Maradona', fecha: 'Viernes 10 Octubre', goles: 3, asistencias: 1 },
                    { id: 20, rival: 'Equipo Maradona', fecha: 'Viernes 24 Octubre', goles: 5, asistencias: 1 },
                    { id: 21, rival: 'Pirula', fecha: 'Jueves 30 Octubre', goles: 3, asistencias: 2 },
                    { id: 22, rival: 'Equipo Giovanni', fecha: 'Martes 04 Noviembre', goles: 4, asistencias: 0 },
                    { id: 24, rival: 'Pirula', fecha: 'Jueves 13 Noviembre', goles: 6, asistencias: 2 }
                ]
            },
            'diego-manque': {
                nombre: 'Diego Manque',
                numero: 10,
                posicion: 'Mediocampista',
                frase: 'Crear oportunidades es mi pasión en el campo',
                imagenCamiseta: 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/refs/heads/main/preview-2025-11-05T14_59_46.976Z.png',
                partidos: [
                    { id: 1, rival: 'Vaqueros', fecha: 'Lunes 20 Enero', goles: 7, asistencias: 8 },
                    { id: 2, rival: 'Vaqueros', fecha: 'Lunes 3 Marzo', goles: 3, asistencias: 5 },
                    { id: 3, rival: 'Manchester ICI', fecha: 'Viernes 28 Marzo', goles: 1, asistencias: 0 },
                    { id: 4, rival: 'Vaqueros', fecha: 'Jueves 1 Mayo', goles: 0, asistencias: 1 },
                    { id: 5, rival: 'Real Justicia', fecha: 'Viernes 9 Mayo', goles: 1, asistencias: 3 },
                    { id: 6, rival: 'Microdosis', fecha: 'Sábado 24 Mayo', goles: 0, asistencias: 0 },
                    { id: 7, rival: 'Real Justicia', fecha: 'Viernes 30 Mayo', goles: 2, asistencias: 2 },
                    { id: 8, rival: 'Resistencia IC', fecha: 'Viernes 27 Junio', goles: 0, asistencias: 2 },
                    { id: 9, rival: 'Vaqueros', fecha: 'Lunes 14 Julio', goles: 1, asistencias: 4 },
                    { id: 10, rival: 'Real Justicia', fecha: 'Viernes 18 Julio', goles: 1, asistencias: 3 },
                    { id: 11, rival: 'Vaqueros', fecha: 'Jueves 31 Julio', goles: 0, asistencias: 1 },
                    { id: 12, rival: 'Equipo Pablismo', fecha: 'Sábado 23 Agosto', goles: 2, asistencias: 0 },
                    { id: 13, rival: 'Equipo Maradona', fecha: 'Jueves 04 Septiembre', goles: 2, asistencias: 0 },
                    { id: 14, rival: 'Equipo David', fecha: 'Jueves 11 Septiembre', goles: 1, asistencias: 1 },
                    { id: 15, rival: 'Hipogolemicos', fecha: 'Miércoles 17 Septiembre', goles: 2, asistencias: 1 },
                    { id: 16, rival: 'Pirula', fecha: 'Viernes 26 Septiembre', goles: 1, asistencias: 6 },
                    { id: 17, rival: 'Equipo Maradona', fecha: 'Viernes 10 Octubre', goles: 1, asistencias: 2 },
                    { id: 18, rival: 'Hipogolemicos', fecha: 'Martes 14 Octubre', goles: 1, asistencias: 1 },
                    { id: 19, rival: 'Conoco Grande', fecha: 'Jueves 16 Octubre', goles: 6, asistencias: 4 },
                    { id: 20, rival: 'Equipo Maradona', fecha: 'Viernes 24 Octubre', goles: 1, asistencias: 0 },
                    { id: 21, rival: 'Pirula', fecha: 'Jueves 30 Octubre', goles: 0, asistencias: 0 },
                    { id: 22, rival: 'Equipo Giovanni', fecha: 'Martes 04 Noviembre', goles: 0, asistencias: 1 },
                    { id: 23, rival: 'Pirula', fecha: 'Miercoles 05 Noviembre', goles: 1, asistencias: 2 },
                    { id: 24, rival: 'Pirula', fecha: 'Jueves 13 Noviembre', goles: 2, asistencias: 2 },
                    { id: 25, rival: 'Real Justicia', fecha: 'Viernes 14 Noviembre', goles: 1, asistencias: 2 },
                    { id: 26, rival: 'Pirula', fecha: 'Sábado 29 Noviembre', goles: 1, asistencias: 3 },
                    { id: 27, rival: 'Equipo Pablismo', fecha: 'Domingo 14 Diciembre', goles: 2, asistencias: 1 }
                ]
            },
            'sebastian-sandoval': {
                nombre: 'Sebastián Sandoval',
                numero: 11,
                posicion: 'Mediocampista',
                frase: 'Siempre listo para recuperar el balón y apoyar al equipo',
                imagenCamiseta: 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/refs/heads/main/preview-2025-11-05T14_59_22.181Z.png',
                partidos: [
                    { id: 1, rival: 'Vaqueros', fecha: 'Lunes 20 Enero', goles: 1, asistencias: 1 },
                    { id: 2, rival: 'Vaqueros', fecha: 'Lunes 3 Marzo', goles: 1, asistencias: 7 },
                    { id: 3, rival: 'Manchester ICI', fecha: 'Viernes 28 Marzo', goles: 1, asistencias: 1 },
                    { id: 4, rival: 'Vaqueros', fecha: 'Jueves 1 Mayo', goles: 1, asistencias: 1 },
                    { id: 5, rival: 'Real Justicia', fecha: 'Viernes 9 Mayo', goles: 2, asistencias: 2 },
                    { id: 6, rival: 'Microdosis', fecha: 'Sábado 24 Mayo', goles: 1, asistencias: 0 },
                    { id: 7, rival: 'Real Justicia', fecha: 'Viernes 30 Mayo', goles: 2, asistencias: 0 },
                    { id: 8, rival: 'Resistencia IC', fecha: 'Viernes 27 Junio', goles: 0, asistencias: 0 },
                    { id: 9, rival: 'Vaqueros', fecha: 'Lunes 14 Julio', goles: 2, asistencias: 1 },
                    { id: 10, rival: 'Real Justicia', fecha: 'Viernes 18 Julio', goles: 0, asistencias: 0 },
                    { id: 11, rival: 'Vaqueros', fecha: 'Jueves 31 Julio', goles: 2, asistencias: 3 },
                    { id: 12, rival: 'Equipo Pablismo', fecha: 'Sábado 23 Agosto', goles: 1, asistencias: 1 },
                    { id: 13, rival: 'Equipo Maradona', fecha: 'Jueves 04 Septiembre', goles: 1, asistencias: 2 },
                    { id: 14, rival: 'Equipo David', fecha: 'Jueves 11 Septiembre', goles: 0, asistencias: 1 },
                    { id: 15, rival: 'Hipogolemicos', fecha: 'Miércoles 17 Septiembre', goles: 2, asistencias: 2 },
                    { id: 16, rival: 'Pirula', fecha: 'Viernes 26 Septiembre', goles: 7, asistencias: 0 },
                    { id: 17, rival: 'Equipo Maradona', fecha: 'Viernes 10 Octubre', goles: 1, asistencias: 0 },
                    { id: 18, rival: 'Hipogolemicos', fecha: 'Martes 14 Octubre', goles: 2, asistencias: 1 },
                    { id: 19, rival: 'Conoco Grande', fecha: 'Jueves 16 Octubre', goles: 7, asistencias: 3 },
                    { id: 20, rival: 'Equipo Maradona', fecha: 'Viernes 24 Octubre', goles: 2, asistencias: 1 },
                    { id: 21, rival: 'Pirula', fecha: 'Jueves 30 Octubre', goles: 0, asistencias: 1 },
                    { id: 22, rival: 'Equipo Giovanni', fecha: 'Martes 04 Noviembre', goles: 0, asistencias: 1 },
                    { id: 23, rival: 'Pirula', fecha: 'Miercoles 05 Noviembre', goles: 0, asistencias: 1 },
                    { id: 24, rival: 'Pirula', fecha: 'Jueves 13 Noviembre', goles: 4, asistencias: 0 },
                    { id: 25, rival: 'Real Justicia', fecha: 'Viernes 14 Noviembre', goles: 3, asistencias: 1 },
                    { id: 26, rival: 'Pirula', fecha: 'Sábado 29 Noviembre', goles: 1, asistencias: 1 },
                    { id: 27, rival: 'Equipo Pablismo', fecha: 'Domingo 14 Diciembre', goles: 0, asistencias: 0 }
                ]
            },
            'matias-bustamante': {
                nombre: 'Matias Bustamante',
                numero: 14,
                posicion: 'Mediocampista',
                frase: 'No hay balón perdido si yo estoy cerca, de un área a la otra',
                imagenCamiseta: 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/refs/heads/main/preview-2025-11-05T14_58_51.101Z.png',
                partidos: [
                    { id: 9, rival: 'Vaqueros', fecha: 'Lunes 14 Julio', goles: 1, asistencias: 1 },
                    { id: 12, rival: 'Equipo Pablismo', fecha: 'Sábado 23 Agosto', goles: 0, asistencias: 1 },
                    { id: 16, rival: 'Pirula', fecha: 'Viernes 26 Septiembre', goles: 0, asistencias: 1 },
                    { id: 17, rival: 'Equipo Maradona', fecha: 'Viernes 10 Octubre', goles: 0, asistencias: 0 },
                    { id: 20, rival: 'Equipo Maradona', fecha: 'Viernes 24 Octubre', goles: 1, asistencias: 1 },
                    { id: 25, rival: 'Real Justicia', fecha: 'Viernes 14 Noviembre', goles: 0, asistencias: 1 },
                    { id: 26, rival: 'Pirula', fecha: 'Sábado 29 Noviembre', goles: 0, asistencias: 3 },
                    { id: 27, rival: 'Equipo Pablismo', fecha: 'Domingo 14 Diciembre', goles: 0, asistencias: 1 }
                ]
            }
        };
        // Función para mostrar detalles del jugador
        window.showPlayerDetails = function(playerId) {
            const jugador = jugadoresData[playerId];
            if (!jugador) {
                console.error('Jugador no encontrado:', playerId);
                return;
            }
            // Ocultar secciones principales
            ['inicio', 'historia', 'equipo', 'partidos', 'rivales', 'stats-section', 'match-details-section'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.add('hidden');
            });
            // Mostrar sección detalles jugador
            const detalles = document.getElementById('player-details-section');
            if (!detalles) {
                console.error('No se encontró player-details-section');
                return;
            }
            detalles.classList.remove('hidden');
            // Limpiar contenido previo
            document.getElementById('player-header').innerHTML = '';
            document.getElementById('general-stats').innerHTML = '';
            document.getElementById('match-performances').innerHTML = '';
            // Insertar contenido básico en player-header
            document.getElementById('player-header').innerHTML = `
                <div class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                    <div class="relative">
                        <div class="w-48 h-60 bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center text-white rounded-lg shadow-lg relative">
                            <i class="fas fa-user text-8xl mb-4 text-gray-300"></i>
                        </div>
                        <div class="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-red-800 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                            ${jugador.numero}
                        </div>
                    </div>
                    <div class="flex-1 text-center md:text-left">
                        <h1 class="text-4xl font-bold text-red-800 mb-2">${jugador.nombre}</h1>
                        <p class="text-xl text-gray-600 mb-4">${jugador.posicion} • #${jugador.numero}</p>
                        <p class="text-lg text-gray-700 italic mb-6">"${jugador.frase}"</p>
                    </div>
                </div>
            `;
            // Calcular totales simples
            const totalGoles = jugador.partidos.reduce((sum, p) => sum + p.goles, 0);
            const totalAsistencias = jugador.partidos.reduce((sum, p) => sum + p.asistencias, 0);
            const partidosJugados = jugador.partidos.length;
            const totalContribuciones = totalGoles + totalAsistencias;
            // Insertar estadísticas generales con contribuciones en naranja
            document.getElementById('general-stats').innerHTML = `
                <div class="stat-card bg-white rounded-lg p-6 shadow-lg text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">${totalGoles}</div>
                    <div class="text-sm text-gray-600">Goles Totales</div>
                    <div class="text-xs text-gray-500 mt-1">${(totalGoles / partidosJugados).toFixed(2)} por partido</div>
                </div>
                <div class="stat-card bg-white rounded-lg p-6 shadow-lg text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">${totalAsistencias}</div>
                    <div class="text-sm text-gray-600">Asistencias Totales</div>
                    <div class="text-xs text-gray-500 mt-1">${(totalAsistencias / partidosJugados).toFixed(2)} por partido</div>
                </div>
                <div class="stat-card bg-white rounded-lg p-6 shadow-lg text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">${partidosJugados}</div>
                    <div class="text-sm text-gray-600">Partidos Jugados</div>
                    <div class="text-xs text-gray-500 mt-1">de 27 totales</div>
                </div>
                <div class="stat-card bg-white rounded-lg p-6 shadow-lg text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">${totalContribuciones}</div>
                    <div class="text-sm text-gray-600">Contribuciones</div>
                    <div class="text-xs text-gray-500 mt-1">Goles + Asistencias</div>
                </div>
            `;
            // Crear rendimiento por partido con colores según resultado
            let matchPerformancesHTML = '';
            jugador.partidos.forEach(partido => {
                // Obtener resultado del partido para determinar color
                const partidoData = partidosData[partido.id];
                let resultado = partidoData ? partidoData.resultado : null;
                let esVictoria = false, esEmpate = false;
                if (resultado) {
                    const [golesLocal, golesVisitante] = resultado.split('-').map(n => parseInt(n));
                    esVictoria = golesLocal > golesVisitante;
                    esEmpate = golesLocal === golesVisitante;
                }
                // Definir clases de color para fondo y borde
                let bgColor = 'bg-red-100';
                let borderColor = 'border-red-300';
                let textoResultado = 'Derrota';
                if (esVictoria) {
                    bgColor = 'bg-green-100';
                    borderColor = 'border-green-300';
                    textoResultado = 'Victoria';
                } else if (esEmpate) {
                    bgColor = 'bg-yellow-100';
                    borderColor = 'border-yellow-300';
                    textoResultado = 'Empate';
                }
                matchPerformancesHTML += `
                    <div class="match-performance-card ${bgColor} rounded-lg p-6 shadow-lg border-2 ${borderColor} transition mb-4">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                            <div class="flex-1">
                                <div class="flex items-center space-x-4 mb-2">
                                    <h4 class="font-bold text-lg text-gray-800">vs ${partido.rival}</h4>
                                    <span class="px-3 py-1 text-xs font-semibold rounded-full ${bgColor.replace('bg-', 'bg-').replace('-100', '-200')}">${textoResultado}</span>
                                </div>
                                <p class="text-gray-600 text-sm">${partido.fecha} • Resultado: ${resultado || 'N/A'}</p>
                            </div>
                            <div class="flex space-x-6 text-center">
                                <div>
                                    <div class="text-2xl font-bold text-green-600 dark:text-green-400">${partido.goles}</div>
                                    <div class="text-xs text-gray-800 dark:text-gray-800">Goles</div>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">${partido.asistencias}</div>
                                    <div class="text-xs text-gray-800 dark:text-gray-800">Asistencias</div>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">${partido.goles + partido.asistencias}</div>
                                    <div class="text-xs text-gray-800 dark:text-gray-800">Total</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            document.getElementById('match-performances').innerHTML = matchPerformancesHTML;
            // Scroll suave a la sección detalles
            const offset = 50;
            const topPosition = detalles.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });
        };
        // Función para volver al equipo
        window.backToTeam = function() {
            document.getElementById('player-details-section').classList.add('hidden');
            document.getElementById('equipo').classList.remove('hidden');
            document.getElementById('partidos').classList.remove('hidden');
            document.getElementById('rivales').classList.remove('hidden');
            document.getElementById('historia').classList.remove('hidden');
            document.getElementById('inicio').classList.remove('hidden');
            window.history.pushState({section: 'equipo'}, '', '#equipo');
            const equipoSection = document.getElementById('equipo');
            const offset = 80; // Ajusta según el tamaño del navbar fijo
            const topPosition = equipoSection.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });
        }
        // Manejar navegación del navegador
        window.addEventListener('popstate', function(event) {
            if (event.state) {
                if (event.state.section === 'player-details' && event.state.playerId) {
                    showPlayerDetails(event.state.playerId);
                } else if (event.state.section === 'equipo') {
                    backToTeam();
                } else if (event.state.section === 'match-details' && event.state.partidoId) {
                    showMatchDetails(event.state.partidoId);
                } else if (event.state.section === 'partidos') {
                    backToMatches();
                } else if (event.state.section === 'rival-details' && event.state.rival) {
                    showRivalDetails(event.state.rival);
                } else if (event.state.section === 'rivales') {
                    // Ocultar detalles y mostrar lista de rivales
                    document.getElementById('rival-details').classList.add('hidden');
                    document.getElementById('rivales-container').classList.remove('hidden');
                    // Ocultar otras secciones
                    ['inicio', 'historia', 'equipo', 'partidos', 'stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.classList.add('hidden');
                    });
                    // Mostrar sección rivales
                    document.getElementById('rivales').classList.remove('hidden');
                    renderRivales();
                    // Scroll a rivales
                    const offset = 80;
                    const el = document.getElementById('rivales');
                    if (el) {
                        const topPosition = el.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top: topPosition, behavior: 'smooth' });
                    }
                }
            } else {
                // Estado inicial o sin estado, mostrar inicio o lo que corresponda
                document.getElementById('inicio').classList.remove('hidden');
                document.getElementById('historia').classList.remove('hidden');
                document.getElementById('equipo').classList.remove('hidden');
                document.getElementById('partidos').classList.remove('hidden');
                document.getElementById('stats-section').classList.add('hidden');
                document.getElementById('player-details-section').classList.add('hidden');
                document.getElementById('match-details-section').classList.add('hidden');
            }
        });
        // NUEVO: Función para obtener rivales únicos y sus stats
        function getRivalesStats() {
            const rivalesStats = {};
            Object.values(partidosData).forEach(partido => {
                const rival = partido.rival;
                if (!rivalesStats[rival]) {
                    rivalesStats[rival] = {
                        partidos: 0,
                        victorias: 0,
                        empates: 0,
                        derrotas: 0,
                        golesFavor: 0,
                        golesContra: 0,
                        matches: [] // Array de partidos contra este rival (incluye jugadores)
                    };
                }
                const [gf, gc] = partido.resultado.split('-').map(Number);
                rivalesStats[rival].partidos++;
                rivalesStats[rival].golesFavor += gf;
                rivalesStats[rival].golesContra += gc;
                rivalesStats[rival].matches.push(partido); // Mantiene el objeto completo con 'jugadores'
                if (gf > gc) rivalesStats[rival].victorias++;
                else if (gf === gc) rivalesStats[rival].empates++;
                else rivalesStats[rival].derrotas++;
            });
            // Ordenar por partidos jugados (descendente)
            return Object.entries(rivalesStats)
                .sort(([,a], [,b]) => b.partidos - a.partidos)
                .map(([rival, stats]) => ({ rival, ...stats, porcentajeVictorias: Math.round((stats.victorias / stats.partidos) * 100) }));
        }
        // NUEVO: Función para renderizar tarjetas de rivales
        window.renderRivales = function() {
            const rivales = getRivalesStats();
            const container = document.getElementById('rivales-container');
            if (!container) return;
            container.innerHTML = '';
            rivales.forEach((rivalData) => {
                const escudoRival = getEscudoRival(rivalData.rival);
                const cardHTML = `
                    <div class="rival-card" onclick="showRivalDetails('${rivalData.rival}')">
                        <img src="${escudoRival}" alt="Escudo ${rivalData.rival}" class="mx-auto h-16 w-16 object-contain mb-4">
                        <h3 class="rival-name text-center">${rivalData.rival}</h3>
                        <div class="rival-stats">
                            <div class="rival-stat">
                                <strong>${rivalData.partidos}</strong>
                                Partidos
                            </div>
                            <div class="rival-stat">
                                <strong>${rivalData.victorias}</strong>
                                G
                            </div>
                            <div class="rival-stat">
                                <strong>${rivalData.empates}</strong>
                                E
                            </div>
                            <div class="rival-stat">
                                <strong>${rivalData.derrotas}</strong>
                                P
                            </div>
                            <div class="rival-stat">
                                <strong>${rivalData.golesFavor} - ${rivalData.golesContra}</strong>
                                GF - GC
                            </div>
                            <div class="rival-stat">
                                <strong>${rivalData.porcentajeVictorias}%</strong>
                                Victorias
                            </div>
                        </div>
                        <button onclick="showRivalDetails('${rivalData.rival}')" class="w-full bg-gray-100 hover:bg-red-100 text-red-800 py-2 rounded-full transition mt-4">
                            Ver detalles
                        </button>
                    </div>
                `;
                container.innerHTML += cardHTML;
            });
        };
        // NUEVO: Función para mostrar detalles de un rival (incluye jugadores por partido)
        window.showRivalDetails = function(rivalName) {
            const rivales = getRivalesStats();
            const rivalData = rivales.find(r => r.rival === rivalName);
            if (!rivalData) return;
            // NUEVO: Ocultar todas las secciones principales excepto rivales
            ['inicio', 'historia', 'equipo', 'partidos', 'stats-section', 'player-details-section', 'match-details-section'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.add('hidden');
            });
            // Mostrar solo la sección rivales (que incluye navbar y footer siempre visibles)
            document.getElementById('rivales').classList.remove('hidden');
            // Ocultar contenedor principal y mostrar detalles
            document.getElementById('rivales-container').classList.add('hidden');
            document.getElementById('rival-details').classList.remove('hidden');
            // Header con stats generales
            const escudoRival = getEscudoRival(rivalName);
            document.getElementById('rival-header').innerHTML = `
                <div class="flex items-center justify-between mb-6">
                    <div class="text-center">
                        <img src="https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/Tomates_FC__13_-removebg-preview%20(1).png" alt="Tomates FC" class="h-16 w-16 mx-auto mb-2">
                        <p class="font-bold">Tomates FC</p>
                    </div>
                    <div class="text-center">
                        <h2 class="text-2xl font-bold text-red-800 mb-2">${rivalName}</h2>
                        <p class="text-gray-600">Partidos: ${rivalData.partidos} | G: ${rivalData.victorias} E: ${rivalData.empates} P: ${rivalData.derrotas} | GF: ${rivalData.golesFavor} - ${rivalData.golesContra}</p>
                    </div>
                    <div class="text-center">
                        <img src="${escudoRival}" alt="${rivalName}" class="h-16 w-16 mx-auto mb-2">
                        <p class="font-bold">${rivalName}</p>
                    </div>
                </div>
            `;
            // Renderizar partidos contra este rival, INCLUYENDO JUGADORES
            const matchesContainer = document.getElementById('rival-matches-container');
            matchesContainer.innerHTML = '';
            rivalData.matches.forEach(partido => {
                const [gf, gc] = partido.resultado.split('-');
                let resultadoClass = 'derrota', resultadoText = 'Derrota';
                if (parseInt(gf) > parseInt(gc)) { 
                    resultadoClass = 'victoria'; 
                    resultadoText = 'Victoria'; 
                } else if (parseInt(gf) === parseInt(gc)) { 
                    resultadoClass = 'empate'; 
                    resultadoText = 'Empate'; 
                }
                // Generar HTML para jugadores de este partido
                let jugadoresHTML = '';
                if (partido.jugadores && partido.jugadores.length > 0) {
                    jugadoresHTML = `
                        <div class="rival-players-container">
                            ${partido.jugadores.map(jugador => `
                                <div class="rival-player-card">
                                    <div class="rival-player-name">${jugador.nombre}</div>
                                    <div>⚽ <span class="rival-player-goles">${jugador.goles}</span> Goles</div>
                                    <div>🎯 <span class="rival-player-asist">${jugador.asistencias}</span> Asist.</div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                } else {
                    jugadoresHTML = '<p class="text-gray-500 text-sm italic mt-2">No hay datos de jugadores disponibles para este partido.</p>';
                }
                const matchHTML = `
                    <div class="rival-match-card">
                        <div class="rival-match-header">
                            <p class="text-sm text-gray-600 flex-1">${partido.fecha} • ${partido.lugar} • ${partido.hora}</p>
                            <p class="text-sm text-gray-500 flex-1 text-right">${partido.tipo}</p>
                        </div>
                        <div class="rival-match-result ${resultadoClass}">${partido.resultado} (${resultadoText})</div>
                        ${jugadoresHTML}
                    </div>
                `;
                matchesContainer.innerHTML += matchHTML;
            });
            // Scroll suave
            const detailsSection = document.getElementById('rival-details');
            const offset = 80;
            const topPosition = detailsSection.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: topPosition, behavior: 'smooth' });
            // Actualizar URL
            window.history.pushState({ section: 'rival-details', rival: rivalName }, '', `#rivales/${rivalName}`);
        };
        // NUEVO: Función para volver a la lista de rivales
        window.backToRivales = function() {
            // Ocultar todas las secciones de detalles
            document.getElementById('rival-details').classList.add('hidden');
            document.getElementById('stats-section').classList.add('hidden');
            document.getElementById('player-details-section').classList.add('hidden');
            document.getElementById('match-details-section').classList.add('hidden');
            document.getElementById('inicio').classList.remove('hidden');
            document.getElementById('historia').classList.remove('hidden');
            document.getElementById('equipo').classList.remove('hidden');
            document.getElementById('partidos').classList.remove('hidden');
            document.getElementById('rivales').classList.remove('hidden');
            document.getElementById('rivales-container').classList.remove('hidden');
            // Renderizar contenido dinámico para las secciones si es necesario
            renderRivales();  // Actualiza la lista de rivales
            renderMatches('todos');  // Actualiza los partidos para que se muestren correctamente
            window.history.pushState({ section: 'rivales' }, '', '#rivales');
            // Hacer scroll suave al título de rivales con offset para el navbar
            const tituloRivales = document.querySelector('#rivales h2');  // Selecciona el h2 "RENDIMIENTO CONTRA RIVALES"
            if (tituloRivales) {
                const offset = 80;  // Ajusta este valor si el navbar es más alto o bajo (por ejemplo, mide su altura en píxeles)
                const elementPosition = tituloRivales.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        };
        // NUEVO: Función helper para escudo (reusa o agrega si no la tienes)
        function getEscudoRival(rival) {
            const escudos = {
                'Vaqueros': 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png',
                'Real Justicia': 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__3___1_-removebg-preview.png',
                'Equipo Maradona': 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__4_-removebg-preview.png',
                'Manchester ICI': 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__2_-removebg-preview.png',
                'Resistencia IC': 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/main/500x500__1_-removebg-preview%20(1).png',
                'default': 'https://raw.githubusercontent.com/TomatesConManjar/TomatesFC/refs/heads/main/500x500__4_-removebg-preview.png'
            };
            return escudos[rival] || escudos['default'];
        }
    </script>
