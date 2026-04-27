// =========================
// NAVBAR: Botón hamburguesa
// =========================
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

// =========================
// SCROLL ANIMATIONS (Intersection Observer)
// =========================
const sections = document.querySelectorAll(".about-section, .skills-section, .projects-section, .contact-section");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("section-visible");
      observer.unobserve(entry.target); // deja de observar una vez que aparece
    }
  });
}, {
  threshold: 0.2 // se activa cuando 20% de la sección es visible
});

// Aplica clase oculta y observa cada sección
sections.forEach(section => {
  section.classList.add("section-hidden");
  observer.observe(section);
});

// =========================
// DARK MODE (con localStorage)
// =========================
const darkModeToggle = document.getElementById("darkModeToggle");
const savedTheme = localStorage.getItem("theme");

// Si estaba en dark mode, activarlo al cargar
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

// Evento del botón
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Guardar preferencia
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// =========================
// PARTICULAS (import externo)
// =========================
import { initParticles } from './particulas.js';

// Inicializar partículas en cada sección
initParticles('#about .particles-canvas');
initParticles('#skills .particles-canvas');
initParticles('#projects .particles-canvas');

// =========================
// PROJECT CAROUSEL
// =========================
document.querySelectorAll('.project-carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const images = carousel.querySelectorAll('img');

  // seguridad: si no hay imágenes, no hace nada
  if (!track || images.length === 0) return;

  let index = 0;
  const nextBtn = carousel.querySelector('.next');
  const prevBtn = carousel.querySelector('.prev');

  // NEXT BUTTON
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % images.length;
      updateCarousel();
    });
  }

  // PREV BUTTON
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      updateCarousel();
    });
  }

  // UPDATE FUNCTION
  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
});

// =========================
// CONTACT FORM (EmailJS)
// =========================
// Inicializa EmailJS con tu userID
emailjs.init("TU_USER_ID");

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("TU_SERVICE_ID", "TU_TEMPLATE_ID", this)
    .then(() => {
      document.getElementById("form-status").textContent = "Mensaje enviado correctamente ✅";
      this.reset();
    }, (error) => {
      document.getElementById("form-status").textContent = "Error al enviar ❌";
      console.error("Error:", error);
    });
});
