
(() => {
  const style = document.createElement("style");

  style.textContent = `
    .hex-floating-petal {
      position: fixed;
      top: -30px;
      pointer-events: none;
      z-index: 9994;
      opacity: 0;
      animation: hexPetalFall linear forwards;
      transform-origin: center;
    }

    @keyframes hexPetalFall {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
      }
      10% { opacity: 0.85; }
      50% {
        transform: translate(65px, 50vh) rotate(180deg);
      }
      90% { opacity: 0.75; }
      100% {
        transform: translate(-45px, 110vh) rotate(420deg);
        opacity: 0;
      }
    }
  `;

  document.head.appendChild(style);

  const petalColors = [
    "#f6c5d0",
    "#edb4c3",
    "#f8dce3",
    "#e9a6b8",
    "#f4d1b5"
  ];

  function createPetal() {
    const petal = document.createElement("div");
    petal.className = "hex-floating-petal";

    const size = Math.random() * 9 + 9;
    const duration = Math.random() * 12 + 18;
    const color = petalColors[
      Math.floor(Math.random() * petalColors.length)
    ];

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.width = size + "px";
    petal.style.height = size * 1.5 + "px";
    petal.style.background = color;
    petal.style.borderRadius = "80% 10% 80% 10%";
    petal.style.animationDuration = duration + "s";

    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), duration * 1000);
  }

  // Start with a few scattered petals
  for (let i = 0; i < 12; i++) {
    setTimeout(createPetal, i * 1200);
  }

  // Slowly introduce new petals
  setInterval(createPetal, 2200);
})();
