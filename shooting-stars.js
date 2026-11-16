
(() => {
  const style = document.createElement("style");

  style.textContent = `
    .hex-shooting-star {
      position: fixed;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #fff8df;
      box-shadow:
        0 0 6px 2px rgba(255, 245, 210, 0.8),
        0 0 14px 4px rgba(255, 220, 160, 0.5);
      pointer-events: none;
      z-index: 9995;
      opacity: 0;
      animation: hexShootingStar 3.5s ease-out forwards;
    }

    .hex-shooting-star::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 2px;
      width: 100px;
      height: 1px;
      transform: translateY(-50%);
      transform-origin: right;
      background: linear-gradient(
        to left,
        rgba(255, 248, 220, 0.8),
        transparent
      );
    }

    @keyframes hexShootingStar {
      0% {
        transform: translate(0, 0) rotate(-35deg);
        opacity: 0;
      }
      15% { opacity: 1; }
      80% { opacity: 0.8; }
      100% {
        transform: translate(-260px, 180px) rotate(-35deg);
        opacity: 0;
      }
    }
  `;

  document.head.appendChild(style);

  function createShootingStar() {
    const star = document.createElement("div");
    star.className = "hex-shooting-star";

    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 45 + "vh";

    document.body.appendChild(star);

    setTimeout(() => star.remove(), 3600);
  }

  function scheduleStar() {
    createShootingStar();

    // Wait 8 to 18 seconds before the next star
    setTimeout(scheduleStar, Math.random() * 10000 + 8000);
  }

  setTimeout(scheduleStar, 3000);
})();
