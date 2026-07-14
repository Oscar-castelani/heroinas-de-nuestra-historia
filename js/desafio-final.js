// =========================================================
// Juegos — "Desafío Final"
// Se carga en juegos/desafio-final.html y reutiliza shuffle()
// de js/juegos.js, que debe cargarse antes que este archivo.
// =========================================================

const DESAFIO_QUESTIONS = [
  {
    question: '¿Dónde nació Juana Azurduy?',
    options: ['Salta', 'Quito', 'Chuquisaca', 'Buenos Aires'],
    answer: 2,
    explanation: 'Juana Azurduy nació en Chuquisaca, en el Alto Perú (actual Bolivia), en 1780.',
  },
  {
    question: '¿Dónde nació Manuela Sáenz?',
    options: ['Bogotá', 'Quito', 'Chuquisaca', 'Guaduas'],
    answer: 1,
    explanation: 'Manuela Sáenz nació en Quito, actual Ecuador, en 1797.',
  },
  {
    question: '¿Dónde nació Policarpa Salavarrieta?',
    options: ['Guaduas', 'Salta', 'Buenos Aires', 'Chuquisaca'],
    answer: 0,
    explanation: 'Policarpa Salavarrieta nació en Guaduas, en el Virreinato de Nueva Granada (actual Colombia), en 1795.',
  },
  {
    question: '¿Dónde nació Macacha Güemes?',
    options: ['Buenos Aires', 'Quito', 'Salta', 'Guaduas'],
    answer: 2,
    explanation: 'Macacha Güemes nació en Salta en 1787.',
  },
  {
    question: '¿Dónde nació Mariquita Sánchez de Thompson?',
    options: ['Salta', 'Buenos Aires', 'Chuquisaca', 'Quito'],
    answer: 1,
    explanation: 'Mariquita Sánchez de Thompson nació en Buenos Aires en 1786.',
  },
  {
    question: '¿Quién fue conocida como "La Madre de la Patria"?',
    options: ['Macacha Güemes', 'María Remedios del Valle', 'Mariquita Sánchez de Thompson', 'Policarpa Salavarrieta'],
    answer: 1,
    explanation: 'María Remedios del Valle es conocida como "La Madre de la Patria" por su participación en el Ejército del Norte.',
  },
  {
    question: '¿Quién organizó tertulias revolucionarias en su casa de Buenos Aires?',
    options: ['María Remedios del Valle', 'Juana Azurduy', 'Mariquita Sánchez de Thompson', 'Manuela Sáenz'],
    answer: 2,
    explanation: 'Mariquita Sánchez de Thompson organizó tertulias en su casa, un importante punto de encuentro para los patriotas.',
  },
  {
    question: '¿Quién colaboró con inteligencia, mensajería y organización política en las campañas de Simón Bolívar?',
    options: ['Manuela Sáenz', 'Policarpa Salavarrieta', 'Macacha Güemes', 'Juana Azurduy'],
    answer: 0,
    explanation: 'Manuela Sáenz colaboró con inteligencia, mensajería y organización política junto a Simón Bolívar.',
  },
  {
    question: '¿Quién defendía la participación de las mujeres en la vida política y cultural?',
    options: ['Policarpa Salavarrieta', 'Mariquita Sánchez de Thompson', 'María Remedios del Valle', 'Macacha Güemes'],
    answer: 1,
    explanation: 'Mariquita Sánchez de Thompson consideraba importante la participación de las mujeres en la vida política y cultural.',
  },
  {
    question: '¿Quién creía que las mujeres podían ejercer funciones de mando y combate?',
    options: ['Manuela Sáenz', 'Juana Azurduy', 'Mariquita Sánchez de Thompson', 'María Remedios del Valle'],
    answer: 1,
    explanation: 'Juana Azurduy demostró, con su liderazgo militar, que las mujeres podían ejercer funciones de mando y combate.',
  },
  {
    question: '¿Quién realizó tareas de espionaje para la causa independentista en Nueva Granada?',
    options: ['Macacha Güemes', 'María Remedios del Valle', 'Policarpa Salavarrieta', 'Manuela Sáenz'],
    answer: 2,
    explanation: 'Policarpa Salavarrieta trabajó como espía, reuniendo información y transportando mensajes secretos.',
  },
  {
    question: '¿Quién luchó junto a Manuel Belgrano en el Ejército del Norte?',
    options: ['María Remedios del Valle', 'Manuela Sáenz', 'Mariquita Sánchez de Thompson', 'Policarpa Salavarrieta'],
    answer: 0,
    explanation: 'María Remedios del Valle integró el Ejército del Norte bajo el mando de Manuel Belgrano.',
  },
  {
    question: '¿Quién organizó redes de información y apoyo logístico para el ejército de su hermano en Salta?',
    options: ['Juana Azurduy', 'Macacha Güemes', 'Manuela Sáenz', 'Mariquita Sánchez de Thompson'],
    answer: 1,
    explanation: 'Macacha Güemes organizó redes de información, comunicación y apoyo logístico para el ejército de su hermano, Martín Miguel de Güemes.',
  },
  {
    question: '¿En la casa de quién se interpretó por primera vez el Himno Nacional Argentino?',
    options: ['Macacha Güemes', 'Juana Azurduy', 'Mariquita Sánchez de Thompson', 'Manuela Sáenz'],
    answer: 2,
    explanation: 'En la casa de Mariquita Sánchez de Thompson se interpretó por primera vez, en 1813, el Himno Nacional Argentino.',
  },
  {
    question: '¿Quién participó en las negociaciones que llevaron a la Paz de los Cerrillos?',
    options: ['Macacha Güemes', 'Policarpa Salavarrieta', 'María Remedios del Valle', 'Manuela Sáenz'],
    answer: 0,
    explanation: 'Macacha Güemes participó en las negociaciones que llevaron a la Paz de los Cerrillos, en 1821.',
  },
  {
    question: '¿Quién recibió el grado de teniente coronela?',
    options: ['María Remedios del Valle', 'Juana Azurduy', 'Manuela Sáenz', 'Macacha Güemes'],
    answer: 1,
    explanation: 'Juana Azurduy fue distinguida con el grado de teniente coronela en reconocimiento a su liderazgo.',
  },
  {
    question: '¿Quién fue reconocida como capitana por Manuel Belgrano?',
    options: ['Policarpa Salavarrieta', 'Mariquita Sánchez de Thompson', 'María Remedios del Valle', 'Macacha Güemes'],
    answer: 2,
    explanation: 'Manuel Belgrano distinguió a María Remedios del Valle con el grado de capitana.',
  },
  {
    question: '¿Quién recibió la espada de Manuel Belgrano como reconocimiento a su valentía?',
    options: ['Juana Azurduy', 'Manuela Sáenz', 'Policarpa Salavarrieta', 'Mariquita Sánchez de Thompson'],
    answer: 0,
    explanation: 'Manuel Belgrano le entregó su espada a Juana Azurduy en homenaje a su valentía en combate.',
  },
  {
    question: '¿Por qué Manuela Sáenz es recordada como "La Libertadora del Libertador"?',
    options: [
      'Porque nació el mismo día que Simón Bolívar',
      'Porque salvó la vida de Simón Bolívar durante un atentado en 1828',
      'Porque financió las campañas militares de Bolívar',
      'Porque fue la primera gobernante de la Gran Colombia',
    ],
    answer: 1,
    explanation: 'En 1828 impidió un atentado contra Simón Bolívar en Bogotá, por lo que fue reconocida con ese título.',
  },
  {
    question: '¿Por qué Juana Azurduy es considerada una de las principales heroínas de la independencia?',
    options: [
      'Porque fue la primera mujer presidenta de las Provincias Unidas',
      'Porque lideró tropas patriotas y demostró que las mujeres podían ejercer el mando militar',
      'Porque fundó la ciudad de Sucre',
      'Porque escribió la Constitución de 1819',
    ],
    answer: 1,
    explanation: 'Lideró tropas patriotas en el Alto Perú y demostró, con su liderazgo militar, que las mujeres podían ejercer funciones de mando y combate.',
  },
  {
    question: '¿Por qué la historia de María Remedios del Valle es especialmente importante?',
    options: [
      'Porque fue la primera mujer en votar en el país',
      'Porque permite recuperar la participación afroargentina, largamente invisibilizada, en la independencia',
      'Porque diseñó el uniforme del Ejército del Norte',
      'Porque compuso el Himno Nacional Argentino',
    ],
    answer: 1,
    explanation: 'Su historia permite recuperar la participación afroargentina, largamente invisibilizada, en la construcción de la independencia.',
  },
  {
    question: '¿Por qué se describe el aporte de Policarpa Salavarrieta a la independencia argentina como "regional e indirecto"?',
    options: [
      'Porque nunca participó en ningún proceso independentista',
      'Porque actuó en Nueva Granada (actual Colombia) y no en el actual territorio argentino',
      'Porque apoyaba al bando realista',
      'Porque murió antes de la Revolución de Mayo',
    ],
    answer: 1,
    explanation: 'Actuó en Nueva Granada, debilitando el dominio español en el continente, pero no en el actual territorio argentino.',
  },
  {
    question: '¿En qué año fue ejecutada Policarpa Salavarrieta en Bogotá?',
    options: ['1810', '1813', '1817', '1825'],
    answer: 2,
    explanation: 'Policarpa Salavarrieta fue ejecutada en Bogotá el 14 de noviembre de 1817.',
  },
  {
    question: '¿En qué campaña militar participó María Remedios del Valle como enfermera y combatiente?',
    options: [
      'El Éxodo Jujeño y las campañas del Ejército del Norte',
      'La Campaña Libertadora del Perú',
      'La expedición a Chile',
      'El sitio de Montevideo',
    ],
    answer: 0,
    explanation: 'Participó en el Éxodo Jujeño y en las batallas de Tucumán, Salta, Vilcapugio y Ayohuma, dentro del Ejército del Norte.',
  },
];

