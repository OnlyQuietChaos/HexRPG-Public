
(() => {
  if (document.getElementById("petal-clusters-style")) return;

  const style = document.createElement("style");
  style.id = "petal-clusters-style";
  style.textContent = `
    .hex-petal-cluster {
      position: fixed;
      top: -20px;
      width: 16px;
      height: 16px;
      pointer-events: none;
      z-index: 9992;
      opacity: 0;
      animation: petalClusterFall linear forwards;
    }

    .hex-petal-cluster span {
      position: absolute;
      width: 5px;
      height: 7px;
      border-radius: 80% 10% 80% 10%;
      background: #f3bfd0;
    }

    .hex-petal-cluster span:nth-child(1) {
      top: 0;
      left: 5px;
      transform: rotate(20deg);
    }

    .hex-petal-cluster span:nth-child(2) {
      top: 6px;
      left: 0;
      transform: rotate(100deg);
      background: #f8d9e3;
    }

    .hex-petal-cluster span:nth-child(3) {
      top: 7px;
      left: 9px;
      transform: rotate(-50deg);
      background: #eaa8bd;
    }

    @keyframes petalClusterFall {
      0% {
        transform: translate(0,0) rotate(0deg);
        opacity: 0;
      }
      15% { opacity: 0.8; }
      50% {
        transform: translate(45px,50vh) rotate(160deg);
      }
      90% { opacity: 0.7; }
      100% {
        transform: translate(-20px,110vh) rotate(330deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  function createCluster() {
    const cluster = document.createElement("div");
    cluster.className = "hex-petal-cluster";

    for (let i = 0; i < 3; i++) {
      cluster.appendChild(document.createElement("span"));
    }

    const duration = Math.random() * 14 + 24;

    cluster.style.left = Math.random() * 100 + "vw";
    cluster.style.animationDuration = duration + "s";

    document.body.appendChild(cluster);
    setTimeout(() => cluster.remove(), duration * 1000);
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(createCluster, i * 2200);
  }

  setInterval(createCluster, 4500);
})();
