
(() => {
  if (document.getElementById("golden-snow-style")) return;

  const style = document.createElement("style");
  style.id = "golden-snow-style";
  style.textContent = `
    .golden-snowflake {
      position: fixed;
      top: -15px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9995;
      background: #e8c77e;
      box-shadow: 0 0 4px rgba(232,199,126,.4);
      animation: goldenSnowFall linear forwards;
    }

    @keyframes goldenSnowFall {
      0% { transform: translate(0,0); opacity: 0; }
      12% { opacity: .65; }
      50% { transform: translate(20px,50vh); }
      100% { transform: translate(-15px,110vh); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function createFlake() {
    const flake = document.createElement("div");
    flake.className = "golden-snowflake";

    const duration = 25 + Math.random() * 15;
    flake.style.left = Math.random() * 100 + "vw";
    flake.style.animationDuration = duration + "s";

    document.body.appendChild(flake);
    setTimeout(() => flake.remove(), duration * 1000);
  }

  for (let i = 0; i < 6; i++) {
    setTimeout(createFlake, i * 1800);
  }

  setInterval(createFlake, 3500);
})();
