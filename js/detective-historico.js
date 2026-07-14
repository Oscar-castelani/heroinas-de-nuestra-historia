// =========================================================
// Juegos — "El Detective Histórico"
// Se carga en juegos/detective-historico.html y reutiliza
// HEROINES / OPTION_ORDER / shuffle() de js/juegos.js, que debe
// cargarse antes que este archivo.
// =========================================================

const DETECTIVE_CASES = [
  {
    heroineId: 'juana-azurduy',
    pistas: [
      'Nací en Chuquisaca.',
      'Combatí durante las guerras por la independencia.',
      'Luché junto a Manuel Belgrano.',
      'Recibí el grado de teniente coronela.',
      'Soy considerada una de las grandes heroínas del Alto Perú.',
    ],
    explicacion: 'Juana Azurduy nació en Chuquisaca y fue una de las principales líderes militares de la independencia.',
  },
  {
    heroineId: 'manuela-saenz',
    pistas: [
      'Nací en Quito.',
      'Colaboré con inteligencia, mensajería y organización política.',
      'Estuve vinculada a las campañas de Simón Bolívar.',
      'En 1828 ayudé a salvar la vida de Bolívar durante un atentado.',
      'Soy conocida como "La Libertadora del Libertador".',
    ],
    explicacion: 'Manuela Sáenz nació en Quito y salvó la vida de Simón Bolívar en 1828, por lo que fue reconocida como "La Libertadora del Libertador".',
  },
  {
    heroineId: 'mariquita-sanchez',
    pistas: [
      'Nací en Buenos Aires.',
      'No combatí en el campo de batalla.',
      'Mi casa fue un importante punto de encuentro para los patriotas.',
      'En mi casa se interpretó por primera vez el Himno Nacional Argentino.',
      'Fui una firme defensora de la educación y de la participación de las mujeres.',
    ],
    explicacion: 'Mariquita Sánchez de Thompson organizó tertulias patriotas en su casa de Buenos Aires, donde se interpretó por primera vez, en 1813, el Himno Nacional Argentino.',
  },
  {
    heroineId: 'macacha-guemes',
    pistas: [
      'Nací en Salta.',
      'Fui colaboradora cercana de mi hermano en la defensa del norte.',
      'Organicé redes de información, comunicación y apoyo logístico.',
      'Participé en las negociaciones de la Paz de los Cerrillos.',
      'Mi hermano fue Martín Miguel de Güemes.',
    ],
    explicacion: 'Macacha Güemes nació en Salta y fue una colaboradora fundamental de su hermano, Martín Miguel de Güemes, en la defensa del norte argentino.',
  },
  {
    heroineId: 'maria-remedios-del-valle',
    pistas: [
      'Nací en Buenos Aires, hacia 1766.',
      'Integré el Ejército del Norte.',
      'Actué como enfermera, auxiliar y combatiente.',
      'Manuel Belgrano me reconoció con el grado de capitana.',
      'Soy conocida como "La Madre de la Patria".',
    ],
    explicacion: 'María Remedios del Valle acompañó al Ejército del Norte como enfermera y combatiente, y es conocida como "La Madre de la Patria".',
  },
  {
    heroineId: 'policarpa-salavarrieta',
    pistas: [
      'Nací en Guaduas.',
      'Actué principalmente en Bogotá.',
      'Trabajé como espía para las fuerzas patriotas.',
      'Transporté mensajes secretos y reuní información sobre el ejército español.',
      'Fui ejecutada en 1817 sin abandonar mis ideales.',
    ],
    explicacion: 'Policarpa Salavarrieta, "La Pola", fue una espía patriota de Nueva Granada ejecutada en Bogotá en 1817.',
  },
];

const DH_TOTAL_CASES = DETECTIVE_CASES.length;
const DH_MAX_CLUES = 5;

document.addEventListener('DOMContentLoaded', () => {
  if (
    document.getElementById('dh')
    && typeof HEROINES !== 'undefined'
    && typeof OPTION_ORDER !== 'undefined'
    && typeof shuffle === 'function'
  ) {
    initDetective();
  }
});

