(() => {
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll("[data-theme-toggle]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const header = document.querySelector(".site-header");

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    themeButtons.forEach((btn) => {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    });
  };

  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    setTheme(storedTheme);
  } else {
    setTheme("light");
  }

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      setTheme(next);
    });
  });

  if (navToggle && header) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      header.classList.toggle("nav-open");
    });
  }

  const navLinks = document.querySelectorAll(".nav-panel a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (header && header.classList.contains("nav-open")) {
        header.classList.remove("nav-open");
        if (navToggle) {
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Entrance animation observer
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animTargets = document.querySelectorAll(
    "header .nav-bar, header .hero, section, .section, .card, .card-grid > *, .card-media, .card-media img, .hero-info, .hero-meta, .btn, .btn-group, .split-card, .gallery-grid img, .auth-card, .table-wrap, .notice, .countdown .card, .admin-content section, .admin-content .card, .section-title, footer, .footer-grid > *, .stat-card, form, iframe"
  );

  animTargets.forEach((el) => {
    el.dataset.anim = "bloom";
    el.classList.add("will-animate");
  });

  if (!prefersReduced && "IntersectionObserver" in window) {
    animTargets.forEach((el, idx) => {
      el.style.setProperty("--anim-delay", `${80 + (idx % 6) * 10}ms`);
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    animTargets.forEach((el) => observer.observe(el));
  } else {
    animTargets.forEach((el) => el.classList.add("animate-in"));
  }
})();
