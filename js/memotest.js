// =========================================================
// Juegos — "Memotest"
// Se carga en juegos/memotest.html y reutiliza HEROINES /
// OPTION_ORDER / shuffle() declarados en js/juegos.js, que debe
// cargarse antes que este archivo en el HTML.
// =========================================================

const MEMOTEST_MODES = {
  names: {
    label: 'Imagen y nombre',
    buildPairs() {
      return OPTION_ORDER.map((heroineId) => ({
        pairId: heroineId,
        cardA: { kind: 'portrait', heroineId },
        cardB: { kind: 'label', text: HEROINES[heroineId].name },
      }));
    },
  },
  places: {
    label: 'Heroína y lugar',
    buildPairs() {
      const places = {
        'manuela-saenz': 'Quito',
        'juana-azurduy': 'Chuquisaca, Alto Perú',
        'mariquita-sanchez': 'Buenos Aires',
        'macacha-guemes': 'Salta',
        'maria-remedios-del-valle': 'Buenos Aires',
        'policarpa-salavarrieta': 'Guaduas',
      };
      return OPTION_ORDER.map((heroineId) => ({
        pairId: heroineId,
        cardA: { kind: 'identity', heroineId },
        cardB: { kind: 'fact', text: places[heroineId] },
      }));
    },
  },
  contributions: {
    label: 'Heroína y aporte',
    buildPairs() {
      const contributions = {
        'manuela-saenz': 'Salvó la vida de Simón Bolívar.',
        'juana-azurduy': 'Lideró tropas patriotas en el Alto Perú.',
        'mariquita-sanchez': 'Su casa reunió a importantes patriotas.',
        'macacha-guemes': 'Organizó redes políticas y de información en Salta.',
        'maria-remedios-del-valle': 'Fue reconocida como "La Madre de la Patria".',
        'policarpa-salavarrieta': 'Realizó tareas de espionaje para la causa independentista.',
      };
      return OPTION_ORDER.map((heroineId) => ({
        pairId: heroineId,
        cardA: { kind: 'identity', heroineId },
        cardB: { kind: 'fact', text: contributions[heroineId] },
      }));
    },
  },
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('memo') && typeof HEROINES !== 'undefined' && typeof OPTION_ORDER !== 'undefined') {
    initMemotest();
  }
});

