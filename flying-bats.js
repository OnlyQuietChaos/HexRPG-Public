
(() => {
  if (document.getElementById("flying-bats-style")) return;

  const style = document.createElement("style");
  style.id = "flying-bats-style";
  style.textContent = `
    .hex-flying-bat {
      position: fixed;
      left: -30px;
      pointer-events: none;
      z-index: 9993;
      font-size: 13px;
      opacity: 0;
      animation: batFlight linear forwards;
    }

    @keyframes batFlight {
      0% {
        transform: translate(0,0) scaleX(1);
        opacity: 0;
      }
      12% { opacity: 0.8; }
      30% { transform: translate(30vw,-12px) scaleX(1); }
      55% { transform: translate(60vw,12px) scaleX(-1); }
      80% { transform: translate(90vw,-8px) scaleX(1); }
      100% {
        transform: translate(115vw,0) scaleX(1);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  function createBat() {
    const bat = document.createElement("div");
    bat.className = "hex-flying-bat";
    bat.textContent = "🦇";

    const duration = Math.random() * 15 + 25;

    bat.style.top = (Math.random() * 55 + 10) + "vh";
    bat.style.animationDuration = duration + "s";

    document.body.appendChild(bat);
    setTimeout(() => bat.remove(), duration * 1000);
  }

  setTimeout(createBat, 3000);
  setInterval(createBat, 12000);
})();
