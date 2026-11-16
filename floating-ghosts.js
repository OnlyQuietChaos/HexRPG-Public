
(() => {
  if (document.getElementById("floating-ghosts-style")) return;

  const style = document.createElement("style");
  style.id = "floating-ghosts-style";
  style.textContent = `
    .hex-floating-ghost {
      position: fixed;
      bottom: -35px;
      pointer-events: none;
      z-index: 9993;
      font-size: 15px;
      opacity: 0;
      animation: ghostFloat linear forwards;
      filter: drop-shadow(0 0 4px rgba(220,220,255,0.4));
    }

    @keyframes ghostFloat {
      0% {
        transform: translate(0,0) rotate(-8deg);
        opacity: 0;
      }
      15% { opacity: 0.7; }
      50% {
        transform: translate(25px,-50vh) rotate(8deg);
      }
      85% { opacity: 0.65; }
      100% {
        transform: translate(-15px,-110vh) rotate(-5deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  function createGhost() {
    const ghost = document.createElement("div");
    ghost.className = "hex-floating-ghost";
    ghost.textContent = "👻";

    const duration = Math.random() * 15 + 25;

    ghost.style.left = Math.random() * 100 + "vw";
    ghost.style.animationDuration = duration + "s";

    document.body.appendChild(ghost);
    setTimeout(() => ghost.remove(), duration * 1000);
  }

  for (let i = 0; i < 4; i++) {
    setTimeout(createGhost, i * 3000);
  }

  setInterval(createGhost, 6500);
})();
