
(() => {
  if (document.getElementById("haunted-fireflies-style")) return;

  const style = document.createElement("style");
  style.id = "haunted-fireflies-style";
  style.textContent = `
    .haunted-firefly {
      position: fixed;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9995;
      background: #c7a5ff;
      box-shadow: 0 0 7px 2px rgba(174,135,255,.55);
      animation: hauntedDrift ease-in-out forwards;
    }

    @keyframes hauntedDrift {
      0% { transform: translate(0,0); opacity: 0; }
      20% { opacity: .8; }
      50% { transform: translate(18px,-15px); opacity: .45; }
      75% { transform: translate(-12px,-30px); opacity: .8; }
      100% { transform: translate(10px,-45px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function createFirefly() {
    const fly = document.createElement("div");
    fly.className = "haunted-firefly";

    const duration = 16 + Math.random() * 12;
    fly.style.left = Math.random() * 100 + "vw";
    fly.style.top = Math.random() * 90 + "vh";
    fly.style.animationDuration = duration + "s";

    document.body.appendChild(fly);
    setTimeout(() => fly.remove(), duration * 1000);
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(createFirefly, i * 1600);
  }

  setInterval(createFirefly, 3000);
})();
