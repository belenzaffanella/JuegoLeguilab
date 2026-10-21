# Bitácora de experiencia — LeguiLab: Desafío Microbiota

Registro cronológico del trabajo realizado en el proyecto. Las fechas se basan
en el historial de Git y en la fecha de la conversación. Cuando no hay una
marca de tiempo verificable para una etapa, se indica **fecha por confirmar**
en lugar de asignarle una fecha estimada.

## Etapas iniciales — fecha por confirmar

- Se planteó un juego arcade de microbiota para el stand de LeguiLab.
- El objetivo inicial era recolectar Proflora, ButiSmart y Cúrcuma + Vitamina
  D3 en 40 segundos, con tres vidas, poderes, obstáculos y bacterias aliadas.
- Se conservaron como requisitos el escenario intestinal, el logo y las fotos
  reales de los productos.
- Se pidieron movimiento con mouse/táctil, dificultad progresiva, colisiones
  justas, resultados y récord local.
- En la revisión se reportó un problema de control: **el jugador no se movía**.
  La fecha exacta de esa prueba no está registrada en Git.

## Reformulación a trivia para el stand — fecha por confirmar

- El alcance cambió de arcade a una trivia breve para evitar una experiencia
  repetitiva o demasiado larga.
- Se decidió que cada visitante eligiera **un solo producto** y contestara
  cinco preguntas, en vez de jugar una trivia separada por cada producto.
- Se descartaron casos integradores, pistas y preguntas centradas en memorizar
  la ficha técnica.
- Se pidió un tono simple y cercano, enfocado en beneficios comunicados y
  mecanismos generales, sin tecnicismos innecesarios.
- Se reemplazó el texto de elección por **“A ver cuánto sabés: elegí el
  producto de tu trivia”**.
- La primera pregunta de cada producto se orientó a un beneficio o mecanismo,
  no a la ficha del producto.
- Las fechas exactas de estos intercambios no quedaron guardadas en el
  historial de commits.

## 20 de octubre de 2026 — primera versión guardada en GitHub

- Se guardó la trivia web estática con el commit `0ab4584` (`Add LeguiLab
  microbiota trivia game`).
- La experiencia quedó organizada en bienvenida, ingreso de nombre o apodo,
  selección de producto, cinco preguntas, feedback y resultado.
- Se estableció un puntaje de 100 por acierto y un umbral configurable de 400
  puntos para el premio.
- Se incluyeron las tres trivias, explicaciones y referencias, además del logo,
  las imágenes oficiales, los estilos y el escenario Canvas conservado.

## 20 de octubre de 2026 — publicación en GitHub Pages

- Se creó la rama `gh-pages` y se agregó `.nojekyll` con el commit `bb3ffdb`
  (`Prepare site for GitHub Pages`).
- Se configuró GitHub Pages para servir la carpeta raíz de `gh-pages`.
- La URL pública quedó en <https://belenzaffanella.github.io/JuegoLeguilab/>.
- Se comprobó que la página respondiera correctamente y entregara el título del
  juego. Esta comprobación fue automatizada y no fue una auditoría visual
  completa en varios navegadores o dispositivos.

## 21 de octubre de 2026 — documentación del proyecto

- Se redactó `DOCUMENTACION.md` con el recorrido, las reglas, la arquitectura,
  las pruebas, las decisiones y los pendientes.
- Se amplió `SOURCES.md` con las referencias y los límites de las afirmaciones.
- Se añadió desde el README un enlace a la documentación general.
- Los cambios documentales quedaron guardados en GitHub en ambas ramas:
  `9c98d9c` en `gh-pages` y `8135310` en `master`.

## Situación registrada al iniciar esta bitácora — 21 de octubre de 2026

- La trivia se publica como sitio estático en GitHub Pages.
- Cada participante juega una ronda sobre un producto. El nombre solo vive en
  memoria durante la ronda; no se persiste ni se transmite.
- La configuración del premio es 400 de 500 puntos; debe confirmarse contra el
  premio que finalmente ofrezca el stand.
- Queda pendiente validar con LeguiLab las fichas y la mención discordante de
  vitamina B6 identificada en algunas páginas de producto. El detalle está en
  `SOURCES.md`.
- No está implementada una pantalla independiente sincronizada para el
  facilitador del stand.

## Cómo mantener la bitácora

Agregar cada hito al principio de la cronología, con fecha, cambio realizado,
motivo y, cuando corresponda, el commit que lo contiene. Si una fecha no se
puede comprobar, dejarla como **fecha por confirmar** hasta que haya una fuente
fiable.
