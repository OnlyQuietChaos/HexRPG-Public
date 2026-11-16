
(() => {
  if (document.getElementById("candlelight-style")) return;

  const style = document.createElement("style");
  style.id = "candlelight-style";
  style.textContent = `
    .candlelight-dot {
      position: fixed;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9995;
      background: #ffdc91;
      box-shadow: 0 0 7px 2px rgba(255,190,90,.45);
      animation: candleFlicker ease-in-out infinite alternate;
    }

    @keyframes candleFlicker {
      0% { opacity: .2; transform: scale(.7); }
      50% { opacity: .75; transform: scale(1.2); }
      100% { opacity: .35; transform: scale(.85); }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < 12; i++) {
    const dot = document.createElement("div");
    dot.className = "candlelight-dot";
    dot.style.left = Math.random() * 100 + "vw";
    dot.style.top = Math.random() * 100 + "vh";
    dot.style.animationDuration = (3 + Math.random() * 4) + "s";
    dot.style.animationDelay = (Math.random() * 4) + "s";
    document.body.appendChild(dot);
  }
})();
