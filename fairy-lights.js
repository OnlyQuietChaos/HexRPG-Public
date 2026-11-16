
(() => {
  if (document.getElementById("fairy-lights-style")) return;

  const style = document.createElement("style");
  style.id = "fairy-lights-style";
  style.textContent = `
    .hex-fairy-light {
      position: fixed;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9993;
      animation: fairyTwinkle ease-in-out infinite alternate;
    }

    @keyframes fairyTwinkle {
      0% {
        opacity: 0.2;
        transform: scale(0.7);
      }
      100% {
        opacity: 0.95;
        transform: scale(1.15);
      }
    }
  `;
  document.head.appendChild(style);

  const colors = [
    "#ffd98a",
    "#f8c6c6",
    "#c5e6c8",
    "#d5c8f5",
    "#fff0bd"
  ];

  for (let i = 0; i < 16; i++) {
    const light = document.createElement("div");
    light.className = "hex-fairy-light";

    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.random() * 3 + 3;

    light.style.left = Math.random() * 100 + "vw";
    light.style.top = Math.random() * 95 + "vh";
    light.style.background = color;
    light.style.boxShadow = `0 0 7px 2px ${color}`;
    light.style.animationDuration = duration + "s";
    light.style.animationDelay = Math.random() * 4 + "s";

    document.body.appendChild(light);
  }
})();
