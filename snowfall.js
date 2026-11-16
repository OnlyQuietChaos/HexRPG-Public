
(() => {
  if (document.getElementById("snowfall-style")) return;

  const style = document.createElement("style");
  style.id = "snowfall-style";
  style.textContent = `
    .winter-snow {
      position: fixed;
      top: -12px;
      border-radius: 50%;
      background: rgba(255,255,255,0.85);
      pointer-events: none;
      z-index: 9993;
      box-shadow: 0 0 3px rgba(220,240,255,0.5);
      opacity: 0;
      animation: winterSnowFall linear forwards;
    }

    @keyframes winterSnowFall {
      0% {
        transform: translate(0,0);
        opacity: 0;
      }
      12% { opacity: 0.8; }
      50% { transform: translate(25px,50vh); }
      90% { opacity: 0.7; }
      100% {
        transform: translate(-20px,110vh);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  function createSnow() {
    const snow = document.createElement("div");
    snow.className = "winter-snow";

    const size = Math.random() * 2 + 1.5;
    const duration = Math.random() * 15 + 25;

    snow.style.left = Math.random() * 100 + "vw";
    snow.style.width = size + "px";
    snow.style.height = size + "px";
    snow.style.animationDuration = duration + "s";

    document.body.appendChild(snow);
    setTimeout(() => snow.remove(), duration * 1000);
  }

  for (let i = 0; i < 12; i++) {
    setTimeout(createSnow, i * 1300);
  }

  setInterval(createSnow, 2400);
})();
