
export function initParticles(canvasSelector) {

 
  const canvas = document.querySelector(canvasSelector);
  const container = canvas.parentElement;
  const ctx = canvas.getContext("2d");

 
  if (!canvas || !ctx) {
    console.error("Canvas no encontrado o contexto inválido");
    return;
  }

 
  function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);


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

 
  function getColor() {
    return document.body.classList.contains("dark-mode")
      ? "rgba(228, 230, 235, 0.6)" 
      : "rgba(24, 119, 242, 0.6)"; 
  }

  
  function animate() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const color = getColor();

    particles.forEach(p => {
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      
      p.x += p.dx;
      p.y += p.dy;

     
      if (p.x <= 0 || p.x >= canvas.width) p.dx *= -1;
      if (p.y <= 0 || p.y >= canvas.height) p.dy *= -1;

     
      if (mouse.x !== null && mouse.y !== null) {
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dist < 100) {
          const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
          p.dx += Math.cos(angle) * 0.05;
          p.dy += Math.sin(angle) * 0.05;
        }
      }

      
    }); 

    requestAnimationFrame(animate);
  }


  animate();
}
