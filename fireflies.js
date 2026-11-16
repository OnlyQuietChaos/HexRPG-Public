
(() => {
  if (document.getElementById("fireflies-style")) return;

  const style = document.createElement("style");
  style.id = "fireflies-style";
  style.textContent = `
    .summer-firefly {
      position: fixed;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #fff4a8;
      box-shadow: 0 0 8px 3px rgba(255,220,100,0.5);
      pointer-events: none;
      z-index: 9993;
      animation: fireflyDrift linear forwards;
    }

    @keyframes fireflyDrift {
      0% {
        transform: translate(0,0);
        opacity: 0;
      }
      20% { opacity: 0.8; }
      50% {
        transform: translate(35px,-35px);
        opacity: 0.35;
      }
      75% {
        transform: translate(-20px,-65px);
        opacity: 0.9;
      }
      100% {
        transform: translate(25px,-100px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  function createFirefly() {
    const fly = document.createElement("div");
    fly.className = "summer-firefly";

    const duration = Math.random() * 12 + 15;

    fly.style.left = Math.random() * 100 + "vw";
    fly.style.top = (Math.random() * 85 + 5) + "vh";
    fly.style.animationDuration = duration + "s";

    document.body.appendChild(fly);
    setTimeout(() => fly.remove(), duration * 1000);
  }

  for (let i = 0; i < 15; i++) {
    setTimeout(createFirefly, i * 900);
  }

  setInterval(createFirefly, 2200);
})();
