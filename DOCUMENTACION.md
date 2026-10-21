# Documentación del proyecto — LeguiLab: Desafío Microbiota

## 1. Resumen

Desafío Microbiota es una trivia web breve para usar en el stand de LeguiLab, en una computadora, tablet o pantalla táctil. Cada participante juega una ronda sobre **un solo producto**, responde cinco preguntas y ve su puntaje al final. El juego funciona como material educativo y una dinámica de participación; no da recomendaciones clínicas ni diagnostica.

La experiencia está publicada en GitHub Pages:

- Sitio: <https://belenzaffanella.github.io/JuegoLeguilab/>
- Repositorio: <https://github.com/belenzaffanella/JuegoLeguilab>
- Rama publicada por GitHub Pages: `gh-pages`, carpeta raíz (`/`).
- Rama de desarrollo principal: `master`.

## 2. Cómo evolucionó la idea

El proyecto partió de un juego arcade sobre microbiota, con movimiento, obstáculos, vidas y recolección de productos. Durante la revisión se identificaron problemas de claridad y del control del jugador. La propuesta luego se orientó a una trivia más simple para el stand, porque repetir una trivia completa por cada producto podía hacer la experiencia larga.

Las decisiones de producto que quedaron reflejadas en la versión actual son:

- Cada visitante elige **un producto** y juega una sola ronda de cinco preguntas.
- La bienvenida invita a empezar; después se pide nombre o apodo y se elige el producto.
- El texto de elección es “A ver cuánto sabés: elegí el producto de tu trivia”.
- No hay casos integradores, pistas ni una primera pregunta dedicada a memorizar la ficha técnica.
- Las preguntas son introductorias y se enfocan en beneficios comunicados, mecanismos generales y cómo interpretar la evidencia con cuidado.
- Las tres opciones de producto son Proflora, ButiSmart y Cúrcuma + Vitamina D3.
- Se conservaron el logo, las fotografías oficiales y el escenario intestinal animado del proyecto anterior.

## 3. Recorrido del participante

1. En la bienvenida, lee que la ronda trata sobre un producto y dura cinco preguntas, y toca **TOCÁ PARA EMPEZAR**.
2. Escribe un nombre o apodo. El campo es obligatorio y admite hasta 24 caracteres.
3. Elige uno de los tres productos mediante su tarjeta con foto.
4. Responde las cinco preguntas. El orden de las preguntas 2 a 5 y el orden de las opciones se mezclan en cada ronda. La primera pregunta de cada producto queda fija para abrir con un concepto de beneficio o mecanismo.
5. Después de cada respuesta, ve si acertó, una explicación breve y, si quiere, la fuente.
6. Al terminar, ve los aciertos, el puntaje y si alcanzó el puntaje de premio definido por el stand. Puede jugar otra ronda o volver al inicio.

El nombre solo se mantiene en la memoria de la página durante la ronda. No se escribe en `localStorage`, no se envía a un servidor y no existe una base de datos de participantes.

## 4. Reglas y premio

- Cada ronda tiene cinco preguntas, todas sobre el producto elegido.
- Cada respuesta correcta suma 100 puntos; una respuesta incorrecta suma 0.
- Cada pregunta se puede responder una sola vez.
- El premio se habilita al completar las cinco preguntas con al menos 400 puntos (cuatro aciertos de cinco).
- El puntaje no sustituye completar la ronda: el resultado se determina al responder la última pregunta.
- El umbral y los puntos por acierto se pueden ajustar en `questions.js`, en `prizeThreshold` y `pointsPerCorrect`.

El premio efectivo debe coincidir con lo que defina el equipo del stand. La pantalla de resultado indica que el participante debe mostrarla al equipo para reclamarlo; la página no valida ni entrega premios automáticamente.

## 5. Contenido de la trivia

Hay cinco preguntas por producto, con cuatro opciones cada una y una única respuesta correcta.

| Producto | Temas de las preguntas |
| --- | --- |
| Proflora | Qué es la microbiota, participación general en digestión y defensas, por qué importa identificar cepas, qué comunica la ficha y por qué no se deben generalizar resultados entre probióticos. |
| ButiSmart | Butirato como fuente de energía para células del colon, producción por fermentación de fibra, barrera intestinal, descripción de la ficha y diferencia entre mecanismo y demostración clínica. |
| Cúrcuma + Vitamina D3 | Función general de la vitamina D3, curcuminoides, diferencia entre ingredientes, lectura prudente de beneficios posibles de cúrcuma y límites de inferencia. |

Las explicaciones separan tres cosas que no deben confundirse: la información que comunica una ficha comercial, la fisiología general y la evidencia clínica de un producto exacto. Las preguntas guardan identificadores de fuentes y el jugador puede abrir las referencias desde la pantalla.

Las fuentes, advertencias de composición y límites de las afirmaciones están detallados en [SOURCES.md](SOURCES.md). En particular, está pendiente confirmar con LeguiLab el texto promocional genérico que menciona vitamina B6 en algunas páginas, aunque las tablas de composición consultadas no la listan para esos productos.

