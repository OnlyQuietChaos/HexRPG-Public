
(() => {
  if (document.getElementById("christmas-lights-style")) return;

  const style = document.createElement("style");
  style.id = "christmas-lights-style";
  style.textContent = `
    .christmas-light {
      position: fixed;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9995;
      animation: christmasGlow ease-in-out forwards;
    }

    @keyframes christmasGlow {
      0% { opacity: 0; transform: scale(.4); }
      25% { opacity: .75; transform: scale(1); }
      55% { opacity: .35; transform: scale(.75); }
      80% { opacity: .8; transform: scale(1.1); }
      100% { opacity: 0; transform: scale(.4); }
    }
  `;
  document.head.appendChild(style);

  const colors = ["#d86d70", "#8ebc91", "#e5c477"];

  function createLight() {
    const light = document.createElement("div");
    light.className = "christmas-light";

    const duration = 12 + Math.random() * 8;
    const color = colors[Math.floor(Math.random() * colors.length)];

    light.style.background = color;
    light.style.boxShadow = "0 0 6px 2px " + color;
    light.style.left = Math.random() * 100 + "vw";
    light.style.top = Math.random() * 100 + "vh";
    light.style.animationDuration = duration + "s";

    document.body.appendChild(light);
    setTimeout(() => light.remove(), duration * 1000);
  }

  for (let i = 0; i < 6; i++) {
    setTimeout(createLight, i * 1500);
  }

  setInterval(createLight, 2500);
})();
