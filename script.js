
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});


document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});


const sections = document.querySelectorAll(".about-section, .skills-section, .projects-section, .contact-section");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("section-visible");
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.2 
});


sections.forEach(section => {
  section.classList.add("section-hidden");
  observer.observe(section);
});


const darkModeToggle = document.getElementById("darkModeToggle");
const savedTheme = localStorage.getItem("theme");


if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}


darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});



import { initParticles } from './particulas.js';


initParticles('#about .particles-canvas');
initParticles('#skills .particles-canvas');
initParticles('#projects .particles-canvas');


document.querySelectorAll('.project-carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const images = carousel.querySelectorAll('img');


  if (!track || images.length === 0) return;

  let index = 0;
  const nextBtn = carousel.querySelector('.next');
  const prevBtn = carousel.querySelector('.prev');

  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % images.length;
      updateCarousel();
    });
  }

  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      updateCarousel();
    });
  }

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
});


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