## 6. Pantallas e interacción

- **Inicio:** presenta la trivia, el tiempo conceptual de ronda (cinco preguntas), el valor del acierto y el umbral del premio; muestra las fotos de producto.
- **Nombre:** permite escribir un nombre o apodo y volver.
- **Elección:** muestra las fotos oficiales y permite seleccionar un solo producto.
- **Trivia:** presenta número de pregunta, producto elegido, puntaje, opciones, feedback y acceso a fuentes.
- **Resultado:** muestra premio alcanzado o ronda completada, nombre, puntaje, respuestas correctas y foto del producto.
- **Modo pantalla de stand (`▣`):** amplía la presentación para una pantalla compartida o televisor.
- **Sonido (`♫`):** activa o silencia efectos sonoros generados por el navegador.

La interfaz se adapta a pantallas pequeñas y las opciones son botones táctiles. También se puede avanzar con Enter o Espacio cuando aparece el botón de continuar, y Escape vuelve al inicio. El proyecto no sincroniza una segunda pantalla de forma independiente; eso requeriría conexión local y una vista adicional.

## 7. Arquitectura y archivos

Es una aplicación estática en HTML, CSS y JavaScript sin framework, dependencias, backend ni pasos de compilación.

| Archivo | Responsabilidad |
| --- | --- |
| `index.html` | Estructura de bienvenida, nombre, selección, trivia, feedback, fuentes y resultado. |
| `styles.css` | Estilos principales, identidad visual, distribución y comportamiento adaptable. |
| `styles-extra.css` | Ajustes visuales complementarios y presentación para el stand. |
| `questions.js` | Productos, preguntas, opciones, explicaciones, referencias y configuración de puntaje/premio. |
| `game-logic.js` | Creación de una ronda, mezcla de orden, registro de una respuesta, avance y evaluación del premio. |
| `app.js` | Navegación entre pantallas, renderizado, eventos, sonido y conexión entre datos, interfaz y lógica. |
| `scene.js` | Canvas de fondo intestinal y microorganismos decorativos animados. No controla el resultado de la trivia. |
| `assets/` | Logo y envases fotográficos de los productos. |
| `game-logic.test.cjs` | Pruebas automatizadas de los datos, reglas, estructura y un recorrido simulado de interfaz. |
| `SOURCES.md` | Bibliografía, fuentes oficiales y límites educativos/editoriales. |
| `.nojekyll` | Evita el procesamiento de Jekyll en la publicación estática de Pages. |

## 8. Pruebas y validación

El repositorio incluye pruebas con el módulo de pruebas integrado de Node.js. Para ejecutarlas desde la carpeta del proyecto:

```powershell
node --test game-logic.test.cjs
```

La suite cubre:

- Cinco preguntas por producto, opciones válidas y referencias declaradas.
- Una ronda de un solo producto, con cinco preguntas sin repetición y una apertura fija de beneficio/mecanismo.
- Una sola respuesta por pregunta y suma de 100 puntos por acierto.
- Premio al completar la quinta pregunta con 400 puntos y ausencia de premio por debajo del umbral.
- Reinicio de puntaje, aciertos y respuestas al crear otra ronda.
- Existencia de recursos locales e IDs de interfaz no duplicados.
- Recorrido simulado: inicio, nombre, selección, respuestas y pantalla de premio.

La disponibilidad del sitio publicado se comprobó con respuesta HTTP 200 y el título “Desafío Microbiota — LeguiLab”. Esa comprobación confirma que Pages entrega el documento; no equivale a una revisión visual completa en distintos navegadores o dispositivos.

## 9. Publicación y mantenimiento

GitHub Pages sirve los archivos estáticos desde la carpeta raíz de `gh-pages`. Para actualizar el sitio:

1. Editar los archivos en la rama `master` y ejecutar la suite indicada arriba.
2. Incorporar los cambios a `gh-pages` y subir ambas ramas al remoto `origin`.
3. Esperar a que GitHub Pages publique la actualización; verificar la URL pública.

La web actual es estática: basta con publicar los cambios de HTML, CSS, JavaScript y assets. No hay compilación, secrets ni servicios externos en tiempo de ejecución.

## 10. Historial de publicación conocido

- `0ab4584` — `Add LeguiLab microbiota trivia game`: primera versión de la trivia y sus recursos.
- `bb3ffdb` — `Prepare site for GitHub Pages`: prepara la rama de publicación con `.nojekyll`.
- Sitio habilitado en Pages con `gh-pages` como fuente y estado de compilación `built` durante la publicación inicial.

## 11. Decisiones pendientes antes del uso en el stand

- Confirmar el premio real y mantener el umbral de 400 puntos acorde a sus condiciones.
- Validar las fichas y etiquetas vigentes con LeguiLab, incluida la mención discordante a vitamina B6.
- Revisar el copy final con las personas responsables de marca/regulatorio antes de presentarlo como material comercial.
- Si se requiere una pantalla separada para el facilitador, definir una solución de sincronización local; hoy cada página es una ronda individual.
