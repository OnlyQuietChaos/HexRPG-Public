
(() => {
  const particleCount = 35;
  const particleColor = "255, 255, 255";

  const style = document.createElement("style");
  style.textContent = `
    .floating-particle {
      position: fixed;
      bottom: -20px;
      border-radius: 50%;
      background: rgba(${particleColor}, 0.7);
      box-shadow: 0 0 8px rgba(${particleColor}, 0.5);
      pointer-events: none;
      z-index: 9999;
      animation: particleFloat linear forwards;
    }

    @keyframes particleFloat {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      15% {
        opacity: 0.8;
      }
      85% {
        opacity: 0.6;
      }
      100% {
        transform: translateY(-110vh) translateX(35px);
        opacity: 0;
      }
    }
  `;

  document.head.appendChild(style);

  function createParticle() {
    const particle = document.createElement("div");
    particle.className = "floating-particle";

    const size = Math.random() * 5 + 2;
    const duration = Math.random() * 10 + 8;

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.animationDuration = duration + "s";

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), duration * 1000);
  }

  for (let i = 0; i < particleCount; i++) {
    setTimeout(createParticle, Math.random() * 10000);
  }

  setInterval(createParticle, 500);
})();
