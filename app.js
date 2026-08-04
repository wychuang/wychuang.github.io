const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealItems = [...document.querySelectorAll(".reveal")];

if (reducedMotion.matches || !("IntersectionObserver" in window)) {
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
    { rootMargin: "0px 0px -8%", threshold: 0.08 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const navigationLinks = [...document.querySelectorAll(".site-nav a")];
const navigationSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const navigationObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) return;

      navigationLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visibleEntry.target.id}`);
      });
    },
    { rootMargin: "-22% 0px -62%", threshold: [0.05, 0.2, 0.5] }
  );

  navigationSections.forEach((section) => navigationObserver.observe(section));
}

document.querySelector("#print-resume")?.addEventListener("click", () => window.print());

const yearTarget = document.querySelector("#current-year");
if (yearTarget) yearTarget.textContent = String(new Date().getFullYear());
