
(() => {
  const style = document.createElement("style");
  style.textContent = `
    .click-magic-sparkle {
      position: fixed;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #ffe7a8;
      box-shadow: 0 0 8px 3px rgba(255, 210, 120, 0.7);
      pointer-events: none;
      z-index: 10000;
      animation: magicBurst 800ms ease-out forwards;
    }

    @keyframes magicBurst {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(var(--move-x), var(--move-y)) scale(0);
        opacity: 0;
      }
    }
  `;

  document.head.appendChild(style);

  document.addEventListener("click", (e) => {
    for (let i = 0; i < 18; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "click-magic-sparkle";

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 65 + 20;

      sparkle.style.left = e.clientX + "px";
      sparkle.style.top = e.clientY + "px";
      sparkle.style.setProperty("--move-x", Math.cos(angle) * distance + "px");
      sparkle.style.setProperty("--move-y", Math.sin(angle) * distance + "px");

      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 850);
    }
  });
})();
