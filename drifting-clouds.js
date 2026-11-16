
(() => {
  if (document.getElementById("summer-clouds-style")) return;

  const style = document.createElement("style");
  style.id = "summer-clouds-style";
  style.textContent = `
    .summer-cloud {
      position: fixed;
      left: -250px;
      height: 45px;
      border-radius: 50px;
      background: rgba(255,255,255,0.16);
      filter: blur(3px);
      pointer-events: none;
      z-index: 0;
      animation: cloudDrift linear forwards;
    }

    .summer-cloud::before,
    .summer-cloud::after {
      content: "";
      position: absolute;
      background: inherit;
      border-radius: 50%;
    }

    .summer-cloud::before {
      width: 55%;
      height: 100%;
      top: -45%;
      left: 15%;
    }

    .summer-cloud::after {
      width: 45%;
      height: 85%;
      top: -25%;
      right: 12%;
    }

    @keyframes cloudDrift {
      from { transform: translateX(0); }
      to { transform: translateX(calc(100vw + 500px)); }
    }
  `;
  document.head.appendChild(style);

  function createCloud() {
    const cloud = document.createElement("div");
    cloud.className = "summer-cloud";

    const duration = Math.random() * 45 + 65;
    const size = Math.random() * 100 + 130;

    cloud.style.top = (Math.random() * 55 + 5) + "vh";
    cloud.style.width = size + "px";
    cloud.style.height = size * 0.3 + "px";
    cloud.style.animationDuration = duration + "s";

    document.body.appendChild(cloud);
    setTimeout(() => cloud.remove(), duration * 1000);
  }

  for (let i = 0; i < 3; i++) {
    setTimeout(createCloud, i * 12000);
  }

  setInterval(createCloud, 18000);
})();
