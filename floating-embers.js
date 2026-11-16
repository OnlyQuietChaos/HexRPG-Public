
(() => {
  if (document.getElementById("floating-embers-style")) return;

  const style = document.createElement("style");
  style.id = "floating-embers-style";
  style.textContent = `
    .floating-ember {
      position: fixed;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9995;
      box-shadow: 0 0 5px 1px currentColor;
      animation: emberRise linear forwards;
    }

    @keyframes emberRise {
      0% { transform: translate(0,0); opacity: 0; }
      15% { opacity: .8; }
      55% { transform: translate(14px,-65px); opacity: .6; }
      100% { transform: translate(-10px,-140px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  const colors = ["#e99a50", "#f5bd69", "#d97842", "#ffcf8a"];

  function createEmber() {
    const ember = document.createElement("div");
    ember.className = "floating-ember";

    const duration = 18 + Math.random() * 12;
    ember.style.color = colors[Math.floor(Math.random() * colors.length)];
    ember.style.background = "currentColor";
    ember.style.left = Math.random() * 100 + "vw";
    ember.style.top = (65 + Math.random() * 30) + "vh";
    ember.style.animationDuration = duration + "s";

    document.body.appendChild(ember);
    setTimeout(() => ember.remove(), duration * 1000);
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(createEmber, i * 1800);
  }

  setInterval(createEmber, 3000);
})();
