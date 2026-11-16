
(() => {
  const particleCount = 45;

  const style = document.createElement("style");
  style.textContent = `
    .floating-particle {
      position: fixed;
      bottom: -15px;
      border-radius: 50%;
      background: #fff;
      pointer-events: none;
      z-index: 9999;
      animation: stardustFloat linear forwards;
    }

    .floating-particle.twinkle {
      box-shadow:
        0 0 4px 2px rgba(255,255,255,0.7),
        0 0 10px 4px rgba(190,210,255,0.5);
    }

    @keyframes stardustFloat {
      0% {
        transform: translate(0, 0) scale(0.5);
        opacity: 0;
      }
      15% {
        opacity: 0.9;
      }
      50% {
        transform: translate(20px, -50vh) scale(1);
        opacity: 0.8;
      }
      85% {
        opacity: 0.6;
      }
      100% {
        transform: translate(-15px, -110vh) scale(0.4);
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .floating-particle {
        animation: none;
        display: none;
      }
    }
  `;

  document.head.appendChild(style);

  function createStar() {
    const star = document.createElement("div");
    star.className = "floating-particle";

    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 12 + 10;

    if (Math.random() > 0.65) {
      star.classList.add("twinkle");
    }

    star.style.left = Math.random() * 100 + "vw";
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.animationDuration = duration + "s";

    document.body.appendChild(star);

    setTimeout(() => star.remove(), duration * 1000);
  }

  for (let i = 0; i < particleCount; i++) {
    setTimeout(createStar, Math.random() * 12000);
  }

  setInterval(createStar, 450);
})();
