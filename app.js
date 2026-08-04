const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let prefersReducedMotion = motionQuery.matches;

const revealItems = document.querySelectorAll(".reveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.07 }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 55}ms`;
    revealObserver.observe(item);
  });
}

const navLinks = [...document.querySelectorAll(".site-nav a")];
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-20% 0px -64%", threshold: [0, 0.08, 0.3] }
  );

  navSections.forEach((section) => sectionObserver.observe(section));
}

const portraitCanvas = document.querySelector("#signal-portrait");
const portraitStage = portraitCanvas?.closest(".portrait-radar");

if (portraitCanvas && portraitStage) {
  const context = portraitCanvas.getContext("2d", { alpha: true });
  const baseCanvas = document.createElement("canvas");
  const baseContext = baseCanvas.getContext("2d", { alpha: true });
  const color = {
    night: "#10110e",
    paper: "#f0eadb",
    acid: "#b9ff18",
    hot: "#ff5524",
    sky: "#29a8ed"
  };

  let points = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let isVisible = true;
  let animationFrame = 0;
  let lastFrame = 0;
  let startTime = performance.now();

  const hash = (x, y, salt = 0) => {
    const value = Math.sin(x * 12.9898 + y * 78.233 + salt * 37.719) * 43758.5453;
    return value - Math.floor(value);
  };

  const ellipse = (x, y, cx, cy, rx, ry) => {
    const dx = (x - cx) / rx;
    const dy = (y - cy) / ry;
    return dx * dx + dy * dy <= 1;
  };

  const isPortraitPoint = (x, y) => {
    const head = ellipse(x, y, 0.52, 0.38, 0.19, 0.285);
    const earLeft = ellipse(x, y, 0.325, 0.4, 0.035, 0.073);
    const earRight = ellipse(x, y, 0.715, 0.4, 0.035, 0.073);
    const neck = x > 0.44 && x < 0.6 && y > 0.59 && y < 0.75;
    const shoulderWidth = 0.16 + Math.max(0, y - 0.67) * 1.22;
    const shoulders = y > 0.67 && y < 0.93 && Math.abs(x - 0.52) < shoulderWidth;
    if (!(head || earLeft || earRight || neck || shoulders)) return false;

    const leftEye = ellipse(x, y, 0.455, 0.37, 0.034, 0.018);
    const rightEye = ellipse(x, y, 0.585, 0.37, 0.034, 0.018);
    const mouth = ellipse(x, y, 0.52, 0.515, 0.064, 0.014);
    const noseGap = Math.abs(x - 0.52) < 0.011 && y > 0.39 && y < 0.475;
    if (leftEye || rightEye || mouth || noseGap) return false;

    const hair = head && y < 0.225 + 0.035 * Math.sin((x - 0.35) * 24);
    const jawShadow = head && y > 0.52 && Math.abs(x - 0.52) > 0.125;
    const keepChance = hair ? 0.96 : jawShadow ? 0.58 : 0.78;
    return hash(x * 1000, y * 1000, 3) < keepChance;
  };

  const makePoints = () => {
    const gap = width < 520 ? 7.2 : width < 760 ? 6.4 : 5.8;
    const result = [];
    for (let y = gap; y < height - gap; y += gap) {
      for (let x = gap; x < width - gap; x += gap) {
        const nx = x / width;
        const ny = y / height;
        if (!isPortraitPoint(nx, ny)) continue;
        const jitterX = (hash(x, y, 1) - 0.5) * gap * 0.42;
        const jitterY = (hash(x, y, 2) - 0.5) * gap * 0.42;
        result.push({
          x: x + jitterX,
          y: y + jitterY,
          radius: 0.65 + hash(x, y, 4) * 1.25,
          phase: hash(x, y, 5) * Math.PI * 2,
          base: 0.09 + hash(x, y, 6) * 0.13
        });
      }
    }
    return result;
  };

  const drawRadarBase = () => {
    baseContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    baseContext.clearRect(0, 0, width, height);
    const cx = width * 0.52;
    const cy = height * 0.48;
    const radius = Math.max(width, height) * 0.57;

    baseContext.save();
    baseContext.strokeStyle = "rgba(240, 234, 219, 0.12)";
    baseContext.lineWidth = 1;
    for (const scale of [0.23, 0.46, 0.69, 0.92]) {
      baseContext.beginPath();
      baseContext.arc(cx, cy, radius * scale, 0, Math.PI * 2);
      baseContext.stroke();
    }

    baseContext.setLineDash([3, 7]);
    baseContext.strokeStyle = "rgba(240, 234, 219, 0.08)";
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
      baseContext.beginPath();
      baseContext.moveTo(cx, cy);
      baseContext.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      baseContext.stroke();
    }
    baseContext.restore();

    baseContext.save();
    for (const point of points) {
      baseContext.globalAlpha = point.base;
      baseContext.fillStyle = color.paper;
      baseContext.beginPath();
      baseContext.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      baseContext.fill();
    }
    baseContext.restore();
  };

  const drawFrame = (time = performance.now(), fixed = false) => {
    if (!context || !width || !height) return;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    context.drawImage(baseCanvas, 0, 0, width, height);

    const cx = width * 0.52;
    const cy = height * 0.48;
    const radius = Math.max(width, height) * 0.59;
    const angle = fixed ? Math.PI * 1.72 : ((time - startTime) / 8800) * Math.PI * 2;
    const sweepWidth = Math.PI * 0.48;

    context.save();
    const beam = context.createRadialGradient(cx, cy, 0, cx, cy, radius);
    beam.addColorStop(0, "rgba(185, 255, 24, 0.2)");
    beam.addColorStop(0.72, "rgba(185, 255, 24, 0.07)");
    beam.addColorStop(1, "rgba(185, 255, 24, 0)");
    context.fillStyle = beam;
    context.beginPath();
    context.moveTo(cx, cy);
    context.arc(cx, cy, radius, angle - sweepWidth, angle);
    context.closePath();
    context.fill();

    context.strokeStyle = "rgba(185, 255, 24, 0.82)";
    context.lineWidth = 1.2;
    context.beginPath();
    context.moveTo(cx, cy);
    context.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    context.stroke();
    context.restore();

    context.save();
    context.shadowColor = "rgba(185, 255, 24, 0.6)";
    context.shadowBlur = width < 520 ? 4 : 7;
    for (const point of points) {
      const pointAngle = Math.atan2(point.y - cy, point.x - cx);
      const normalizedAngle = (pointAngle + Math.PI * 2) % (Math.PI * 2);
      const normalizedSweep = (angle + Math.PI * 2) % (Math.PI * 2);
      const distanceBehind = (normalizedSweep - normalizedAngle + Math.PI * 2) % (Math.PI * 2);
      const withinTrail = distanceBehind < sweepWidth * 1.75;
      if (!withinTrail && !fixed) continue;

      const decay = fixed
        ? 0.36 + Math.max(0, Math.cos(pointAngle - angle)) * 0.42
        : Math.exp(-distanceBehind / (sweepWidth * 0.62));
      const pulse = fixed ? 1 : 0.9 + Math.sin(time * 0.005 + point.phase) * 0.1;
      context.globalAlpha = Math.min(1, 0.16 + decay * 0.88) * pulse;
      context.fillStyle = decay > 0.62 ? color.acid : color.paper;
      context.beginPath();
      context.arc(point.x, point.y, point.radius * (1 + decay * 0.46), 0, Math.PI * 2);
      context.fill();
    }
    context.restore();

    context.save();
    context.fillStyle = color.acid;
    context.globalAlpha = 0.95;
    context.beginPath();
    context.arc(cx, cy, 4, 0, Math.PI * 2);
    context.fill();
    context.restore();
  };

  const animate = (time) => {
    if (!isVisible || document.hidden || prefersReducedMotion) return;
    if (time - lastFrame >= 1000 / 30) {
      drawFrame(time);
      lastFrame = time;
    }
    animationFrame = requestAnimationFrame(animate);
  };

  const restartAnimation = () => {
    cancelAnimationFrame(animationFrame);
    if (prefersReducedMotion) {
      drawFrame(performance.now(), true);
      return;
    }
    if (isVisible && !document.hidden) animationFrame = requestAnimationFrame(animate);
  };

  const resizePortrait = () => {
    const bounds = portraitStage.getBoundingClientRect();
    const nextWidth = Math.max(1, Math.round(bounds.width));
    const nextHeight = Math.max(1, Math.round(bounds.height));
    if (nextWidth === width && nextHeight === height) return;

    width = nextWidth;
    height = nextHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    portraitCanvas.width = Math.round(width * dpr);
    portraitCanvas.height = Math.round(height * dpr);
    baseCanvas.width = portraitCanvas.width;
    baseCanvas.height = portraitCanvas.height;
    points = makePoints();
    drawRadarBase();
    drawFrame(performance.now(), prefersReducedMotion);
    portraitStage.classList.add("is-canvas-ready");
    restartAnimation();
  };

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      restartAnimation();
    },
    { rootMargin: "120px 0px", threshold: 0 }
  );

  visibilityObserver.observe(portraitStage);
  document.addEventListener("visibilitychange", restartAnimation);
  motionQuery.addEventListener("change", (event) => {
    prefersReducedMotion = event.matches;
    restartAnimation();
  });

  if ("ResizeObserver" in window) {
    new ResizeObserver(resizePortrait).observe(portraitStage);
  } else {
    window.addEventListener("resize", resizePortrait, { passive: true });
  }

  resizePortrait();
}

const printButton = document.querySelector("#print-resume");
printButton?.addEventListener("click", () => window.print());

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear().toString();
