
(() => {
  if (document.getElementById("blossom-sprites-style")) return;

  const style = document.createElement("style");
  style.id = "blossom-sprites-style";
  style.textContent = `
    .hex-blossom-flower {
      position: fixed;
      left: -25px;
      pointer-events: none;
      z-index: 9992;
      color: #f3c1d1;
      font-size: 10px;
      opacity: 0;
      text-shadow: 0 0 4px rgba(255,220,230,0.5);
      animation: blossomFloat linear forwards;
    }

    @keyframes blossomFloat {
      0% {
        transform: translate(0,0) rotate(0deg);
        opacity: 0;
      }
      15% { opacity: 0.8; }
      50% {
        transform: translate(50vw,-20px) rotate(150deg);
      }
      85% { opacity: 0.7; }
      100% {
        transform: translate(110vw,15px) rotate(300deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  function createFlower() {
    const flower = document.createElement("div");
    flower.className = "hex-blossom-flower";
    flower.textContent = "✿";

    const duration = Math.random() * 18 + 30;

    flower.style.top = (Math.random() * 75 + 10) + "vh";
    flower.style.fontSize = (Math.random() * 3 + 8) + "px";
    flower.style.animationDuration = duration + "s";

    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), duration * 1000);
  }

  setTimeout(createFlower, 2000);
  setInterval(createFlower, 7500);
})();
