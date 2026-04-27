/* =========================
   PARTÍCULAS CANVAS
   ========================= */
export function initParticles(canvasSelector) {

  // Selección de canvas y contexto
  const canvas = document.querySelector(canvasSelector);
  const container = canvas.parentElement;
  const ctx = canvas.getContext("2d");

  /* =========================
     VERIFICACIÓN (IMPORTANTE)
     ========================= */
  if (!canvas || !ctx) {
    console.error("Canvas no encontrado o contexto inválido");
    return;
  }

  /* =========================
     AJUSTE DE TAMAÑO
     ========================= */
  function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  /* =========================
     CREACIÓN DE PARTÍCULAS
     ========================= */
  const particles = [];
  for (let i = 0; i < 70; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2
    });
  }

  /* =========================
     INTERACCIÓN CON EL MOUSE
     ========================= */
  const mouse = { x: null, y: null };

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  /* =========================
     COLOR DINÁMICO (DARK MODE)
     ========================= */
  function getColor() {
    return document.body.classList.contains("dark-mode")
      ? "rgba(228, 230, 235, 0.6)" // gris claro en dark mode
      : "rgba(24, 119, 242, 0.6)"; // azul en light mode
  }

  /* =========================
     LOOP DE ANIMACIÓN
     ========================= */
  function animate() {
    // limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const color = getColor();

    particles.forEach(p => {
      // dibujar partícula
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // movimiento
      p.x += p.dx;
      p.y += p.dy;

      // rebote en bordes
      if (p.x <= 0 || p.x >= canvas.width) p.dx *= -1;
      if (p.y <= 0 || p.y >= canvas.height) p.dy *= -1;

      // interacción con mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dist < 100) {
          const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
          p.dx += Math.cos(angle) * 0.05;
          p.dy += Math.sin(angle) * 0.05;
        }
      }

      // fricción para evitar velocidad infinita
      //p.dx *= 0.99;
      //p.dy *= 0.99;
    }); 

    requestAnimationFrame(animate);
  }

  /* =========================
     INICIAR ANIMACIÓN
     ========================= */
  animate();
}
