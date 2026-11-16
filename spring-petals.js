
(() => {
  if (document.getElementById("spring-petals-style")) return;

  const style = document.createElement("style");
  style.id = "spring-petals-style";
  style.textContent = `
    .spring-petal {
      position: fixed;
      top: -30px;
      pointer-events: none;
      z-index: 9993;
      border-radius: 80% 10% 80% 10%;
      opacity: 0;
      animation: springPetalFall linear forwards;
    }

    @keyframes springPetalFall {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
      }
      12% { opacity: 0.8; }
      50% {
        transform: translate(55px, 50vh) rotate(180deg);
      }
      90% { opacity: 0.7; }
      100% {
        transform: translate(-40px, 110vh) rotate(380deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  const colors = ["#f6c5d0", "#edb4c3", "#f8dce3", "#e9a6b8", "#fff0f2"];

  function createPetal() {
    const petal = document.createElement("div");
    petal.className = "spring-petal";

    const size = Math.random() * 8 + 9;
    const duration = Math.random() * 12 + 20;

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.width = size + "px";
    petal.style.height = size * 1.5 + "px";
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
    petal.style.animationDuration = duration + "s";

    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000);
  }

  for (let i = 0; i < 10; i++) {
    setTimeout(createPetal, i * 1400);
  }

  setInterval(createPetal, 2600);
})();