function initMemotest() {
  const els = {
    intro: document.getElementById('memoIntro'),
    modeButtons: Array.from(document.querySelectorAll('.mode-card')),
    startBtn: document.getElementById('memoStartBtn'),
    game: document.getElementById('memoGame'),
    modeLabel: document.getElementById('memoModeLabel'),
    pairsFound: document.getElementById('memoPairsFound'),
    moves: document.getElementById('memoMoves'),
    timer: document.getElementById('memoTimer'),
    board: document.getElementById('memoBoard'),
    backToModesBtn: document.getElementById('memoBackToModesBtn'),
    results: document.getElementById('memoResults'),
    resultMode: document.getElementById('memoResultMode'),
    resultMoves: document.getElementById('memoResultMoves'),
    resultTime: document.getElementById('memoResultTime'),
    resultMessage: document.getElementById('memoResultMessage'),
    replayBtn: document.getElementById('memoReplayBtn'),
    changeModeBtn: document.getElementById('memoChangeModeBtn'),
    announcer: document.getElementById('memoAnnouncer'),
  };

  const TOTAL_PAIRS = 6;
  const FLIP_BACK_DELAY = 900;
  const MATCH_SETTLE_DELAY = 550;

  let selectedMode = null;
  let cards = [];
  let flipped = [];
  let isBusy = false;
  let pairsFound = 0;
  let moves = 0;
  let elapsedSeconds = 0;
  let timerHandle = null;
  let timerStarted = false;
  let gameStatePushed = false;

  els.modeButtons.forEach((button) => {
    button.addEventListener('click', () => selectMode(button));
  });

  els.startBtn.addEventListener('click', () => {
    if (!selectedMode) return;
    els.intro.hidden = true;
    els.results.hidden = true;
    els.game.hidden = false;
    enterGameHistory();
    startGame();
  });

  els.replayBtn.addEventListener('click', () => {
    els.results.hidden = true;
    els.game.hidden = false;
    startGame();
  });

  els.changeModeBtn.addEventListener('click', () => {
    goToModeSelection();
  });

  els.backToModesBtn.addEventListener('click', () => {
    goToModeSelection();
  });

  // Al entrar a una partida se agrega una entrada propia al historial,
  // de modo que el botón/gesto "Atrás" nativo del navegador lleve primero
  // a la selección de modalidad y no directamente a la página de Juegos.
  function enterGameHistory() {
    if (!gameStatePushed) {
      history.pushState({ memoScreen: 'playing' }, '', location.href);
      gameStatePushed = true;
    }
  }

  // Navegación explícita hacia la selección de modalidad. Si hay una
  // entrada de historial propia (empujada al comenzar la partida), se
  // retira con history.back() en vez de togglear la pantalla a mano,
  // para no dejar una entrada "fantasma" que obligue a presionar Atrás
  // dos veces; el listener de popstate hace la sincronización real de
  // la pantalla en ambos casos (botón propio o Atrás del navegador).
  function goToModeSelection() {
    if (gameStatePushed) {
      history.back();
    } else {
      resetToModeSelection();
    }
  }

  function resetToModeSelection() {
    stopTimer();
    els.results.hidden = true;
    els.game.hidden = true;
    els.intro.hidden = false;
    deselectAllModes();
    selectedMode = null;
    els.startBtn.disabled = true;
  }

  window.addEventListener('popstate', () => {
    gameStatePushed = false;
    resetToModeSelection();
  });

  function selectMode(button) {
    deselectAllModes();
    button.classList.add('is-selected');
    button.setAttribute('aria-pressed', 'true');
    selectedMode = button.dataset.mode;
    els.startBtn.disabled = false;
  }

  function deselectAllModes() {
    els.modeButtons.forEach((button) => {
      button.classList.remove('is-selected');
      button.setAttribute('aria-pressed', 'false');
    });
  }

  function startGame() {
    const mode = MEMOTEST_MODES[selectedMode];

    pairsFound = 0;
    moves = 0;
    elapsedSeconds = 0;
    timerStarted = false;
    flipped = [];
    isBusy = false;
    stopTimer();

    els.modeLabel.textContent = mode.label;
    els.pairsFound.textContent = '0';
    els.moves.textContent = '0';
    els.timer.textContent = '00:00';

    const pairs = mode.buildPairs();
    const rawCards = [];
    pairs.forEach((pair) => {
      rawCards.push({ pairId: pair.pairId, ...pair.cardA });
      rawCards.push({ pairId: pair.pairId, ...pair.cardB });
    });
    cards = shuffle(rawCards);

    els.board.classList.remove('is-revealed');
    els.board.classList.toggle('memo-board--long-text', selectedMode !== 'names');
    els.board.innerHTML = '';

    cards.forEach((card, index) => {
      const cardEl = buildCardElement(card, index);
      cardEl.style.transitionDelay = `${index * 35}ms`;
      els.board.appendChild(cardEl);
      card.el = cardEl;
      card.button = cardEl.querySelector('.memo-card__btn');
    });

    // Fuerza un reflow para que la aparición escalonada se dispare en
    // cada partida, incluida la primera.
    void els.board.offsetWidth;
    els.board.classList.add('is-revealed');
  }

  function buildCardElement(card, index) {
    const wrapper = document.createElement('div');
    wrapper.className = 'memo-card';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'memo-card__btn';
    button.setAttribute('aria-label', `Carta oculta, ${index + 1} de ${cards.length}. Presioná para revelarla.`);

    const inner = document.createElement('span');
    inner.className = 'memo-card__inner';

    const back = document.createElement('span');
    back.className = 'memo-card__face memo-card__face--back';
    back.setAttribute('aria-hidden', 'true');
    const backMark = document.createElement('span');
    backMark.className = 'memo-card__back-mark';
    backMark.textContent = 'H';
    const backAccent = document.createElement('span');
    backAccent.className = 'memo-card__back-accent';
    backAccent.textContent = '✦';
    back.append(backMark, backAccent);

    const front = document.createElement('span');
    front.className = 'memo-card__face memo-card__face--front';
    front.appendChild(buildCardContent(card));

    inner.append(back, front);
    button.appendChild(inner);
    wrapper.appendChild(button);

    button.addEventListener('click', () => handleCardClick(card));

    return wrapper;
  }

  function buildCardContent(card) {
    const content = document.createElement('span');

    if (card.kind === 'portrait') {
      content.className = 'memo-card__content memo-card__content--portrait';
      const img = document.createElement('img');
      img.src = HEROINES[card.heroineId].img;
      img.alt = HEROINES[card.heroineId].name;
      img.loading = 'lazy';
      content.appendChild(img);
    } else if (card.kind === 'identity') {
      content.className = 'memo-card__content memo-card__content--identity';
      const img = document.createElement('img');
      img.src = HEROINES[card.heroineId].img;
      img.alt = '';
      img.loading = 'lazy';
      const name = document.createElement('span');
      name.className = 'memo-card__name';
      name.textContent = HEROINES[card.heroineId].name;
      content.append(img, name);
    } else {
      content.className = 'memo-card__content memo-card__content--text';
      const text = document.createElement('span');
      text.className = card.kind === 'label' ? 'memo-card__label' : 'memo-card__fact';
      text.textContent = card.text;
      content.appendChild(text);
    }

    return content;
  }

  function describeCard(card) {
    if (card.kind === 'portrait') return `Retrato de ${HEROINES[card.heroineId].name}`;
    if (card.kind === 'identity') return HEROINES[card.heroineId].name;
    if (card.kind === 'label') return `Nombre: ${card.text}`;
    return `Dato: ${card.text}`;
  }

  function handleCardClick(card) {
    if (isBusy || card.matched || card.el.classList.contains('is-flipped')) return;

    if (!timerStarted) {
      timerStarted = true;
      startTimer();
    }

    flipCard(card);
    flipped.push(card);

    if (flipped.length === 2) {
      isBusy = true;
      moves += 1;
      els.moves.textContent = String(moves);
      window.setTimeout(resolveComparison, MATCH_SETTLE_DELAY);
    }
  }

  function flipCard(card) {
    card.el.classList.add('is-flipped');
    card.button.setAttribute('aria-label', describeCard(card));
  }

  function unflipCard(card) {
    card.el.classList.remove('is-flipped', 'is-wrong-flash');
    card.button.setAttribute('aria-label', 'Carta oculta. Presioná para revelarla.');
  }

  function resolveComparison() {
    const [first, second] = flipped;
    if (!first || !second) return;

    const isMatch = first.pairId === second.pairId;

    if (isMatch) {
      [first, second].forEach((card) => {
        card.matched = true;
        card.el.classList.add('is-matched');
        card.button.disabled = true;
        card.button.setAttribute('aria-label', `${describeCard(card)}. Pareja encontrada.`);
      });
      pairsFound += 1;
      els.pairsFound.textContent = String(pairsFound);
      announce('Correcto. Pareja encontrada.');
      flipped = [];
      isBusy = false;

      if (pairsFound === TOTAL_PAIRS) {
        window.setTimeout(finishGame, 500);
      }
    } else {
      [first, second].forEach((card) => card.el.classList.add('is-wrong-flash'));
      announce('Incorrecto. Intentá de nuevo.');
      window.setTimeout(() => {
        [first, second].forEach((card) => unflipCard(card));
        flipped = [];
        isBusy = false;
      }, FLIP_BACK_DELAY);
    }
  }

  function startTimer() {
    stopTimer();
    timerHandle = window.setInterval(() => {
      elapsedSeconds += 1;
      els.timer.textContent = formatTime(elapsedSeconds);
    }, 1000);
  }

  function stopTimer() {
    if (timerHandle) {
      window.clearInterval(timerHandle);
      timerHandle = null;
    }
  }

  function finishGame() {
    stopTimer();
    els.game.hidden = true;
    els.results.hidden = false;

    els.resultMode.textContent = MEMOTEST_MODES[selectedMode].label;
    els.resultMoves.textContent = String(moves);
    els.resultTime.textContent = formatTime(elapsedSeconds);

    let message;
    if (moves <= 10) {
      message = '¡Excelente memoria!';
    } else if (moves <= 16) {
      message = 'Muy buen trabajo.';
    } else {
      message = '¡Lo lograste! Podés volver a intentarlo para mejorar tu resultado.';
    }
    els.resultMessage.textContent = message;

    announce(`¡Completaste el Memotest! Movimientos: ${moves}. Tiempo: ${formatTime(elapsedSeconds)}.`);
    els.results.focus();
  }

  function announce(message) {
    if (!els.announcer) return;
    els.announcer.textContent = '';
    window.requestAnimationFrame(() => {
      els.announcer.textContent = message;
    });
  }
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}
