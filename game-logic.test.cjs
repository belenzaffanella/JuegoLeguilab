const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'questions.js'), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(path.join(root, 'game-logic.js'), 'utf8'), context);
const data = context.window.LEGUILAB_DATA;
const logic = context.window.LEGUILAB_LOGIC;

test('cada producto tiene cinco preguntas claras y opciones válidas', () => {
  for (const p of data.products) {
    assert.equal(data.questions[p.id].length, 5);
    for (const q of data.questions[p.id]) {
      assert.ok(q.options.length >= 3 && q.options.length <= 4, q.id);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, q.id);
      assert.ok(q.refs.length > 0, q.id);
    }
  }
});

test('una ronda contiene preguntas de un solo producto, sin repetir', () => {
  for (const product of data.products) {
    const round = logic.createRound(data, product.id, 'Participante', () => 0.4);
    assert.equal(round.deck.length, 5);
    assert.equal(round.product.id, product.id);
    assert.equal(round.deck[0].id, `${product.id[0]}1`, 'la primera pregunta debe empezar con un beneficio o mecanismo');
    assert.ok(round.deck.every(q => q.id.startsWith(product.id[0])));
    assert.equal(new Set(round.deck.map(q => q.id)).size, 5);
    assert.equal(round.score, 0);
    assert.equal(round.answered, false);
  }
});

test('cada pregunta acepta una sola respuesta y puntúa 100 por acierto', () => {
  const round = logic.createRound(data, 'proflora', 'Ana', () => 0.2);
  assert.equal(logic.submit(round, true, data), true);
  assert.equal(logic.submit(round, true, data), false);
  assert.equal(round.score, 100);
  assert.equal(round.correct, 1);
  assert.equal(logic.next(round), true);
  assert.equal(round.answered, false);
  assert.equal(logic.submit(round, false, data), true);
  assert.equal(round.score, 100);
});

test('el premio requiere 400 puntos y se comprueba al acabar las cinco preguntas', () => {
  const round = logic.createRound(data, 'butismart', 'Leo', () => 0.3);
  for (let i = 0; i < 5; i++) {
    assert.equal(logic.submit(round, i < 4, data), true);
    if (i < 4) assert.equal(logic.next(round), true);
  }
  assert.equal(round.score, 400);
  assert.equal(logic.wonPrize(round, data), true);
  const short = logic.createRound(data, 'curcuma', 'Sol', () => 0.6);
  for (let i = 0; i < 5; i++) {
    logic.submit(short, i < 3, data);
    if (i < 4) logic.next(short);
  }
  assert.equal(short.score, 300);
  assert.equal(logic.wonPrize(short, data), false);
});

test('nueva ronda comienza sin puntaje, aciertos ni respuestas anteriores', () => {
  const oldRound = logic.createRound(data, 'proflora', 'Ana');
  logic.submit(oldRound, true, data);
  const nextRound = logic.createRound(data, 'proflora', 'Beto');
  assert.equal(nextRound.playerName, 'Beto');
  assert.equal(nextRound.score, 0);
  assert.equal(nextRound.correct, 0);
  assert.equal(nextRound.responses.length, 0);
  assert.equal(nextRound.answered, false);
});

test('las rutas locales existen y los selectores de app.js coinciden con IDs únicos', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'IDs duplicados');
  const htmlIds = new Set(ids);
  for (const [, id] of app.matchAll(/\$\('#([A-Za-z][\w-]*)'\)/g)) assert.ok(htmlIds.has(id), `selector #${id} sin nodo`);
  const files = ['assets/leguilab-logo.png', ...data.products.map(p => p.image), 'styles.css', 'styles-extra.css', 'questions.js', 'game-logic.js', 'scene.js'];
  for (const file of files) assert.ok(fs.existsSync(path.join(root, file)), file);
});

test('flujo completo con interfaz simulada: empezar, escribir nombre, jugar un producto y mostrar premio', () => {
  class FakeClassList {
    constructor(initial = '') { this.values = new Set(initial.split(/\s+/).filter(Boolean)); }
    add(value) { this.values.add(value); }
    remove(value) { this.values.delete(value); }
    contains(value) { return this.values.has(value); }
    toggle(value, force) { const next = force === undefined ? !this.contains(value) : force; next ? this.add(value) : this.remove(value); return next; }
  }
  class FakeNode {
    constructor(id = '', className = '') { this.id = id; this.className = className; this.classList = new FakeClassList(className); this.children = []; this.dataset = {}; this.style = {}; this.hidden = false; this.value = ''; this.textContent = ''; this.listeners = {}; }
    addEventListener(name, fn) { (this.listeners[name] ??= []).push(fn); }
    click() { for (const fn of this.listeners.click || []) fn({currentTarget:this,preventDefault(){}}); }
    append(...nodes) { this.children.push(...nodes); }
    replaceChildren(...nodes) { this.children = nodes; }
    querySelectorAll(selector) { return selector === 'button' ? this.children.filter(n => n.tagName === 'button') : []; }
    setAttribute(name, value) { this[name] = value; }
    getAttribute(name) { return this[name]; }
    setCustomValidity(value) { this.validation = value; }
    reportValidity() {}
    focus() {}
  }
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const nodes = new Map(Array.from(html.matchAll(/\bid="([^"]+)"/g), m => [m[1], new FakeNode(m[1]) ]));
  for (const id of ['home','nameScreen','chooseScreen','game','results']) nodes.get(id).classList.add('screen');
  const screens = ['home','nameScreen','chooseScreen','game','results'].map(id => nodes.get(id));
  const document = {
    body: new FakeNode('body'),
    querySelector(selector) { return selector.startsWith('#') ? nodes.get(selector.slice(1)) : null; },
    querySelectorAll(selector) { return selector === '.screen' ? screens : []; },
    createElement(tag) { const node = new FakeNode(); node.tagName = tag; return node; },
    addEventListener() {}
  };
  const window = {LEGUILAB_DATA:data, LEGUILAB_LOGIC:logic, LeguiScene:{init(){},draw(){}}};
  const vmContext = {window, document, performance:{now:()=>1000}, requestAnimationFrame:()=>1, cancelAnimationFrame(){}, setTimeout(){}, console};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'app.js'), 'utf8'), vmContext);
  nodes.get('startBtn').click();
  nodes.get('playerName').value = 'Mora';
  nodes.get('chooseProductBtn').click();
  assert.ok(nodes.get('chooseScreen').classList.contains('active'));
  const chosenId = 'proflora';
  nodes.get('chooseProducts').children.find(n => n.getAttribute?.('aria-label') === 'Elegir Proflora').click();
  assert.ok(nodes.get('game').classList.contains('active'));
  assert.equal(nodes.get('roundPlayer').textContent, 'Mora');
  for (let index = 0; index < 5; index++) {
    const q = data.questions[chosenId].find(item => item.q === nodes.get('questionText').textContent);
    const answerIndex = index < 4 ? q.answer : (q.answer + 1) % q.options.length;
    nodes.get('answers').children.find(button => Number(button.dataset.answer) === answerIndex).click();
    assert.equal(nodes.get('score').textContent, String(Math.min(index + 1, 4) * 100));
    nodes.get('nextBtn').click();
  }
  assert.ok(nodes.get('results').classList.contains('active'));
  assert.equal(nodes.get('resultTitle').textContent, '¡LO LOGRASTE!');
  assert.equal(nodes.get('finalScore').textContent, '400');
  assert.equal(nodes.get('winnerName').textContent, 'Mora');
});