const DF_TOTAL_QUESTIONS = 10;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('df') && typeof shuffle === 'function') {
    initDesafioFinal();
  }
});

function initDesafioFinal() {
  const els = {
    intro: document.getElementById('dfIntro'),
    startBtn: document.getElementById('dfStartBtn'),
    game: document.getElementById('dfGame'),
    current: document.getElementById('dfCurrent'),
    total: document.getElementById('dfTotal'),
    score: document.getElementById('dfScore'),
    timer: document.getElementById('dfTimer'),
    progressTrack: document.getElementById('dfProgressTrack'),
    progressBar: document.getElementById('dfProgressBar'),
    progressLabel: document.getElementById('dfProgressLabel'),
    question: document.getElementById('dfQuestion'),
    questionText: document.getElementById('dfQuestionText'),
    options: document.getElementById('dfOptions'),
    feedback: document.getElementById('dfFeedback'),
    feedbackTitle: document.getElementById('dfFeedbackTitle'),
    feedbackText: document.getElementById('dfFeedbackText'),
    nextBtn: document.getElementById('dfNextBtn'),
    results: document.getElementById('dfResults'),
    medal: document.getElementById('dfMedal'),
    medalIcon: document.getElementById('dfMedalIcon'),
    medalName: document.getElementById('dfMedalName'),
    resultScore: document.getElementById('dfResultScore'),
    resultTotal: document.getElementById('dfResultTotal'),
    resultCorrect: document.getElementById('dfResultCorrect'),
    resultTime: document.getElementById('dfResultTime'),
    resultPercent: document.getElementById('dfResultPercent'),
    resultMessage: document.getElementById('dfResultMessage'),
    replayBtn: document.getElementById('dfReplayBtn'),
    newChallengeBtn: document.getElementById('dfNewChallengeBtn'),
    announcer: document.getElementById('dfAnnouncer'),
  };

  let quizQuestions = [];
  let lastQuizSet = null;
  let currentIndex = 0;
  let score = 0;
  let answered = false;
  let elapsedSeconds = 0;
  let timerHandle = null;

  els.total.textContent = String(DF_TOTAL_QUESTIONS);
  els.resultTotal.textContent = String(DF_TOTAL_QUESTIONS);

  els.startBtn.addEventListener('click', () => {
    quizQuestions = buildQuizSet();
    lastQuizSet = quizQuestions;
    els.intro.hidden = true;
    runQuiz();
  });

  els.replayBtn.addEventListener('click', () => {
    quizQuestions = lastQuizSet;
    els.results.hidden = true;
    runQuiz();
  });

  els.newChallengeBtn.addEventListener('click', () => {
    quizQuestions = buildQuizSet();
    lastQuizSet = quizQuestions;
    els.results.hidden = true;
    runQuiz();
  });

  els.nextBtn.addEventListener('click', () => {
    if (currentIndex + 1 >= DF_TOTAL_QUESTIONS) {
      finishQuiz();
      return;
    }
    els.question.classList.add('is-changing');
    window.setTimeout(() => {
      currentIndex += 1;
      renderQuestion();
      els.question.classList.remove('is-changing');
    }, 220);
  });

  function buildQuizSet() {
    return shuffle(DESAFIO_QUESTIONS).slice(0, DF_TOTAL_QUESTIONS).map(prepareQuestion);
  }

  function prepareQuestion(original) {
    const order = shuffle(original.options.map((_option, i) => i));
    return {
      question: original.question,
      options: order.map((i) => original.options[i]),
      answer: order.indexOf(original.answer),
      explanation: original.explanation,
    };
  }

  function runQuiz() {
    currentIndex = 0;
    score = 0;
    elapsedSeconds = 0;
    els.score.textContent = '0';
    els.timer.textContent = '00:00';
    stopTimer();
    startTimer();
    els.game.hidden = false;
    renderQuestion();
  }

  function renderQuestion() {
    const q = quizQuestions[currentIndex];
    answered = false;

    els.current.textContent = String(currentIndex + 1);
    els.questionText.textContent = q.question;
    els.feedback.hidden = true;
    els.feedback.classList.remove('quiz__feedback--correct', 'quiz__feedback--incorrect');
    els.nextBtn.textContent = currentIndex + 1 >= DF_TOTAL_QUESTIONS ? 'Ver resultado →' : 'Siguiente pregunta →';

    updateProgress();

    els.options.innerHTML = '';
    q.options.forEach((optionText, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'df-option';
      button.textContent = optionText;
      button.addEventListener('click', () => handleAnswer(index, button, q));
      els.options.appendChild(button);
    });

    announce(`Pregunta ${currentIndex + 1} de ${DF_TOTAL_QUESTIONS}. ${q.question}`);
  }

  function updateProgress() {
    const percent = Math.round(((currentIndex + 1) / DF_TOTAL_QUESTIONS) * 100);
    els.progressBar.style.width = `${percent}%`;
    els.progressLabel.textContent = `${percent}%`;
    els.progressTrack.setAttribute('aria-valuenow', String(percent));
  }

  function handleAnswer(chosenIndex, button, question) {
    if (answered) return;
    answered = true;

    const isCorrect = chosenIndex === question.answer;
    if (isCorrect) {
      score += 1;
      els.score.textContent = String(score);
    }

    Array.from(els.options.querySelectorAll('.df-option')).forEach((optionButton, index) => {
      optionButton.disabled = true;
      if (index === question.answer) {
        optionButton.classList.add('is-correct');
      } else if (index === chosenIndex) {
        optionButton.classList.add('is-incorrect');
      }
    });

    els.feedbackTitle.textContent = isCorrect ? '✔ ¡Correcto!' : '✘ Incorrecto';
    els.feedbackText.textContent = isCorrect
      ? question.explanation
      : `La respuesta correcta era "${question.options[question.answer]}". ${question.explanation}`;
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

  function finishQuiz() {
    stopTimer();
    els.game.hidden = true;
    els.results.hidden = false;

    const percent = Math.round((score / DF_TOTAL_QUESTIONS) * 100);
    els.resultScore.textContent = String(score);
    els.resultCorrect.textContent = String(score);
    els.resultTime.textContent = formatTime(elapsedSeconds);
    els.resultPercent.textContent = `${percent}%`;

    let tier;
    if (score === 10) {
      tier = {
        cls: 'gold',
        icon: '🥇',
        name: 'Medalla de Oro',
        message: '¡Excelente! Dominás perfectamente la historia de estas heroínas.',
      };
    } else if (score >= 8) {
      tier = {
        cls: 'silver',
        icon: '🥈',
        name: 'Medalla de Plata',
        message: '¡Muy buen trabajo! Aprendiste muchísimo.',
      };
    } else if (score >= 6) {
      tier = {
        cls: 'bronze',
        icon: '🥉',
        name: 'Medalla de Bronce',
        message: 'Buen trabajo. Con un pequeño repaso podrás mejorar.',
      };
    } else {
      tier = {
        cls: 'learning',
        icon: '📖',
        name: 'Seguimos aprendiendo',
        message: 'Te recomendamos volver a recorrer las historias y volver a intentarlo.',
      };
    }

    els.medal.className = `df-medal df-medal--${tier.cls}`;
    els.medalIcon.textContent = tier.icon;
    els.medalName.textContent = tier.name;
    els.resultMessage.textContent = tier.message;

    // Fuerza un reflow para que la aparición de la medalla se anime
    // también en la primera vez que se muestra.
    void els.medal.offsetWidth;
    els.medal.classList.add('is-visible');

    announce(`¡Desafío completado! Obtuviste ${score} de ${DF_TOTAL_QUESTIONS}. ${tier.name}.`);
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
