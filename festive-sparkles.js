
(() => {
  if (document.getElementById("festive-sparkles-style")) return;

  const style = document.createElement("style");
  style.id = "festive-sparkles-style";
  style.textContent = `
    .hex-festive-sparkle {
      position: fixed;
      pointer-events: none;
      z-index: 9994;
      font-size: 8px;
      opacity: 0;
      animation: festiveTwinkle 4s ease-in-out forwards;
    }

    @keyframes festiveTwinkle {
      0% {
        transform: scale(0.2) rotate(0deg);
        opacity: 0;
      }
      35% {
        transform: scale(1) rotate(90deg);
        opacity: 0.85;
      }
      70% {
        transform: scale(0.75) rotate(180deg);
        opacity: 0.6;
      }
      100% {
        transform: scale(0.2) rotate(270deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  const symbols = ["✦", "✧", "⋆"];
  const colors = ["#f4d58d", "#e9c477", "#fff0c2", "#d9b7a0"];

  function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "hex-festive-sparkle";
    sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 90 + "vh";
    sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 4000);
  }

  setInterval(createSparkle, 1500);
})();
