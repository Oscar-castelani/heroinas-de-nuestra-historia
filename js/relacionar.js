// =========================================================
// Juegos — "Relacionar" (segundo juego)
// Este script solo se ejecuta en juegos.html (comprueba la
// presencia de #match antes de inicializar nada) y reutiliza los
// datos HEROINES / OPTION_ORDER declarados en js/juegos.js, que
// debe cargarse antes que este archivo en el HTML.
// =========================================================

const MATCH_ROUNDS = [
  {
    title: 'Ronda 1 de 3 — Relacioná cada heroína con su lugar de nacimiento.',
    values: {
      'manuela-saenz': 'Quito',
      'juana-azurduy': 'Chuquisaca',
      'mariquita-sanchez': 'Buenos Aires',
      'maria-remedios-del-valle': 'Buenos Aires',
      'macacha-guemes': 'Salta',
      'policarpa-salavarrieta': 'Guaduas',
    },
  },
  {
    title: 'Ronda 2 de 3 — Relacioná cada heroína con su principal aporte a la independencia.',
    values: {
      'juana-azurduy': 'Lideró tropas patriotas.',
      'mariquita-sanchez': 'Organizó tertulias revolucionarias.',
      'maria-remedios-del-valle': 'Fue conocida como "La Madre de la Patria".',
      'macacha-guemes': 'Participó en tareas políticas y logísticas.',
      'manuela-saenz': 'Salvó la vida de Simón Bolívar.',
      'policarpa-salavarrieta': 'Espió y transmitió información estratégica.',
    },
  },
  {
    title: 'Ronda 3 de 3 — Relacioná cada heroína con uno de sus grandes logros.',
    values: {
      'juana-azurduy': 'Teniente coronela del Ejército patriota.',
      'manuela-saenz': 'Protectora de Simón Bolívar.',
      'mariquita-sanchez': 'En su casa se interpretó por primera vez el Himno Nacional.',
      'maria-remedios-del-valle': 'Declarada Madre de la Patria.',
      'macacha-guemes': 'Figura política fundamental del norte argentino.',
      'policarpa-salavarrieta': 'Símbolo de la resistencia colombiana.',
    },
  },
];

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('match') && typeof HEROINES !== 'undefined' && typeof OPTION_ORDER !== 'undefined') {
    initRelacionar();
  }
});

