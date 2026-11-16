
(() => {
  if (document.getElementById("dandelion-style")) return;

  const style = document.createElement("style");
  style.id = "dandelion-style";
  style.textContent = `
    .dandelion-seed {
      position: fixed;
      top: -20px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: rgba(255,255,245,0.9);
      box-shadow: 0 0 5px rgba(255,255,255,0.7);
      pointer-events: none;
      z-index: 9991;
      animation: dandelionDrift linear forwards;
    }

    .dandelion-seed::after {
      content: "";
      position: absolute;
      width: 13px;
      height: 1px;
      background: rgba(255,255,255,0.55);
      top: 1px;
      left: 1px;
      transform: rotate(-35deg);
      transform-origin: left;
    }

    @keyframes dandelionDrift {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
      }
      15% { opacity: 0.85; }
      50% { transform: translate(60px, 50vh) rotate(160deg); }
      100% {
        transform: translate(-35px, 110vh) rotate(330deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  function createSeed() {
    const seed = document.createElement("div");
    seed.className = "dandelion-seed";

    const duration = Math.random() * 15 + 22;

    seed.style.left = Math.random() * 100 + "vw";
    seed.style.animationDuration = duration + "s";

    document.body.appendChild(seed);
    setTimeout(() => seed.remove(), duration * 1000);
  }

  for (let i = 0; i < 8; i++) {
    setTimeout(createSeed, i * 1700);
  }

  setInterval(createSeed, 3000);
})();
