import { mountHomePage } from "./pages/home.js";
import { mountResumePage } from "./pages/resume.js";
import { mountContactPage } from "./pages/contact.js";
import { mountCookiesPage } from "./pages/cookies.js";
import { mountPrivacyPage } from "./pages/privacy.js";
import { mountTermsPage } from "./pages/terms.js";
import { renderIntroLoader } from "./render.js";

const routes = {
  home: {
    title: "Aggelos Zaxariou",
    render: mountHomePage,
  },
  contact: {
    title: "Contact",
    render: mountContactPage,
  },
  resume: {
    title: "Resume",
    render: mountResumePage,
  },
  cookies: {
    title: "Cookie Policy",
    render: mountCookiesPage,
  },
  privacy: {
    title: "Privacy Policy",
    render: mountPrivacyPage,
  },
  terms: {
    title: "Terms of Use",
    render: mountTermsPage,
  },
};

const getRouteSegments = (path) => {
  const normalizedPath = path.toLowerCase().split("?")[0].split("#")[0];
  const cleaned = normalizedPath
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.replace(/\.html$/i, ""))
    .filter(Boolean);

  if (cleaned.length === 0) {
    return ["home"];
  }

  if (cleaned[cleaned.length - 1] === "index") {
    return cleaned.slice(0, -1);
  }

  return cleaned;
};

const getPageKeyFromPath = (path) => {
  const forced = window.__PAGE_KEY__;
  if (forced && routes[forced]) {
    return forced;
  }

  const segments = getRouteSegments(path);
  const key = segments.length ? segments[segments.length - 1] : "home";

  return routes[key] ? key : "home";
};

const getCanonicalPath = (key) => (key === "home" ? "/" : `/${key}/`);

const ensureIntroLoader = () => {
  let loader = document.querySelector("[data-intro-loader]");

  if (!loader) {
    document.body.insertAdjacentHTML("beforeend", renderIntroLoader());
    loader = document.querySelector("[data-intro-loader]");
  }

  return loader;
};

const runIntroLoader = () => {
  const loader = ensureIntroLoader();
  const fill = loader?.querySelector("[data-loader-fill]");
  const percent = loader?.querySelector("[data-loader-percent]");

  if (!loader || !fill || !percent) {
    return;
  }

  document.body.classList.add("is-intro-loading");

  let current = 1;
  let pageLoaded = document.readyState === "complete";
  let finished = false;

  const paint = (value) => {
    fill.style.width = `${value}%`;
    percent.textContent = `${value}%`;
  };

  const complete = () => {
    if (finished) {
      return;
    }

    finished = true;
    paint(100);
    loader.classList.add("is-complete");

    window.setTimeout(() => {
      document.body.classList.remove("is-intro-loading");
      loader.remove();
    }, 650);
  };

  const tick = () => {
    const limit = pageLoaded ? 100 : 99;

    if (current < limit) {
      current += 1;
      paint(current);
    }

    if (pageLoaded && current >= 100) {
      window.clearInterval(intervalId);
      complete();
    }
  };

  paint(current);

  const intervalId = window.setInterval(tick, 24);

  const markLoaded = () => {
    pageLoaded = true;
  };

  if (!pageLoaded) {
    window.addEventListener("load", markLoaded, { once: true });
  }

  window.setTimeout(() => {
    pageLoaded = true;
  }, 2400);
};

const mountCurrentRoute = (path = window.location.pathname) => {
  const key = getPageKeyFromPath(path);
  const route = routes[key] || routes.home;
  const canonicalPath = getCanonicalPath(key);

  if (window.location.pathname !== canonicalPath) {
    window.history.replaceState({ key, title: route.title }, "", canonicalPath);
  }

  document.title = route.title;
  route.render();
};

const handleLinkClick = (event) => {
  const anchor = event.target.closest("a");

  if (!anchor || anchor.target || anchor.hasAttribute("download")) {
    return;
  }

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return;
  }

  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) {
    return;
  }

  const key = getPageKeyFromPath(url.pathname);
  if (!routes[key]) {
    return;
  }

  event.preventDefault();

  const route = routes[key];
  const nextPath = getCanonicalPath(key);

  if (nextPath !== window.location.pathname) {
    window.history.pushState({ key, title: route.title }, route.title, nextPath);
  }

  document.title = route.title;
  mountCurrentRoute(nextPath);
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

document.body.addEventListener("click", handleLinkClick);
window.addEventListener("popstate", () => mountCurrentRoute(window.location.pathname));

mountCurrentRoute(window.location.pathname);
runIntroLoader();
