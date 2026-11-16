
(() => {
  if (document.getElementById("falling-leaves-style")) return;

  const style = document.createElement("style");
  style.id = "falling-leaves-style";
  style.textContent = `
    .autumn-leaf {
      position: fixed;
      top: -20px;
      width: 7px;
      height: 11px;
      border-radius: 80% 10% 80% 10%;
      pointer-events: none;
      z-index: 9993;
      opacity: 0;
      animation: autumnLeafFall linear forwards;
    }

    .autumn-leaf::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 9px;
      background: rgba(70,40,20,0.35);
      left: 50%;
      top: 1px;
      transform: rotate(20deg);
    }

    @keyframes autumnLeafFall {
      0% {
        transform: translate(0,0) rotate(0deg);
        opacity: 0;
      }
      12% { opacity: 0.8; }
      50% { transform: translate(35px,50vh) rotate(180deg); }
      90% { opacity: 0.7; }
      100% {
        transform: translate(-25px,110vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  const colors = ["#b96d35", "#d49a45", "#a85b32", "#c58a50", "#8d7045"];

  function createLeaf() {
    const leaf = document.createElement("div");
    leaf.className = "autumn-leaf";

    const duration = Math.random() * 14 + 22;

    leaf.style.left = Math.random() * 100 + "vw";
    leaf.style.background = colors[Math.floor(Math.random() * colors.length)];
    leaf.style.animationDuration = duration + "s";

    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), duration * 1000);
  }

  for (let i = 0; i < 8; i++) {
    setTimeout(createLeaf, i * 1600);
  }

  setInterval(createLeaf, 3000);
})();
