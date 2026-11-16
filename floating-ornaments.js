
(() => {
  if (document.getElementById("floating-ornaments-style")) return;

  const style = document.createElement("style");
  style.id = "floating-ornaments-style";
  style.textContent = `
    .hex-floating-ornament {
      position: fixed;
      top: -20px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9993;
      opacity: 0;
      animation: ornamentFall linear forwards;
    }

    .hex-floating-ornament::before {
      content: "";
      position: absolute;
      width: 3px;
      height: 2px;
      border: 1px solid rgba(255,255,255,0.65);
      border-radius: 2px 2px 0 0;
      top: -3px;
      left: 1px;
    }

    @keyframes ornamentFall {
      0% {
        transform: translate(0,0) rotate(0deg);
        opacity: 0;
      }
      15% { opacity: 0.8; }
      50% {
        transform: translate(25px,50vh) rotate(140deg);
      }
      90% { opacity: 0.7; }
      100% {
        transform: translate(-20px,110vh) rotate(300deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  const colors = ["#b94b4b", "#d6ad57", "#497d59", "#c88d9b"];

  function createOrnament() {
    const ornament = document.createElement("div");
    ornament.className = "hex-floating-ornament";

    const duration = Math.random() * 14 + 24;

    ornament.style.left = Math.random() * 100 + "vw";
    ornament.style.background = colors[Math.floor(Math.random() * colors.length)];
    ornament.style.animationDuration = duration + "s";

    document.body.appendChild(ornament);
    setTimeout(() => ornament.remove(), duration * 1000);
  }

  for (let i = 0; i < 6; i++) {
    setTimeout(createOrnament, i * 1800);
  }

  setInterval(createOrnament, 3200);
})();
