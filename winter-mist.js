
(() => {
  if (document.getElementById("winter-mist-style")) return;

  const style = document.createElement("style");
  style.id = "winter-mist-style";
  style.textContent = `
    #hex-winter-mist {
      position: fixed;
      inset: -20%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.13;
      background:
        radial-gradient(
          ellipse at 20% 55%,
          rgba(210,230,245,0.28),
          transparent 55%
        ),
        radial-gradient(
          ellipse at 80% 40%,
          rgba(225,238,250,0.22),
          transparent 50%
        );
      filter: blur(35px);
      animation: winterMistDrift 45s ease-in-out infinite alternate;
    }

    @keyframes winterMistDrift {
      0% { transform: translateX(-4%) translateY(2%); }
      100% { transform: translateX(4%) translateY(-2%); }
    }
  `;

  document.head.appendChild(style);

  const mist = document.createElement("div");
  mist.id = "hex-winter-mist";
  document.body.prepend(mist);
})();