function initRelacionar() {
  const els = {
    game: document.getElementById('matchGame'),
    heroines: document.getElementById('matchHeroines'),
    options: document.getElementById('matchOptions'),
    roundTitle: document.getElementById('matchRoundTitle'),
    round: document.getElementById('matchRound'),
    roundTotal: document.getElementById('matchRoundTotal'),
    score: document.getElementById('matchScore'),
    remaining: document.getElementById('matchRemaining'),
    roundComplete: document.getElementById('matchRoundComplete'),
    nextRoundBtn: document.getElementById('matchNextRoundBtn'),
    results: document.getElementById('matchResults'),
    stars: document.getElementById('matchStars'),
    resultScore: document.getElementById('matchResultScore'),
    resultTotal: document.getElementById('matchResultTotal'),
    resultMessage: document.getElementById('matchResultMessage'),
    replayBtn: document.getElementById('matchReplayBtn'),
    announcer: document.getElementById('matchAnnouncer'),
  };

  const TOTAL_RELATIONS = MATCH_ROUNDS.length * OPTION_ORDER.length;

  let roundIndex = 0;
  let totalScore = 0;
  let selectedHeroineId = null;
  let remainingHeroineIds = new Set();
  let erredHeroineIds = new Set();

  els.roundTotal.textContent = String(MATCH_ROUNDS.length);
  els.resultTotal.textContent = String(TOTAL_RELATIONS);

  els.nextRoundBtn.addEventListener('click', () => {
    els.roundComplete.hidden = true;
    els.roundComplete.classList.remove('is-visible');
    roundIndex += 1;
    if (roundIndex >= MATCH_ROUNDS.length) {
      showResults();
    } else {
      renderRound();
    }
  });

  els.replayBtn.addEventListener('click', startGame);

  startGame();

  function startGame() {
    roundIndex = 0;
    totalScore = 0;
    els.score.textContent = '0';
    els.results.hidden = true;
    els.game.hidden = false;
    renderRound();
  }

  function renderRound() {
    const round = MATCH_ROUNDS[roundIndex];
    selectedHeroineId = null;
    remainingHeroineIds = new Set(OPTION_ORDER);
    erredHeroineIds = new Set();

    els.round.textContent = String(roundIndex + 1);
    els.roundTitle.textContent = round.title;
    updateRemaining();

    els.heroines.classList.remove('is-revealed');
    els.heroines.innerHTML = '';
    OPTION_ORDER.forEach((heroineId) => {
      els.heroines.appendChild(buildHeroineCard(heroineId));
    });

    els.options.classList.remove('is-revealed');
    els.options.innerHTML = '';
    shuffle(OPTION_ORDER.map((heroineId) => round.values[heroineId])).forEach((value) => {
      els.options.appendChild(buildSlot(value));
    });

    // Fuerza un reflow para volver a disparar la animación de aparición
    // escalonada en cada ronda, incluida la primera.
    void els.heroines.offsetWidth;
    els.heroines.classList.add('is-revealed');
    els.options.classList.add('is-revealed');
  }

  function buildHeroineCard(heroineId) {
    const heroine = HEROINES[heroineId];

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quiz-card quiz-card--compact';
    button.draggable = true;
    button.dataset.heroineId = heroineId;
    button.setAttribute('aria-pressed', 'false');

    const figure = document.createElement('span');
    figure.className = 'quiz-card__figure';
    const img = document.createElement('img');
    img.src = heroine.img;
    img.alt = '';
    img.loading = 'lazy';
    figure.appendChild(img);

    const name = document.createElement('span');
    name.className = 'quiz-card__name';
    name.textContent = heroine.name;

    button.append(figure, name);

    button.addEventListener('click', () => selectHeroine(heroineId, button));
    button.addEventListener('dragstart', (event) => {
      if (button.disabled) {
        event.preventDefault();
        return;
      }
      event.dataTransfer.setData('text/plain', heroineId);
      event.dataTransfer.effectAllowed = 'move';
      button.classList.add('is-dragging');
    });
    button.addEventListener('dragend', () => {
      button.classList.remove('is-dragging');
    });

    return button;
  }

  function buildSlot(value) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'match-slot';
    button.dataset.value = value;
    button.textContent = value;

    button.addEventListener('click', () => {
      if (button.disabled || !selectedHeroineId) return;
      attemptMatch(selectedHeroineId, button);
    });
    button.addEventListener('dragover', (event) => {
      if (button.disabled) return;
      event.preventDefault();
      button.classList.add('is-dragover');
    });
    button.addEventListener('dragleave', () => {
      button.classList.remove('is-dragover');
    });
    button.addEventListener('drop', (event) => {
      event.preventDefault();
      button.classList.remove('is-dragover');
      if (button.disabled) return;
      const heroineId = event.dataTransfer.getData('text/plain');
      if (heroineId) attemptMatch(heroineId, button);
    });

    return button;
  }

  function selectHeroine(heroineId, button) {
    if (button.disabled) return;
    if (selectedHeroineId === heroineId) {
      clearSelection();
      return;
    }
    clearSelection();
    selectedHeroineId = heroineId;
    button.classList.add('is-selected');
    button.setAttribute('aria-pressed', 'true');
    announce(`${HEROINES[heroineId].name} seleccionada. Ahora elegí la opción correcta.`);
  }

  function clearSelection() {
    if (!selectedHeroineId) return;
    const previous = els.heroines.querySelector(`[data-heroine-id="${selectedHeroineId}"]`);
    if (previous) {
      previous.classList.remove('is-selected');
      previous.setAttribute('aria-pressed', 'false');
    }
    selectedHeroineId = null;
  }

  function attemptMatch(heroineId, slotButton) {
    const heroineButton = els.heroines.querySelector(`[data-heroine-id="${heroineId}"]`);
    if (!heroineButton || heroineButton.disabled || slotButton.disabled) return;

    const round = MATCH_ROUNDS[roundIndex];
    const isCorrect = slotButton.dataset.value === round.values[heroineId];

    if (isCorrect) {
      heroineButton.disabled = true;
      heroineButton.draggable = false;
      heroineButton.classList.remove('is-selected', 'is-dragging');
      heroineButton.classList.add('is-matched');
      heroineButton.setAttribute('aria-pressed', 'false');

      slotButton.disabled = true;
      slotButton.classList.add('is-matched');

      remainingHeroineIds.delete(heroineId);
      if (!erredHeroineIds.has(heroineId)) {
        totalScore += 1;
        els.score.textContent = String(totalScore);
      }
      updateRemaining();
      announce('Correcto.');

      if (remainingHeroineIds.size === 0) {
        completeRound();
      }
    } else {
      erredHeroineIds.add(heroineId);
      heroineButton.classList.add('is-wrong-flash');
      slotButton.classList.add('is-wrong-flash');
      window.setTimeout(() => {
        heroineButton.classList.remove('is-wrong-flash');
        slotButton.classList.remove('is-wrong-flash');
      }, 420);
      announce('Incorrecto. Probá con otra opción.');
    }

    clearSelection();
  }

  function updateRemaining() {
    els.remaining.textContent = String(remainingHeroineIds.size);
  }

  function completeRound() {
    els.roundComplete.hidden = false;
    // Fuerza un reflow para que la transición de aparición se dispare.
    void els.roundComplete.offsetWidth;
    els.roundComplete.classList.add('is-visible');
    els.nextRoundBtn.textContent = roundIndex + 1 >= MATCH_ROUNDS.length ? 'Ver resultado →' : 'Siguiente ronda →';
    els.nextRoundBtn.focus();
  }

  function showResults() {
    els.game.hidden = true;
    els.results.hidden = false;

    const ratio = totalScore / TOTAL_RELATIONS;
    els.resultScore.textContent = String(totalScore);

    const starsCount = Math.round(ratio * 5);
    els.stars.textContent = '★'.repeat(starsCount) + '☆'.repeat(5 - starsCount);

    let message;
    if (ratio === 1) {
      message = '¡Excelente! Conocés muy bien la historia de estas heroínas.';
    } else if (ratio >= 0.7) {
      message = 'Muy buen trabajo. Aprendiste muchísimo durante el recorrido.';
    } else if (ratio >= 0.4) {
      message = 'Buen intento. Te recomendamos volver a leer algunas secciones.';
    } else {
      message = 'Podés intentarlo nuevamente después de recorrer otra vez el sitio.';
    }
    els.resultMessage.textContent = message;

    els.results.focus();
  }

  function announce(message) {
    if (!els.announcer) return;
    els.announcer.textContent = '';
    window.requestAnimationFrame(() => {
      els.announcer.textContent = message;
    });
  }

  // shuffle() se reutiliza desde js/juegos.js (mismo scope global de
  // scripts clásicos), que debe cargarse antes que este archivo.
}
