// =========================================================
// Juegos — "Verdadero o Falso"
// Se carga en juegos/verdadero-falso.html y reutiliza shuffle()
// de js/juegos.js, que debe cargarse antes que este archivo.
// =========================================================

const VF_STATEMENTS = [
  // --- Manuela Sáenz ---
  {
    text: 'Manuela Sáenz nació en Quito.',
    answer: true,
    explanation: 'Manuela Sáenz nació en Quito y participó activamente en los procesos de independencia sudamericanos.',
  },
  {
    text: 'Manuela Sáenz fue conocida como "La Madre de la Patria".',
    answer: false,
    explanation: 'Ese reconocimiento corresponde a María Remedios del Valle. Manuela Sáenz fue conocida como "La Libertadora del Libertador".',
  },
  {
    text: 'Manuela Sáenz salvó la vida de Simón Bolívar.',
    answer: true,
    explanation: 'En 1828 ayudó a salvar a Simón Bolívar durante un atentado en Bogotá.',
  },
  {
    text: 'Manuela Sáenz recibió el grado de teniente coronela.',
    answer: false,
    explanation: 'Ese reconocimiento corresponde a Juana Azurduy. Manuela Sáenz es recordada como "La Libertadora del Libertador".',
  },
  // --- Juana Azurduy ---
  {
    text: 'Juana Azurduy nació en Chuquisaca, en el Alto Perú.',
    answer: true,
    explanation: 'Juana Azurduy nació en Chuquisaca (Alto Perú, actual Bolivia) en 1780.',
  },
  {
    text: 'Juana Azurduy organizó tertulias en Buenos Aires.',
    answer: false,
    explanation: 'Las tertulias de Buenos Aires estuvieron vinculadas principalmente con Mariquita Sánchez de Thompson. Juana Azurduy lideró tropas patriotas.',
  },
  {
    text: 'Juana Azurduy combatió en el Alto Perú.',
    answer: true,
    explanation: 'Actuó principalmente en el Alto Perú, liderando tropas patriotas junto a su esposo, Manuel Ascencio Padilla.',
  },
  {
    text: 'Manuel Belgrano le entregó su espada a Juana Azurduy en reconocimiento a su valentía.',
    answer: true,
    explanation: 'Manuel Belgrano reconoció la valentía de Juana Azurduy entregándole su propia espada.',
  },
  {
    text: 'Juana Azurduy es recordada principalmente por su participación política y cultural, no militar.',
    answer: false,
    explanation: 'Juana Azurduy es recordada especialmente por su liderazgo militar: organizó y lideró tropas patriotas en el Alto Perú.',
  },
  // --- Mariquita Sánchez de Thompson ---
  {
    text: 'Mariquita Sánchez de Thompson nació en Buenos Aires.',
    answer: true,
    explanation: 'Mariquita Sánchez de Thompson nació en Buenos Aires, en el Virreinato del Río de la Plata, en 1786.',
  },
  {
    text: 'Mariquita Sánchez de Thompson lideró tropas en el campo de batalla.',
    answer: false,
    explanation: 'Su aporte fue político, social y cultural, no militar.',
  },
  {
    text: 'En la casa de Mariquita Sánchez de Thompson se interpretó tempranamente el Himno Nacional Argentino.',
    answer: true,
    explanation: 'En su casa se interpretó por primera vez, en 1813, el Himno Nacional Argentino.',
  },
  {
    text: 'Mariquita Sánchez de Thompson es recordada principalmente como una líder militar.',
    answer: false,
    explanation: 'Es recordada por su compromiso con la educación, la cultura y la independencia desde el ámbito político y social, no militar.',
  },
  // --- Macacha Güemes ---
  {
    text: 'Macacha Güemes nació en Salta.',
    answer: true,
    explanation: 'Macacha Güemes nació en Salta en 1787.',
  },
  {
    text: 'Macacha Güemes colaboró con la organización política y logística de la defensa del norte.',
    answer: true,
    explanation: 'Organizó redes de información, comunicación y apoyo logístico para el ejército gaucho liderado por su hermano.',
  },
  {
    text: 'Macacha Güemes fue una espía de Nueva Granada.',
    answer: false,
    explanation: 'Las tareas de espionaje en Nueva Granada se relacionan con Policarpa Salavarrieta. Macacha Güemes actuó principalmente en Salta.',
  },
  {
    text: 'Macacha Güemes nació en Buenos Aires.',
    answer: false,
    explanation: 'Macacha Güemes nació en Salta, en 1787.',
  },
  // --- María Remedios del Valle ---
  {
    text: 'María Remedios del Valle fue conocida como "La Madre de la Patria".',
    answer: true,
    explanation: 'Es conocida con ese nombre y tiene una fecha nacional en su honor: el 8 de noviembre.',
  },
  {
    text: 'María Remedios del Valle nació en Quito.',
    answer: false,
    explanation: 'Nació en Buenos Aires. Quito fue el lugar de nacimiento de Manuela Sáenz.',
  },
  {
    text: 'María Remedios del Valle acompañó al Ejército del Norte.',
    answer: true,
    explanation: 'Integró el Ejército del Norte como enfermera, auxiliar y combatiente durante las campañas de Manuel Belgrano.',
  },
  {
    text: 'María Remedios del Valle organizó redes de espionaje en Bogotá.',
    answer: false,
    explanation: 'María Remedios del Valle actuó en el Ejército del Norte; las tareas de espionaje en Bogotá se relacionan con Policarpa Salavarrieta.',
  },
  // --- Policarpa Salavarrieta ---
  {
    text: 'Policarpa Salavarrieta nació en Guaduas.',
    answer: true,
    explanation: 'Policarpa Salavarrieta nació en Guaduas, en el Virreinato de Nueva Granada (actual Colombia), en 1795.',
  },
  {
    text: 'Policarpa Salavarrieta participó en tareas de espionaje.',
    answer: true,
    explanation: 'Reunió información sobre los movimientos del ejército español y transportó mensajes secretos.',
  },
  {
    text: 'Policarpa Salavarrieta combatió junto a Manuel Belgrano.',
    answer: false,
    explanation: 'Policarpa actuó en la independencia de Nueva Granada. Juana Azurduy tuvo relación con las campañas de Belgrano.',
  },
  {
    text: 'Policarpa Salavarrieta fue reconocida como capitana por Manuel Belgrano.',
    answer: false,
    explanation: 'Ese reconocimiento corresponde a María Remedios del Valle. Policarpa Salavarrieta fue ejecutada en 1817 por su labor de espionaje en Nueva Granada.',
  },
  {
    text: 'El aporte de Policarpa Salavarrieta a la independencia argentina fue directo, porque combatió en el actual territorio argentino.',
    answer: false,
    explanation: 'Su aporte se describe como regional e indirecto: actuó en Nueva Granada (actual Colombia), no en el territorio argentino.',
  },
  // --- Mixtas / relación con la independencia ---
  {
    text: 'Macacha Güemes salvó la vida de Simón Bolívar.',
    answer: false,
    explanation: 'Quien salvó la vida de Simón Bolívar fue Manuela Sáenz, en un atentado ocurrido en 1828.',
  },
];

