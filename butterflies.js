
(() => {
  if (document.getElementById("butterflies-style")) return;

  const style = document.createElement("style");
  style.id = "butterflies-style";
  style.textContent = `
    .spring-butterfly {
      position: fixed;
      left: -50px;
      pointer-events: none;
      z-index: 9992;
      font-size: 23px;
      animation: butterflyFlight linear forwards;
      filter: drop-shadow(0 0 5px rgba(255, 190, 210, 0.5));
    }

    @keyframes butterflyFlight {
      0% {
        transform: translate(0, 0) rotate(-10deg);
        opacity: 0;
      }
      12% { opacity: 0.85; }
      30% { transform: translate(25vw, -35px) rotate(8deg); }
      55% { transform: translate(50vw, 25px) rotate(-8deg); }
      80% { transform: translate(75vw, -30px) rotate(8deg); }
      100% {
        transform: translate(115vw, 10px) rotate(-5deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  const butterflies = ["🦋"];

  function createButterfly() {
    const butterfly = document.createElement("div");
    butterfly.className = "spring-butterfly";
    butterfly.textContent = butterflies[0];

    const duration = Math.random() * 15 + 25;

    butterfly.style.top = (Math.random() * 65 + 10) + "vh";
    butterfly.style.fontSize = (Math.random() * 9 + 17) + "px";
    butterfly.style.animationDuration = duration + "s";

    document.body.appendChild(butterfly);
    setTimeout(() => butterfly.remove(), duration * 1000);
  }

  setTimeout(createButterfly, 2000);
  setInterval(createButterfly, 14000);
})();
