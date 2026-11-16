
(() => {
  const canvas = document.createElement("canvas");
  canvas.id = "hex-constellation";
  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9996;
  `;

  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width, height, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", resize);
  resize();

  const stars = Array.from({ length: 65 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.5 + 0.7,
    phase: Math.random() * Math.PI * 2
  }));

  let mouse = { x: -1000, y: -1000 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget) {
      mouse.x = -1000;
      mouse.y = -1000;
    }
  });

  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    stars.forEach((star, i) => {
      const twinkle = 0.5 + Math.sin(time * 0.0015 + star.phase) * 0.4;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 230, 255, ${twinkle})`;
      ctx.fill();

      const distanceToMouse = Math.hypot(
        star.x - mouse.x,
        star.y - mouse.y
      );

      if (distanceToMouse < 160) {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle =
          `rgba(190, 210, 255, ${0.4 * (1 - distanceToMouse / 160)})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      for (let j = i + 1; j < stars.length; j++) {
        const other = stars[j];
        const distance = Math.hypot(
          star.x - other.x,
          star.y - other.y
        );

        if (distance < 90 && distanceToMouse < 160) {
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = "rgba(190, 210, 255, 0.18)";
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
