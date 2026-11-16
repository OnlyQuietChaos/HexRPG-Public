
(() => {
  if (document.getElementById("hex-atmosphere-controller")) return;

  const STORAGE = "hexAtmosphereSettings";

  const seasons = {
    spring: {
      name: "Spring",
      icon: "🌱",
      effects: ["petal"]
    },
    summer: {
      name: "Summer",
      icon: "☀️",
      effects: ["firefly"]
    },
    autumn: {
      name: "Autumn",
      icon: "🍂",
      effects: ["leaf"]
    },
    winter: {
      name: "Winter",
      icon: "❄️",
      effects: ["snow"]
    },
    monsoon: {
      name: "Monsoon",
      icon: "🌧️",
      effects: ["rain"]
    },
    spooky: {
      name: "Spooky",
      icon: "👻",
      effects: ["wisps", "haunted"]
    },
    festive: {
      name: "Festive",
      icon: "✨",
      effects: ["candle", "goldenSnow"]
    },
    off: {
      name: "Off",
      icon: "○",
      effects: []
    }
  };

  const defaults = {
    season: "spring",
    mode: "auto",
    left: null,
    top: null
  };

  let settings = { ...defaults };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE));
    if (saved) settings = { ...defaults, ...saved };
  } catch (error) {}

  if (!seasons[settings.season]) settings.season = "spring";
  if (!["auto", "day", "night"].includes(settings.mode)) {
    settings.mode = "auto";
  }

  const style = document.createElement("style");
  style.id = "hex-atmosphere-controller";

  style.textContent = `
    #hex-atmo-overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9990;
      transition: background 1.2s ease;
    }

    #hex-atmo-effects {
      position: fixed;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 9992;
    }

    .hex-atmo-particle {
      position: absolute;
      pointer-events: none;
      will-change: transform, opacity;
    }

    @keyframes hexAtmoFall {
      0% {
        transform: translate(0, -20px) rotate(0deg);
        opacity: 0;
      }
      12% { opacity: .65; }
      50% {
        transform: translate(25px, 50vh) rotate(170deg);
      }
      90% { opacity: .5; }
      100% {
        transform: translate(-15px, 110vh) rotate(340deg);
        opacity: 0;
      }
    }

    @keyframes hexAtmoDrift {
      0% {
        transform: translate(0, 0);
        opacity: 0;
      }
      20% { opacity: .7; }
      50% {
        transform: translate(20px, -35px);
        opacity: .5;
      }
      100% {
        transform: translate(-12px, -75px);
        opacity: 0;
      }
    }

    @keyframes hexAtmoRain {
      0% { transform: translateY(-20px); opacity: 0; }
      15% { opacity: .5; }
      90% { opacity: .4; }
      100% { transform: translateY(110vh); opacity: 0; }
    }

    @keyframes hexAtmoWisp {
      0% {
        transform: translate(0, 0);
        opacity: 0;
      }
      15% { opacity: .7; }
      50% { transform: translate(20px, -45px); opacity: .5; }
      100% {
        transform: translate(-12px, -100px);
        opacity: 0;
      }
    }

    @keyframes hexAtmoHaunted {
      0% { transform: translate(0,0); opacity: 0; }
      20% { opacity: .7; }
      50% { transform: translate(18px,-15px); opacity: .4; }
      75% { transform: translate(-12px,-30px); opacity: .7; }
      100% { transform: translate(10px,-45px); opacity: 0; }
    }

    @keyframes hexAtmoCandle {
      0% { opacity: .2; transform: scale(.7); }
      50% { opacity: .7; transform: scale(1.15); }
      100% { opacity: .3; transform: scale(.85); }
    }

    @keyframes hexAtmoTwinkle {
      0% { opacity: 0; transform: scale(.4); }
      30% { opacity: .7; transform: scale(1); }
      65% { opacity: .35; transform: scale(.75); }
      100% { opacity: 0; transform: scale(.4); }
    }

    #hex-atmo-button {
      position: fixed;
      z-index: 10020;
      right: 16px;
      top: 50%;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      border: 1px solid rgba(170,195,225,.65);
      background: rgba(23,35,56,.94);
      color: #f4f1ed;
      font-size: 21px;
      cursor: grab;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 16px rgba(0,0,0,.3);
      touch-action: none;
      user-select: none;
    }

    #hex-atmo-button:hover {
      background: rgba(45,65,94,.98);
      box-shadow: 0 3px 20px rgba(100,150,210,.35);
    }

    #hex-atmo-button:active {
      cursor: grabbing;
    }

    #hex-atmo-panel {
      position: fixed;
      z-index: 10019;
      width: 245px;
      max-width: calc(100vw - 24px);
      max-height: 80vh;
      overflow-y: auto;
      padding: 15px;
      box-sizing: border-box;
      border: 1px solid rgba(160,185,215,.35);
      border-radius: 13px;
      background: rgba(20,30,48,.97);
      color: #f2f0ed;
      box-shadow: 0 8px 30px rgba(0,0,0,.35);
      font-family: Arial, sans-serif;
      display: none;
    }

    #hex-atmo-panel.open {
      display: block;
    }

    #hex-atmo-panel .atmo-heading {
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 1px;
      margin-bottom: 5px;
    }

    #hex-atmo-panel .atmo-subheading {
      font-size: 10px;
      color: #aab8cc;
      letter-spacing: 1px;
      margin: 13px 0 7px;
      text-transform: uppercase;
    }

    #hex-atmo-panel .atmo-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }

    #hex-atmo-panel button {
      font-family: inherit;
      cursor: pointer;
    }

    #hex-atmo-panel .atmo-choice {
      border: 1px solid rgba(170,195,225,.2);
      border-radius: 7px;
      background: rgba(255,255,255,.055);
      color: #e9edf4;
      padding: 9px 5px;
      font-size: 11px;
      text-align: center;
    }

    #hex-atmo-panel .atmo-choice.selected {
      background: rgba(117,151,194,.3);
      border-color: #91b5e0;
      color: white;
    }

    #hex-atmo-panel .atmo-time {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
    }

    #hex-atmo-panel .atmo-close {
      float: right;
      border: none;
      background: transparent;
      color: #b9c5d5;
      font-size: 19px;
      padding: 0 3px;
    }

    @media (max-width: 480px) {
      #hex-atmo-button {
        width: 42px;
        height: 42px;
      }
    }
  `;

  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.id = "hex-atmo-overlay";
  document.body.appendChild(overlay);

  const effects = document.createElement("div");
  effects.id = "hex-atmo-effects";
  document.body.appendChild(effects);

  const button = document.createElement("button");
  button.id = "hex-atmo-button";
  button.type = "button";
  button.textContent = "☾";
  button.setAttribute("aria-label", "Atmosphere settings");
  button.title = "Drag to move. Click for settings.";
  document.body.appendChild(button);

  const panel = document.createElement("div");
  panel.id = "hex-atmo-panel";

  panel.innerHTML = `
    <button class="atmo-close" type="button" aria-label="Close">×</button>
    <div class="atmo-heading">ATMOSPHERE</div>
    <div class="atmo-subheading">Choose a season</div>
    <div class="atmo-grid" id="hex-atmo-seasons"></div>
    <div class="atmo-subheading">Time of day</div>
    <div class="atmo-time">
      <button class="atmo-choice" data-mode="auto">Auto</button>
      <button class="atmo-choice" data-mode="day">☀️ Day</button>
      <button class="atmo-choice" data-mode="night">🌙 Night</button>
    </div>
  `;

  document.body.appendChild(panel);

  const seasonGrid = panel.querySelector("#hex-atmo-seasons");

  Object.entries(seasons).forEach(([key, season]) => {
    const choice = document.createElement("button");
    choice.type = "button";
    choice.className = "atmo-choice";
    choice.dataset.season = key;
    choice.textContent = season.icon + " " + season.name;
    seasonGrid.appendChild(choice);
  });

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE, JSON.stringify(settings));
    } catch (error) {}
  }

  function getTimeMode() {
    if (settings.mode !== "auto") return settings.mode;

    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? "day" : "night";
  }

  function updateAppearance() {
    const mode = getTimeMode();

    overlay.style.background = mode === "night"
      ? "rgba(8,14,32,.20)"
      : "rgba(255,238,210,.025)";

    button.textContent = mode === "night" ? "☾" : "☀";

    panel.querySelectorAll("[data-mode]").forEach(item => {
      item.classList.toggle(
        "selected",
        item.dataset.mode === settings.mode
      );
    });
  }

  function updatePanel() {
    panel.querySelectorAll("[data-season]").forEach(item => {
      item.classList.toggle(
        "selected",
        item.dataset.season === settings.season
      );
    });

    updateAppearance();
  }

  const intervals = [];

  function clearEffects() {
    intervals.forEach(id => clearInterval(id));
    intervals.length = 0;
    effects.innerHTML = "";
  }

  const palettes = {
    petal: ["#f6c5d0", "#edb4c3", "#f8dce3", "#e9a6b8"],
    firefly: ["#fff4a8", "#f7e58a", "#d7ed9b"],
    leaf: ["#b96d35", "#d49a45", "#a85b32"],
    snow: ["#ffffff", "#e8f3ff", "#d7e8f7"],
    rain: ["#cde6f5", "#e8f5ff"],
    blossom: ["#f4b9ca", "#f8d5df"],
    wisps: ["#c5a5ff"],
    haunted: ["#c7a5ff"],
    candle: ["#ffdc91"],
    goldenSnow: ["#e8c77e"]
  };

  function makeParticle(type) {
    const particle = document.createElement("div");
    particle.className = "hex-atmo-particle";

    const palette = palettes[type];
    const color = palette[Math.floor(Math.random() * palette.length)];

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.color = color;

    let duration = 24 + Math.random() * 14;
    let animation = "hexAtmoFall";

    if (["petal", "leaf"].includes(type)) {
      particle.style.top = "-15px";
      particle.style.width = "5px";
      particle.style.height = "7px";
      particle.style.background = color;
      particle.style.borderRadius = "80% 10% 80% 10%";
    }

    if (type === "snow" || type === "goldenSnow") {
      particle.style.top = "-15px";
      particle.style.width = "3px";
      particle.style.height = "3px";
      particle.style.borderRadius = "50%";
      particle.style.background = color;
      particle.style.boxShadow = "0 0 4px " + color;
      duration = 25 + Math.random() * 15;
    }

    if (type === "rain") {
      particle.style.top = "-15px";
      particle.style.width = "1px";
      particle.style.height = "8px";
      particle.style.background = color;
      duration = 9 + Math.random() * 5;
      animation = "hexAtmoRain";
    }

    if (type === "firefly") {
      particle.style.top = (Math.random() * 80 + 10) + "vh";
      particle.style.width = "3px";
      particle.style.height = "3px";
      particle.style.borderRadius = "50%";
      particle.style.background = color;
      particle.style.boxShadow = "0 0 6px 2px " + color;
      duration = 18 + Math.random() * 12;
      animation = "hexAtmoDrift";
    }

    if (type === "wisps") {
      particle.style.top = (45 + Math.random() * 50) + "vh";
      particle.style.width = "3px";
      particle.style.height = "3px";
      particle.style.borderRadius = "50%";
      particle.style.background = color;
      particle.style.boxShadow = "0 0 7px 2px rgba(160,110,255,.45)";
      duration = 18 + Math.random() * 12;
      animation = "hexAtmoWisp";
    }

    if (type === "haunted") {
      particle.style.top = Math.random() * 90 + "vh";
      particle.style.width = "3px";
      particle.style.height = "3px";
      particle.style.borderRadius = "50%";
      particle.style.background = color;
      particle.style.boxShadow = "0 0 7px 2px rgba(174,135,255,.55)";
      duration = 16 + Math.random() * 12;
      animation = "hexAtmoHaunted";
    }

    if (type === "candle") {
      particle.style.top = Math.random() * 95 + "vh";
      particle.style.width = "3px";
      particle.style.height = "3px";
      particle.style.borderRadius = "50%";
      particle.style.background = color;
      particle.style.boxShadow = "0 0 7px 2px rgba(255,190,90,.45)";
      duration = 3 + Math.random() * 4;
      animation = "hexAtmoCandle";
      particle.style.animationIterationCount = "infinite";
    }

    particle.style.animation = animation + " " + duration + "s ease-in-out forwards";

    if (type === "candle") {
      particle.style.animationIterationCount = "infinite";
    }

    effects.appendChild(particle);

    if (type !== "candle") {
      particle.addEventListener("animationend", () => particle.remove());
    }
  }

  const effectSettings = {
    petal: { interval: 3000, initial: 5 },
    firefly: { interval: 2300, initial: 5 },
    leaf: { interval: 3200, initial: 5 },
    snow: { interval: 2500, initial: 5 },
    rain: { interval: 1800, initial: 5 },
    wisps: { interval: 3500, initial: 4 },
    haunted: { interval: 3000, initial: 4 },
    candle: { interval: 0, initial: 12 },
    goldenSnow: { interval: 3500, initial: 5 }
  };

  function startOneEffect(type) {
    const config = effectSettings[type];
    if (!config) return;

    for (let i = 0; i < config.initial; i++) {
      setTimeout(() => {
        if (settings.season !== "off" &&
            seasons[settings.season].effects.includes(type)) {
          if (effects.childElementCount < 18) makeParticle(type);
        }
      }, i * 1000);
    }

    if (config.interval > 0) {
      const id = setInterval(() => {
        if (effects.childElementCount < 18) makeParticle(type);
      }, config.interval);

      intervals.push(id);
    } else if (type === "candle") {
      makeParticle(type);
      for (let i = 1; i < config.initial; i++) {
        setTimeout(() => {
          if (settings.season === "festive") makeParticle(type);
        }, i * 250);
      }
    }
  }

  function startEffects() {
    clearEffects();

    const season = seasons[settings.season];
    if (!season) return;

    season.effects.forEach(startOneEffect);
  }

  function changeSeason(season) {
    if (!seasons[season]) return;

    settings.season = season;
    saveSettings();
    updatePanel();
    startEffects();
  }

  function changeMode(mode) {
    if (!["auto", "day", "night"].includes(mode)) return;

    settings.mode = mode;
    saveSettings();
    updateAppearance();
  }

  function positionPanel() {
    const rect = button.getBoundingClientRect();
    const panelWidth = Math.min(245, window.innerWidth - 24);

    panel.style.maxHeight = Math.min(
      window.innerHeight * .8,
      500
    ) + "px";

    const panelHeight = panel.offsetHeight || 330;

    let left = rect.left - panelWidth - 12;

    if (left < 12) left = rect.right + 12;

    left = Math.max(
      12,
      Math.min(left, window.innerWidth - panelWidth - 12)
    );

    let top = rect.top + rect.height / 2 - panelHeight / 2;

    top = Math.max(
      12,
      Math.min(top, window.innerHeight - panelHeight - 12)
    );

    panel.style.left = left + "px";
    panel.style.top = top + "px";
  }

  function togglePanel() {
    const open = panel.classList.toggle("open");

    if (open) {
      positionPanel();
      updatePanel();
    }
  }

  button.addEventListener("click", () => {
    if (button.dataset.dragged === "yes") {
      button.dataset.dragged = "no";
      return;
    }

    togglePanel();
  });

  panel.querySelector(".atmo-close").addEventListener("click", () => {
    panel.classList.remove("open");
  });

  panel.addEventListener("click", event => {
    const seasonButton = event.target.closest("[data-season]");
    const modeButton = event.target.closest("[data-mode]");

    if (seasonButton) changeSeason(seasonButton.dataset.season);
    if (modeButton) changeMode(modeButton.dataset.mode);
  });

  let pointerStart = null;

  button.addEventListener("pointerdown", event => {
    const rect = button.getBoundingClientRect();

    pointerStart = {
      x: event.clientX,
      y: event.clientY,
      left: rect.left,
      top: rect.top,
      moved: false
    };

    button.setPointerCapture(event.pointerId);
  });

  button.addEventListener("pointermove", event => {
    if (!pointerStart) return;

    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      pointerStart.moved = true;
    }

    if (!pointerStart.moved) return;

    const left = Math.max(
      0,
      Math.min(window.innerWidth - button.offsetWidth, pointerStart.left + dx)
    );

    const top = Math.max(
      0,
      Math.min(window.innerHeight - button.offsetHeight, pointerStart.top + dy)
    );

    button.style.left = left + "px";
    button.style.top = top + "px";
    button.style.right = "auto";

    settings.left = left;
    settings.top = top;

    if (panel.classList.contains("open")) positionPanel();
  });

  function finishDragging() {
    if (!pointerStart) return;

    if (pointerStart.moved) {
      button.dataset.dragged = "yes";
      saveSettings();
    }

    pointerStart = null;
  }

  button.addEventListener("pointerup", finishDragging);
  button.addEventListener("pointercancel", finishDragging);

  function restoreButtonPosition() {
    if (
      Number.isFinite(settings.left) &&
      Number.isFinite(settings.top)
    ) {
      const left = Math.max(
        0,
        Math.min(window.innerWidth - button.offsetWidth, settings.left)
      );

      const top = Math.max(
        0,
        Math.min(window.innerHeight - button.offsetHeight, settings.top)
      );

      button.style.left = left + "px";
      button.style.top = top + "px";
      button.style.right = "auto";
    }
  }

  window.addEventListener("resize", () => {
    restoreButtonPosition();

    if (panel.classList.contains("open")) {
      positionPanel();
    }
  });

  restoreButtonPosition();
  updatePanel();
  startEffects();

  setInterval(() => {
    if (settings.mode === "auto") updateAppearance();
  }, 60000);

})();
