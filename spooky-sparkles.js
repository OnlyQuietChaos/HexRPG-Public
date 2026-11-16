
(() => {
  if (document.getElementById("spooky-sparkles-style")) return;

  const style = document.createElement("style");
  style.id = "spooky-sparkles-style";
  style.textContent = `
    .hex-spooky-sparkle {
      position: fixed;
      pointer-events: none;
      z-index: 9994;
      font-size: 8px;
      opacity: 0;
      animation: spookyTwinkle 3.5s ease-in-out forwards;
    }

    @keyframes spookyTwinkle {
      0% {
        transform: scale(0.3) rotate(0deg);
        opacity: 0;
      }
      35% {
        transform: scale(1) rotate(90deg);
        opacity: 0.8;
      }
      70% {
        transform: scale(0.8) rotate(180deg);
        opacity: 0.55;
      }
      100% {
        transform: scale(0.2) rotate(270deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  const symbols = ["✦", "✧", "⋆"];
  const colors = ["#c9a5f5", "#aa91e8", "#e0c7ff", "#b9a5e0"];

  function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "hex-spooky-sparkle";
    sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 90 + "vh";
    sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 3500);
  }

  setInterval(createSparkle, 1300);
})();