const VF_TOTAL_STATEMENTS = 10;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('vf') && typeof shuffle === 'function') {
    initVerdaderoFalso();
  }
});

function initVerdaderoFalso() {
  const els = {
    intro: document.getElementById('vfIntro'),
    startBtn: document.getElementById('vfStartBtn'),
    game: document.getElementById('vfGame'),
    current: document.getElementById('vfCurrent'),
    total: document.getElementById('vfTotal'),
    score: document.getElementById('vfScore'),
    timer: document.getElementById('vfTimer'),
    progressTrack: document.getElementById('vfProgressTrack'),
    progressBar: document.getElementById('vfProgressBar'),
    progressLabel: document.getElementById('vfProgressLabel'),
    question: document.getElementById('vfQuestion'),
    statementText: document.getElementById('vfStatementText'),
    trueBtn: document.getElementById('vfTrueBtn'),
    falseBtn: document.getElementById('vfFalseBtn'),
    feedback: document.getElementById('vfFeedback'),
    feedbackTitle: document.getElementById('vfFeedbackTitle'),
    feedbackText: document.getElementById('vfFeedbackText'),
    nextBtn: document.getElementById('vfNextBtn'),
    results: document.getElementById('vfResults'),
    resultScore: document.getElementById('vfResultScore'),
    resultTotal: document.getElementById('vfResultTotal'),
    resultPercent: document.getElementById('vfResultPercent'),
    resultTime: document.getElementById('vfResultTime'),
    resultMessage: document.getElementById('vfResultMessage'),
    replayBtn: document.getElementById('vfReplayBtn'),
    newSetBtn: document.getElementById('vfNewSetBtn'),
    announcer: document.getElementById('vfAnnouncer'),
  };

  let statements = [];
  let lastStatementSet = null;
  let currentIndex = 0;
  let score = 0;
  let answered = false;
  let elapsedSeconds = 0;
  let timerHandle = null;

  els.total.textContent = String(VF_TOTAL_STATEMENTS);
  els.resultTotal.textContent = String(VF_TOTAL_STATEMENTS);

  els.startBtn.addEventListener('click', () => {
    statements = buildStatementSet();
    lastStatementSet = statements;
    els.intro.hidden = true;
    runGame();
  });

  els.replayBtn.addEventListener('click', () => {
    statements = lastStatementSet;
    els.results.hidden = true;
    runGame();
  });

  els.newSetBtn.addEventListener('click', () => {
    statements = buildStatementSet();
    lastStatementSet = statements;
    els.results.hidden = true;
    runGame();
  });

  els.trueBtn.addEventListener('click', () => handleAnswer(true));
  els.falseBtn.addEventListener('click', () => handleAnswer(false));

  els.nextBtn.addEventListener('click', () => {
    if (currentIndex + 1 >= VF_TOTAL_STATEMENTS) {
      finishGame();
      return;
    }
    els.question.classList.add('is-changing');
    window.setTimeout(() => {
      currentIndex += 1;
      renderStatement();
      els.question.classList.remove('is-changing');
    }, 220);
  });

  // Selecciona 10 afirmaciones con un reparto equilibrado (5 verdaderas
  // y 5 falsas) y las mezcla, evitando repeticiones dentro de la misma
  // partida.
  function buildStatementSet() {
    const trueItems = shuffle(VF_STATEMENTS.filter((s) => s.answer === true));
    const falseItems = shuffle(VF_STATEMENTS.filter((s) => s.answer === false));
    const half = Math.floor(VF_TOTAL_STATEMENTS / 2);
    const picked = trueItems.slice(0, half).concat(falseItems.slice(0, VF_TOTAL_STATEMENTS - half));
    return shuffle(picked);
  }

  function runGame() {
    currentIndex = 0;
    score = 0;
    elapsedSeconds = 0;
    els.score.textContent = '0';
    els.timer.textContent = '00:00';
    stopTimer();
    startTimer();
    els.game.hidden = false;
    renderStatement();
  }

  function renderStatement() {
    const statement = statements[currentIndex];
    answered = false;

    els.current.textContent = String(currentIndex + 1);
    els.statementText.textContent = statement.text;
    els.feedback.hidden = true;
    els.feedback.classList.remove('quiz__feedback--correct', 'quiz__feedback--incorrect');
    els.nextBtn.textContent = currentIndex + 1 >= VF_TOTAL_STATEMENTS ? 'Ver resultado →' : 'Siguiente afirmación →';

    [els.trueBtn, els.falseBtn].forEach((button) => {
      button.disabled = false;
      button.classList.remove('is-correct', 'is-incorrect');
    });

    updateProgress();
    announce(`Pregunta ${currentIndex + 1} de ${VF_TOTAL_STATEMENTS}. ${statement.text}`);
  }

  function updateProgress() {
    const percent = Math.round(((currentIndex + 1) / VF_TOTAL_STATEMENTS) * 100);
    els.progressBar.style.width = `${percent}%`;
    els.progressLabel.textContent = `${percent}%`;
    els.progressTrack.setAttribute('aria-valuenow', String(percent));
  }

  function handleAnswer(chosenValue) {
    if (answered) return;
    answered = true;

    const statement = statements[currentIndex];
    const isCorrect = chosenValue === statement.answer;
    if (isCorrect) {
      score += 1;
      els.score.textContent = String(score);
    }

    const chosenBtn = chosenValue ? els.trueBtn : els.falseBtn;
    const correctBtn = statement.answer ? els.trueBtn : els.falseBtn;

    els.trueBtn.disabled = true;
    els.falseBtn.disabled = true;
    correctBtn.classList.add('is-correct');
    if (!isCorrect) {
      chosenBtn.classList.add('is-incorrect');
    }

    els.feedbackTitle.textContent = isCorrect ? '✔ ¡Correcto!' : '✘ Incorrecto';
    els.feedbackText.textContent = isCorrect
      ? statement.explanation
      : `La respuesta correcta era "${statement.answer ? 'Verdadero' : 'Falso'}". ${statement.explanation}`;
    els.feedback.classList.add(isCorrect ? 'quiz__feedback--correct' : 'quiz__feedback--incorrect');
    els.feedback.hidden = false;

    announce(isCorrect ? 'Correcto.' : 'Incorrecto.');
    els.nextBtn.focus();
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

    const percent = Math.round((score / VF_TOTAL_STATEMENTS) * 100);
    els.resultScore.textContent = String(score);
    els.resultPercent.textContent = `${percent}%`;
    els.resultTime.textContent = formatTime(elapsedSeconds);

    let message;
    if (score === 10) {
      message = '¡Excelente! Conocés muy bien la historia de estas heroínas.';
    } else if (score >= 8) {
      message = 'Muy buen trabajo. Recordaste casi toda la información.';
    } else if (score >= 6) {
      message = 'Buen trabajo. Podés repasar algunas historias y volver a intentarlo.';
    } else {
      message = 'Seguimos aprendiendo. Volvé a recorrer las páginas de las heroínas y probá nuevamente.';
    }
    els.resultMessage.textContent = message;

    announce(`¡Terminaste Verdadero o Falso! Obtuviste ${score} de ${VF_TOTAL_STATEMENTS}.`);
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
