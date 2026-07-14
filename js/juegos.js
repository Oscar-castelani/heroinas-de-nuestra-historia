// =========================================================
// Juegos — "¿Quién soy?"
// Este script solo se ejecuta en juegos.html (comprueba la
// presencia de #quiz antes de inicializar nada).
// =========================================================

const HEROINES = {
  'manuela-saenz': { name: 'Manuela Sáenz', img: 'img/manuela-saenz.jpg' },
  'juana-azurduy': { name: 'Juana Azurduy', img: 'img/juana-azurduy.jpg' },
  'mariquita-sanchez': { name: 'Mariquita Sánchez de Thompson', img: 'img/mariquita-sanchez.jpg' },
  'macacha-guemes': { name: 'Macacha Güemes', img: 'img/macacha-guemes.png' },
  'maria-remedios-del-valle': { name: 'María Remedios del Valle', img: 'img/remedios-del-valle.jpg' },
  'policarpa-salavarrieta': { name: 'Policarpa Salavarrieta', img: 'img/policarpa-salavarrieta.jpg' },
};

// Orden fijo en el que se muestran las tarjetas de opciones en cada pregunta.
const OPTION_ORDER = [
  'manuela-saenz',
  'juana-azurduy',
  'mariquita-sanchez',
  'macacha-guemes',
  'maria-remedios-del-valle',
  'policarpa-salavarrieta',
];

const QUESTIONS = [
  {
    clue: '“Nací en Chuquisaca, en el Alto Perú, y luego lideré tropas patriotas junto a mi esposo, Manuel Ascencio Padilla.”',
    answer: 'juana-azurduy',
    explanation: 'Juana Azurduy nació en Chuquisaca (Alto Perú) en 1780 y organizó, junto a su esposo, tropas patriotas que combatieron a los ejércitos realistas.',
  },
  {
    clue: '“Me llamaron ‘La Libertadora del Libertador’ después de impedir un atentado contra Simón Bolívar.”',
    answer: 'manuela-saenz',
    explanation: 'Manuela Sáenz salvó la vida de Bolívar durante un atentado en Bogotá en 1828 y por eso recibió ese título.',
  },
  {
    clue: '“En mi casa de Buenos Aires se reunían los patriotas para debatir, y allí se interpretó por primera vez el Himno Nacional Argentino.”',
    answer: 'mariquita-sanchez',
    explanation: 'En la casa de Mariquita Sánchez de Thompson se interpretó por primera vez, en 1813, el Himno Nacional Argentino.',
  },
  {
    clue: '“Acompañé al Ejército del Norte como enfermera y también combatí en el frente; Manuel Belgrano me reconoció con un grado militar.”',
    answer: 'maria-remedios-del-valle',
    explanation: 'María Remedios del Valle fue distinguida como capitana por Manuel Belgrano y hoy es recordada como "La Madre de la Patria".',
  },
  {
    clue: '“Nací en Salta en 1787 y organicé redes de información y apoyo logístico para el ejército de mi hermano.”',
    answer: 'macacha-guemes',
    explanation: 'Macacha Güemes nació en Salta y fue una colaboradora fundamental de su hermano, Martín Miguel de Güemes, en la defensa del norte argentino.',
  },
  {
    clue: '“Trabajé como espía para las fuerzas patriotas en Nueva Granada y fui ejecutada en 1817 sin abandonar mis ideales.”',
    answer: 'policarpa-salavarrieta',
    explanation: 'Policarpa Salavarrieta, "La Pola", fue ejecutada en Bogotá el 14 de noviembre de 1817 tras ser capturada por su labor como espía patriota.',
  },
  {
    clue: '“Creía que las mujeres podían ejercer funciones de mando y combate, y defendí la participación de los pueblos indígenas en la lucha.”',
    answer: 'juana-azurduy',
    explanation: 'Entre las ideas de Juana Azurduy estaba la convicción de que las mujeres podían liderar y combatir, y la participación de indígenas y mestizos en la independencia.',
  },
  {
    clue: '“Colaboré con inteligencia, mensajería y organización política en las campañas vinculadas a Simón Bolívar.”',
    answer: 'manuela-saenz',
    explanation: 'Manuela Sáenz participó en tareas de espionaje, mensajería e inteligencia para las fuerzas patriotas.',
  },
  {
    clue: '“Aunque no combatí en el campo de batalla, mi aporte a la independencia argentina fue directo: mi casa fortaleció la organización del movimiento revolucionario.”',
    answer: 'mariquita-sanchez',
    explanation: 'El aporte de Mariquita Sánchez de Thompson se considera directo: su casa fue un espacio clave de organización política y cultural de los patriotas.',
  },
  {
    clue: '“Participé en el Éxodo Jujeño y combatí en las batallas de Salta, Vilcapugio y Ayohuma, donde fui herida y capturada.”',
    answer: 'maria-remedios-del-valle',
    explanation: 'María Remedios del Valle combatió en el Éxodo Jujeño y en varias batallas del Ejército del Norte, donde fue herida y capturada por los realistas.',
  },
  {
    clue: '“Participé en las negociaciones que llevaron a la Paz de los Cerrillos en 1821, tras sostener la logística del ejército gaucho.”',
    answer: 'macacha-guemes',
    explanation: 'Macacha Güemes participó en las negociaciones de la Paz de los Cerrillos (1821) y sostuvo la organización logística del ejército gaucho.',
  },
  {
    clue: '“Mi trabajo de espionaje debilitó el control español en el norte de Sudamérica, aunque mi aporte a la independencia argentina fue regional e indirecto.”',
    answer: 'policarpa-salavarrieta',
    explanation: 'El aporte de Policarpa Salavarrieta a la independencia argentina se describe como regional e indirecto: actuó en Nueva Granada, debilitando el dominio español en el continente.',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('quiz')) {
    initQuizQuienSoy();
  }
});

