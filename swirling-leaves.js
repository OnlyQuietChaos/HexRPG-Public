
(() => {
  if (document.getElementById("swirling-leaves-style")) return;

  const style = document.createElement("style");
  style.id = "swirling-leaves-style";
  style.textContent = `
    .swirling-leaf {
      position: fixed;
      left: -20px;
      width: 6px;
      height: 9px;
      border-radius: 80% 10% 80% 10%;
      pointer-events: none;
      z-index: 9992;
      opacity: 0;
      animation: leafSwirl linear forwards;
    }

    @keyframes leafSwirl {
      0% {
        transform: translate(0,0) rotate(0deg);
        opacity: 0;
      }
      12% { opacity: 0.8; }
      25% { transform: translate(25vw,-25px) rotate(100deg); }
      50% { transform: translate(50vw,25px) rotate(220deg); }
      75% { transform: translate(75vw,-20px) rotate(300deg); }
      100% {
        transform: translate(110vw,15px) rotate(430deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  const colors = ["#bd773b", "#d5a04d", "#a95e36", "#c58b54"];

  function createLeaf() {
    const leaf = document.createElement("div");
    leaf.className = "swirling-leaf";

    const duration = Math.random() * 18 + 28;

    leaf.style.top = (Math.random() * 75 + 10) + "vh";
    leaf.style.background = colors[Math.floor(Math.random() * colors.length)];
    leaf.style.animationDuration = duration + "s";

    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), duration * 1000);
  }

  setTimeout(createLeaf, 1500);
  setInterval(createLeaf, 6500);
})();
