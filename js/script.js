// =========================================================
// Heroínas de nuestra historia — interacciones básicas
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  setupMobileNav();
  setupSmoothScrollClose();
  setupScrollReveal();
  setupCurrentYearFields();
});

/**
 * Menú hamburguesa: alterna visibilidad y aria-expanded.
 */
function setupMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  });
}

/**
 * Cierra el menú móvil al elegir un enlace, para que el desplazamiento
 * suave (definido en CSS con scroll-behavior) quede visible de inmediato.
 */
function setupSmoothScrollClose() {
  const menu = document.getElementById('navMenu');
  const toggle = document.getElementById('navToggle');
  if (!menu || !toggle) return;

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú de navegación');
      }
    });
  });
}

/**
 * Aplica animaciones de aparición suave al hacer scroll.
 * Las clases "reveal-*" se agregan solo por JavaScript: si el script no
 * se ejecuta (o el usuario prefiere menos movimiento), el contenido
 * permanece visible desde el primer momento, sin estados ocultos.
 *
 * El hero no se incluye aquí: su entrada se anima con CSS puro al cargar
 * la página, sin depender del scroll ni de esta función.
 */
function setupScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    return;
  }

  // Una única instancia de IntersectionObserver para todas las animaciones de scroll.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  // Cuadrículas de cards con efecto stagger: índice general (heroine-cards),
  // Ideas/Acciones/Legado (info-grid) y Logros destacados (logros-grid).
  document.querySelectorAll('.info-grid, .logros-grid, .heroine-cards').forEach((grid) => {
    grid.classList.add('reveal-stagger');
    observer.observe(grid);
  });

  // Secciones de contenido simples (presentación, aporte, ideas, acciones,
  // legado…) y la frase destacada: aparición con fade + translateY.
  document.querySelectorAll('.content-section, .quote').forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Reflexión final: aparición simple.
  const reflection = document.querySelector('.reflection__content');
  if (reflection) {
    reflection.classList.add('reveal');
    observer.observe(reflection);
  }

  // Línea de tiempo (general o personal): dispara a la vez la línea
  // decorativa, los puntos y el stagger de cada evento (ver ".reveal-timeline").
  document.querySelectorAll('.timeline-section').forEach((timelineSection) => {
    timelineSection.classList.add('reveal-timeline');
    observer.observe(timelineSection);
  });
}

/**
 * Escribe el año actual donde haga falta: el pie de página (#year) y,
 * en la portada, el ciclo lectivo de la tarjeta de datos (#cicloLectivo).
 */
function setupCurrentYearFields() {
  const year = String(new Date().getFullYear());
  ['year', 'cicloLectivo'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });
}
