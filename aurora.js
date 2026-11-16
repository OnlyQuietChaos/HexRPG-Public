
(() => {
  const aurora = document.createElement("div");
  aurora.id = "hex-aurora-effect";

  const style = document.createElement("style");
  style.textContent = `
    #hex-aurora-effect {
      position: fixed;
      inset: -30%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.35;
      filter: blur(45px);
      background:
        radial-gradient(ellipse at 20% 40%,
          rgba(30, 200, 150, 0.35), transparent 50%),
        radial-gradient(ellipse at 75% 30%,
          rgba(110, 75, 200, 0.35), transparent 50%),
        radial-gradient(ellipse at 50% 80%,
          rgba(40, 130, 220, 0.3), transparent 50%);
      animation: auroraFlow 18s ease-in-out infinite alternate;
    }

    @keyframes auroraFlow {
      0% {
        transform: translate(-3%, 2%) rotate(-5deg) scale(1);
      }
      50% {
        transform: translate(3%, -2%) rotate(5deg) scale(1.1);
      }
      100% {
        transform: translate(-2%, 3%) rotate(-3deg) scale(1.05);
      }
    }
  `;

  document.head.appendChild(style);
  document.body.prepend(aurora);
})();
