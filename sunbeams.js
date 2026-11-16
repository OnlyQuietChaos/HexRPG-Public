
(() => {
  if (document.getElementById("sunbeams-style")) return;

  const style = document.createElement("style");
  style.id = "sunbeams-style";
  style.textContent = `
    #hex-sunbeams {
      position: fixed;
      inset: -30%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.18;
      background:
        linear-gradient(
          115deg,
          transparent 35%,
          rgba(255,220,145,0.16) 43%,
          rgba(255,238,190,0.24) 48%,
          transparent 56%
        ),
        linear-gradient(
          125deg,
          transparent 55%,
          rgba(255,210,130,0.13) 62%,
          transparent 70%
        );
      filter: blur(18px);
      animation: sunbeamFlow 35s ease-in-out infinite alternate;
    }

    @keyframes sunbeamFlow {
      0% {
        transform: translateX(-5%) rotate(-3deg);
      }
      100% {
        transform: translateX(5%) rotate(3deg);
      }
    }
  `;

  document.head.appendChild(style);

  const beams = document.createElement("div");
  beams.id = "hex-sunbeams";
  document.body.prepend(beams);
})();
