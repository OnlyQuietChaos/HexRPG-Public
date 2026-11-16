
(() => {
  if (document.getElementById("rainfall-style")) return;

  const style = document.createElement("style");
  style.id = "rainfall-style";
  style.textContent = `
    .hex-rain-streak {
      position: fixed;
      top: -25px;
      width: 1px;
      height: 10px;
      background: rgba(190,215,235,0.55);
      pointer-events: none;
      z-index: 9993;
      animation: hexRainFall linear forwards;
    }

    @keyframes hexRainFall {
      0% { transform: translateY(0); opacity: 0; }
      12% { opacity: 0.65; }
      90% { opacity: 0.55; }
      100% { transform: translateY(110vh); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function createRain() {
    const drop = document.createElement("div");
    drop.className = "hex-rain-streak";

    const duration = Math.random() * 5 + 8;

    drop.style.left = Math.random() * 100 + "vw";
    drop.style.height = (Math.random() * 5 + 6) + "px";
    drop.style.animationDuration = duration + "s";

    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), duration * 1000);
  }

  for (let i = 0; i < 18; i++) {
    setTimeout(createRain, i * 350);
  }

  setInterval(createRain, 450);
})();
