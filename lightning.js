
(() => {
  if (document.getElementById("lightning-style")) return;

  const style = document.createElement("style");
  style.id = "lightning-style";
  style.textContent = `
    .hex-lightning {
      position: fixed;
      top: 8vh;
      width: 13px;
      height: 36px;
      background: rgba(210,225,255,0.9);
      clip-path: polygon(55% 0, 100% 0, 65% 42%, 95% 42%, 20% 100%, 40% 55%, 5% 55%);
      pointer-events: none;
      z-index: 9995;
      opacity: 0;
      filter: drop-shadow(0 0 5px rgba(170,200,255,0.8));
      animation: hexLightningFlash 1.1s ease-out forwards;
    }

    @keyframes hexLightningFlash {
      0%, 15% { opacity: 0; }
      20% { opacity: 0.9; }
      28% { opacity: 0.1; }
      38% { opacity: 0.75; }
      48%, 100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function createLightning() {
    const bolt = document.createElement("div");
    bolt.className = "hex-lightning";

    bolt.style.left = (Math.random() * 80 + 10) + "vw";
    bolt.style.top = (Math.random() * 20 + 5) + "vh";

    document.body.appendChild(bolt);
    setTimeout(() => bolt.remove(), 1200);
  }

  function scheduleLightning() {
    const delay = Math.random() * 18000 + 22000;

    setTimeout(() => {
      createLightning();
      scheduleLightning();
    }, delay);
  }

  scheduleLightning();
})();
