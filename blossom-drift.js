
(() => {
  if (document.getElementById("blossom-drift-style")) return;

  const style = document.createElement("style");
  style.id = "blossom-drift-style";
  style.textContent = `
    .hex-blossom-petal {
      position: fixed;
      top: -15px;
      width: 5px;
      height: 7px;
      border-radius: 80% 10% 80% 10%;
      pointer-events: none;
      z-index: 9993;
      opacity: 0;
      animation: blossomDrift linear forwards;
    }

    @keyframes blossomDrift {
      0% {
        transform: translate(0,0) rotate(0deg);
        opacity: 0;
      }
      15% { opacity: 0.8; }
      50% {
        transform: translate(45px,50vh) rotate(170deg);
      }
      90% { opacity: 0.7; }
      100% {
        transform: translate(-25px,110vh) rotate(350deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  const colors = ["#f4b9ca", "#f8d5df", "#eaa6bb", "#fce8ed"];

  function createPetal() {
    const petal = document.createElement("div");
    petal.className = "hex-blossom-petal";

    const duration = Math.random() * 14 + 22;

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
    petal.style.animationDuration = duration + "s";

    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000);
  }

  for (let i = 0; i < 8; i++) {
    setTimeout(createPetal, i * 1600);
  }

  setInterval(createPetal, 2800);
})();
