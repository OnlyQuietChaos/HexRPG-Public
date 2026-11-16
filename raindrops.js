
(() => {
  if (document.getElementById("raindrops-style")) return;

  const style = document.createElement("style");
  style.id = "raindrops-style";
  style.textContent = `
    .hex-glass-drop {
      position: fixed;
      top: -15px;
      width: 4px;
      height: 6px;
      border-radius: 60% 60% 65% 65%;
      background: rgba(205,230,245,0.45);
      border: 1px solid rgba(235,248,255,0.45);
      box-shadow: 0 0 3px rgba(190,225,245,0.2);
      pointer-events: none;
      z-index: 9994;
      animation: hexGlassDrop linear forwards;
    }

    @keyframes hexGlassDrop {
      0% {
        transform: translateY(0);
        opacity: 0;
      }
      15% { opacity: 0.7; }
      85% { opacity: 0.6; }
      100% {
        transform: translateY(110vh);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  function createDrop() {
    const drop = document.createElement("div");
    drop.className = "hex-glass-drop";

    const duration = Math.random() * 12 + 18;

    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = duration + "s";

    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), duration * 1000);
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(createDrop, i * 2500);
  }

  setInterval(createDrop, 5000);
})();
