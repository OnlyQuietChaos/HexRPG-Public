
(() => {
  if (document.getElementById("wandering-wisps-style")) return;

  const style = document.createElement("style");
  style.id = "wandering-wisps-style";
  style.textContent = `
    .wandering-wisp {
      position: fixed;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9995;
      background: #c5a5ff;
      box-shadow: 0 0 7px 2px rgba(160,110,255,.45);
      animation: wispDrift linear forwards;
    }

    @keyframes wispDrift {
      0% { transform: translate(0,0); opacity: 0; }
      15% { opacity: .7; }
      50% { transform: translate(20px,-45px); opacity: .55; }
      85% { opacity: .3; }
      100% { transform: translate(-12px,-100px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function createWisp() {
    const wisp = document.createElement("div");
    wisp.className = "wandering-wisp";

    const duration = 18 + Math.random() * 12;
    wisp.style.left = Math.random() * 100 + "vw";
    wisp.style.top = (45 + Math.random() * 50) + "vh";
    wisp.style.animationDuration = duration + "s";

    document.body.appendChild(wisp);
    setTimeout(() => wisp.remove(), duration * 1000);
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(createWisp, i * 1800);
  }

  setInterval(createWisp, 3500);
})();