function initQuizQuienSoy() {
  const els = {
    game: document.getElementById('quizGame'),
    question: document.getElementById('quizQuestion'),
    clue: document.getElementById('quizClue'),
    options: document.getElementById('quizOptions'),
    feedback: document.getElementById('quizFeedback'),
    feedbackTitle: document.getElementById('quizFeedbackTitle'),
    feedbackText: document.getElementById('quizFeedbackText'),
    nextBtn: document.getElementById('quizNextBtn'),
    current: document.getElementById('quizCurrent'),
    total: document.getElementById('quizTotal'),
    score: document.getElementById('quizScore'),
    results: document.getElementById('quizResults'),
    stars: document.getElementById('quizStars'),
    resultScore: document.getElementById('quizResultScore'),
    resultTotal: document.getElementById('quizResultTotal'),
    resultMessage: document.getElementById('quizResultMessage'),
    replayBtn: document.getElementById('quizReplayBtn'),
  };

  let order = [];
  let index = 0;
  let score = 0;
  let answered = false;

  els.total.textContent = String(QUESTIONS.length);
  els.resultTotal.textContent = String(QUESTIONS.length);

  els.nextBtn.addEventListener('click', () => {
    if (index + 1 >= order.length) {
      showResults();
    } else {
      index += 1;
      changeQuestion();
    }
  });

  els.replayBtn.addEventListener('click', startGame);

  startGame();

  function startGame() {
    order = shuffle(QUESTIONS.map((_question, questionIndex) => questionIndex));
    index = 0;
    score = 0;
    answered = false;
    els.score.textContent = '0';
    els.results.hidden = true;
    els.game.hidden = false;
    renderQuestion();
  }

  function changeQuestion() {
    els.question.classList.add('is-changing');
    window.setTimeout(() => {
      renderQuestion();
      els.question.classList.remove('is-changing');
    }, 220);
  }

  function renderQuestion() {
    const question = QUESTIONS[order[index]];
    answered = false;
    els.current.textContent = String(index + 1);
    els.clue.textContent = question.clue;
    els.feedback.hidden = true;
    els.nextBtn.textContent = 'Siguiente pregunta →';

    els.options.classList.remove('is-revealed');
    els.options.innerHTML = '';

    OPTION_ORDER.forEach((heroineId) => {
      els.options.appendChild(buildOptionCard(heroineId, question));
    });

    // Fuerza un reflow para volver a disparar la animación de aparición
    // escalonada (stagger) en cada pregunta, incluida la primera.
    void els.options.offsetWidth;
    els.options.classList.add('is-revealed');
  }

  function buildOptionCard(heroineId, question) {
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
    button.addEventListener('click', () => handleAnswer(button, question));

    return button;
  }

  function handleAnswer(button, question) {
    if (answered) return;
    answered = true;

    const chosenId = button.dataset.heroineId;
    const isCorrect = chosenId === question.answer;

    if (isCorrect) {
      score += 1;
      els.score.textContent = String(score);
    }

    Array.from(els.options.querySelectorAll('.quiz-card')).forEach((card) => {
      card.disabled = true;
      if (card.dataset.heroineId === question.answer) {
        card.classList.add('is-correct');
      } else if (card === button) {
        card.classList.add('is-incorrect');
      }
    });

    const correctName = HEROINES[question.answer].name;
    els.feedbackTitle.textContent = isCorrect ? '✔ Correcto' : '✘ Esa no es la respuesta correcta.';
    els.feedbackText.textContent = isCorrect
      ? question.explanation
      : `La respuesta correcta era ${correctName}. ${question.explanation}`;

    els.feedback.hidden = false;
    if (index + 1 >= order.length) {
      els.nextBtn.textContent = 'Ver resultado →';
    }
    els.nextBtn.focus();
  }

  function showResults() {
    els.game.hidden = true;
    els.results.hidden = false;

    const total = QUESTIONS.length;
    const ratio = score / total;

    els.resultScore.textContent = String(score);

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
}

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
