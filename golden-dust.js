
(() => {
  const style = document.createElement("style");
  style.textContent = `
    .golden-dust-particle {
      position: fixed;
      bottom: -15px;
      border-radius: 50%;
      background: #ffd98a;
      box-shadow: 0 0 8px 2px rgba(255, 195, 90, 0.5);
      pointer-events: none;
      z-index: 9997;
      animation: goldenDustFloat linear forwards;
    }

    @keyframes goldenDustFloat {
      0% {
        transform: translate(0, 0);
        opacity: 0;
      }
      20% { opacity: 0.8; }
      80% { opacity: 0.6; }
      100% {
        transform: translate(35px, -110vh);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  function createDust() {
    const p = document.createElement("div");
    p.className = "golden-dust-particle";

    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 10 + 8;

    p.style.left = Math.random() * 100 + "vw";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.animationDuration = duration + "s";

    document.body.appendChild(p);
    setTimeout(() => p.remove(), duration * 1000);
  }

  for (let i = 0; i < 35; i++) {
    setTimeout(createDust, Math.random() * 10000);
  }

  setInterval(createDust, 500);
})();
