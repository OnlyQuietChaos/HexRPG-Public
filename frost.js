
(() => {
  if (document.getElementById("frost-style")) return;

  const style = document.createElement("style");
  style.id = "frost-style";
  style.textContent = `
    #hex-winter-frost {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: 0.22;
      background:
        radial-gradient(ellipse at top left,
          rgba(210,235,255,0.32), transparent 35%),
        radial-gradient(ellipse at top right,
          rgba(220,240,255,0.25), transparent 32%),
        radial-gradient(ellipse at bottom left,
          rgba(205,230,255,0.22), transparent 30%),
        radial-gradient(ellipse at bottom right,
          rgba(215,238,255,0.28), transparent 35%);
      filter: blur(12px);
      animation: frostPulse 18s ease-in-out infinite alternate;
    }

    @keyframes frostPulse {
      0% { opacity: 0.13; }
      100% { opacity: 0.28; }
    }
  `;

  document.head.appendChild(style);

  const frost = document.createElement("div");
  frost.id = "hex-winter-frost";
  document.body.prepend(frost);
})();