function initDetective() {
  const els = {
    intro: document.getElementById('dhIntro'),
    startBtn: document.getElementById('dhStartBtn'),
    game: document.getElementById('dhGame'),
    caseNum: document.getElementById('dhCaseNum'),
    caseTotal: document.getElementById('dhCaseTotal'),
    caseNumInline: document.getElementById('dhCaseNumInline'),
    score: document.getElementById('dhScore'),
    possible: document.getElementById('dhPossible'),
    file: document.getElementById('dhFile'),
    clues: document.getElementById('dhClues'),
    moreClueBtn: document.getElementById('dhMoreClueBtn'),
    suspects: document.getElementById('dhSuspects'),
    feedback: document.getElementById('dhFeedback'),
    feedbackTitle: document.getElementById('dhFeedbackTitle'),
    feedbackText: document.getElementById('dhFeedbackText'),
    nextBtn: document.getElementById('dhNextBtn'),
    results: document.getElementById('dhResults'),
    badge: document.getElementById('dhBadge'),
    badgeIcon: document.getElementById('dhBadgeIcon'),
    badgeName: document.getElementById('dhBadgeName'),
    resultScore: document.getElementById('dhResultScore'),
    resultStars: document.getElementById('dhResultStars'),
    resultPercent: document.getElementById('dhResultPercent'),
    resultMessage: document.getElementById('dhResultMessage'),
    replayBtn: document.getElementById('dhReplayBtn'),
    announcer: document.getElementById('dhAnnouncer'),
  };

  els.caseTotal.textContent = String(DH_TOTAL_CASES);

  let caseOrder = [];
  let caseIndex = 0;
  let currentCase = null;
  let cluesShown = 0;
  let answered = false;
  let totalScore = 0;

  els.startBtn.addEventListener('click', () => {
    els.intro.hidden = true;
    startGame();
  });

  els.replayBtn.addEventListener('click', () => {
    els.results.hidden = true;
    startGame();
  });

  els.moreClueBtn.addEventListener('click', requestMoreClue);

  els.nextBtn.addEventListener('click', () => {
    if (caseIndex + 1 >= DH_TOTAL_CASES) {
      finishGame();
      return;
    }
    caseIndex += 1;
    renderCase();
  });

  function startGame() {
    caseOrder = shuffle(DETECTIVE_CASES.map((_case, index) => index));
    caseIndex = 0;
    totalScore = 0;
    els.score.textContent = '0';
    els.results.hidden = true;
    els.game.hidden = false;
    renderCase();
  }

  function renderCase() {
    currentCase = DETECTIVE_CASES[caseOrder[caseIndex]];
    cluesShown = 0;
    answered = false;

    els.caseNum.textContent = String(caseIndex + 1);
    els.caseNumInline.textContent = String(caseIndex + 1);
    els.nextBtn.textContent = caseIndex + 1 >= DH_TOTAL_CASES ? 'Ver resultado final →' : 'Siguiente caso →';

    els.feedback.hidden = true;
    els.feedback.classList.remove('quiz__feedback--correct', 'quiz__feedback--incorrect');

    els.clues.innerHTML = '';
    els.moreClueBtn.hidden = false;
    els.moreClueBtn.disabled = false;

    els.file.classList.remove('is-open');
    revealClue();
    updatePossibleScore();
    renderSuspects();

    void els.file.offsetWidth;
    els.file.classList.add('is-open');

    announce(`Caso ${caseIndex + 1} de ${DH_TOTAL_CASES}. Pista 1: ${currentCase.pistas[0]}`);
  }

  function revealClue() {
    const index = cluesShown;
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = `Pista ${index + 1}: `;
    li.append(strong, document.createTextNode(currentCase.pistas[index]));
    els.clues.appendChild(li);
    cluesShown += 1;

    void li.offsetWidth;
    li.classList.add('is-visible');
  }

  function requestMoreClue() {
    if (answered || cluesShown >= currentCase.pistas.length) return;

    revealClue();
    updatePossibleScore();
    announce(`Pista ${cluesShown}: ${currentCase.pistas[cluesShown - 1]}`);

    if (cluesShown >= currentCase.pistas.length) {
      els.moreClueBtn.hidden = true;
    }
  }

  function updatePossibleScore() {
    const points = pointsForClues(cluesShown);
    els.possible.textContent = starString(points);
  }

  function pointsForClues(count) {
    return Math.max(DH_MAX_CLUES + 1 - count, 1);
  }

  function starString(points) {
    return '★'.repeat(points) + '☆'.repeat(5 - points);
  }

  function renderSuspects() {
    els.suspects.classList.remove('is-revealed');
    els.suspects.innerHTML = '';

    OPTION_ORDER.forEach((heroineId) => {
      const heroine = HEROINES[heroineId];

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-card';
      button.dataset.heroineId = heroineId;

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
      button.addEventListener('click', () => handleAnswer(heroineId, button));
      els.suspects.appendChild(button);
    });

    void els.suspects.offsetWidth;
    els.suspects.classList.add('is-revealed');
  }

  function handleAnswer(chosenId, button) {
    if (answered) return;
    answered = true;
    els.moreClueBtn.hidden = true;

    const isCorrect = chosenId === currentCase.heroineId;
    const points = isCorrect ? pointsForClues(cluesShown) : 0;
    totalScore += points;
    els.score.textContent = String(totalScore);

    Array.from(els.suspects.querySelectorAll('.quiz-card')).forEach((card) => {
      card.disabled = true;
      if (card.dataset.heroineId === currentCase.heroineId) {
        card.classList.add('is-case-correct');
      } else if (card === button) {
        card.classList.add('is-case-incorrect');
      }
    });

    const correctName = HEROINES[currentCase.heroineId].name;
    els.feedbackTitle.textContent = isCorrect ? '✔ ¡Correcto!' : '✘ Incorrecto';
    els.feedbackText.textContent = isCorrect
      ? currentCase.explicacion
      : `La heroína correcta era ${correctName}. ${currentCase.explicacion}`;
    els.feedback.classList.add(isCorrect ? 'quiz__feedback--correct' : 'quiz__feedback--incorrect');
    els.feedback.hidden = false;

    announce(isCorrect ? `Correcto. Sumaste ${points} puntos.` : 'Incorrecto. El caso se cierra sin puntos.');
    els.nextBtn.focus();
  }

  function classify(score) {
    if (score >= 26) {
      return {
        cls: 'expert',
        icon: '🕵️',
        name: 'Detective Experto',
        message: 'Conocés perfectamente la historia de nuestras heroínas.',
      };
    }
    if (score >= 20) {
      return {
        cls: 'advanced',
        icon: '🕵️',
        name: 'Detective Avanzado',
        message: 'Muy buen trabajo.',
      };
    }
    if (score >= 14) {
      return {
        cls: 'training',
        icon: '🕵️',
        name: 'Detective en Entrenamiento',
        message: 'Seguí investigando.',
      };
    }
    return {
      cls: 'apprentice',
      icon: '📚',
      name: 'Aprendiz de Detective',
      message: 'Volvé a recorrer las historias y descubrí nuevas pistas.',
    };
  }

  function finishGame() {
    els.game.hidden = true;
    els.results.hidden = false;

    const maxScore = DH_TOTAL_CASES * 5;
    const percent = Math.round((totalScore / maxScore) * 100);

    els.resultScore.textContent = `${totalScore} / ${maxScore}`;
    els.resultStars.textContent = `${totalScore} ⭐`;
    els.resultPercent.textContent = `${percent}%`;

    const tier = classify(totalScore);
    els.badge.className = `df-medal df-medal--${tier.cls}`;
    els.badgeIcon.textContent = tier.icon;
    els.badgeName.textContent = tier.name;
    els.resultMessage.textContent = tier.message;

    void els.badge.offsetWidth;
    els.badge.classList.add('is-visible');

    announce(`Resultado final. Puntaje: ${totalScore} de ${maxScore}. ${tier.name}.`);
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
