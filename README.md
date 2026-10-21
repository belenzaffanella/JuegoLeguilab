# LeguiLab — Desafío Microbiota

La historia del proyecto, las decisiones de diseño, las reglas completas, la
arquitectura técnica, las pruebas y la publicación están documentadas en
[DOCUMENTACION.md](DOCUMENTACION.md). Las referencias científicas y las
precauciones de contenido están en [SOURCES.md](SOURCES.md).
La evolución del trabajo ordenada por fecha está en [EXPERIENCIA.md](EXPERIENCIA.md).

Abrí `index.html` en un navegador moderno. No requiere instalación, servidor, conexión ni dependencias externas. En cada ronda el cliente ingresa un nombre o apodo, elige **un solo producto** y responde cinco preguntas. El nombre se conserva solo durante esa ronda, en memoria del navegador; no se guarda ni se envía.

Cada acierto vale 100 puntos. El umbral actual para ganar el premio es 400 puntos (4 de 5); se ajusta en `questions.js` (`prizeThreshold`). No se solicitan pistas ni hay casos integradores.

Para tablet, abrilo en pantalla completa y tocá las respuestas. Para mostrarlo en televisor, duplicá la pantalla del mismo equipo; `▣` activa texto ampliado. No hay sincronización independiente entre dispositivos: requeriría una conexión local y una vista adicional para la pantalla del stand.

## Archivos

- `index.html`: bienvenida, nombre, elección de producto, trivia y resultado.
- `styles.css` y `styles-extra.css`: identidad visual y adaptación a tablet / pantalla de stand.
- `questions.js`: cinco preguntas por producto y el puntaje que habilita el premio.
- `game-logic.js`: reglas de ronda, puntuación y control de respuestas duplicadas.
- `scene.js`: escenario intestinal Canvas y microorganismos conservados del juego anterior.
- `game-logic.test.cjs`: pruebas automatizadas de la lógica y los recursos locales.
- `SOURCES.md`: fuentes y límites de las afirmaciones.
- `assets/`: logo y fotografías reales de producto que ya pertenecían al proyecto.
