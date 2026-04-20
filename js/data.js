// ============================================================
// DATA - Datos de partidos y jugadores de Tomates FC
// ============================================================

// Datos de los 27 partidos con resultados y rendimiento de jugadores
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

// Datos de los 8 jugadores con estadísticas individuales por partido
const jugadoresData = {
    'agustin-vilhelm': {
        nombre: 'Agustin Vilhelm',
        numero: 1,
        posicion: 'Arquero',
        frase: 'Si la pelota me llega a las manos, el partido es nuestro',
        imagenCamiseta: 'images/dorsal_vilhelm1.png',
        partidos: [
        ]
    },
    'leandro-zavala': {
        nombre: 'Leandro Zavala',
        numero: 5,
        posicion: 'Defensa',
        frase: 'La defensa es el pilar de todo gran equipo',
        imagenCamiseta: 'images/dorsal_zavala5.png',
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
        imagenCamiseta: 'images/dorsal_lizama6.png',
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
        imagenCamiseta: 'images/dorsal_garces7.png',
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
        imagenCamiseta: 'images/dorsal_kryzpo8.png',
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
        imagenCamiseta: 'images/dorsal_paredes9.png',
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
        imagenCamiseta: 'images/dorsal_manque10.png',
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
        imagenCamiseta: 'images/dorsal_saso11.png',
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
        imagenCamiseta: 'images/dorsal_bustamante14.png',
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
