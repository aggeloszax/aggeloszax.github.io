import {
  renderBackdrop,
  renderHeader,
  renderHero,
  renderAboutSection,
  renderProjectsSection,
  renderCertificationsSection,
  renderLanguagesSection,
  renderEducationSection,
  renderContactLoop,
  renderFormSection,
  renderFooter,
  initAnimations,
} from "../render.js";

const ROUTE_MAP = {
  "/": {
    title: "Aggelos Zaxariou",
    render: () => {
      const app = document.querySelector("#app");
      if (!app) {
        return;
      }

      app.innerHTML = `
        ${renderBackdrop()}
        ${renderHeader()}
        <main>
          ${renderHero()}
          ${renderAboutSection()}
        </main>
        ${renderFooter()}
      `;

      initAnimations();
    },
  },
  "/resume/": {
    title: "Resume",
    render: () => {
      const app = document.querySelector("#app");
      if (!app) {
        return;
      }

      app.innerHTML = `
        ${renderBackdrop()}
        ${renderHeader()}
        <main>
          ${renderEducationSection()}
          ${renderLanguagesSection()}
          ${renderCertificationsSection()}
          ${renderProjectsSection()}
        </main>
        ${renderFooter()}
      `;

      initAnimations();
    },
  },
  "/contact/": {
    title: "Contact",
    render: () => {
      const app = document.querySelector("#app");
      if (!app) {
        return;
      }

      app.innerHTML = `
        ${renderBackdrop()}
        ${renderHeader()}
        <main>
          ${renderContactLoop()}
          ${renderFormSection({
            className: "section",
          })}
        </main>
        ${renderFooter()}
      `;

      initAnimations();
    },
  },
};

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const cleanPath = pathname.endsWith("/") ? pathname : `${pathname}/`;

  if (cleanPath === "/resume/" || cleanPath === "/contact/") {
    return cleanPath;
  }

  return "/";
};

const renderRoute = (pathname) => {
  const normalizedPath = normalizePath(pathname);
  const route = ROUTE_MAP[normalizedPath] || ROUTE_MAP["/"];

  document.title = route.title;
  route.render();
};

const navigateTo = (pathname) => {
  const normalizedPath = normalizePath(pathname);

  if (window.location.pathname !== normalizedPath) {
    window.history.pushState(null, "", normalizedPath);
  }

  renderRoute(normalizedPath);
};

const handleNavClick = (event) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const link = event.target.closest("a.nav-rich-link[href]");
  if (!link) {
    return;
  }

  const href = link.getAttribute("href");
  if (!href) {
    return;
  }

  const url = new URL(href, window.location.origin);
  if (url.origin !== window.location.origin) {
    return;
  }

  const normalizedPath = normalizePath(url.pathname);
  if (!["/", "/resume/", "/contact/"].includes(normalizedPath)) {
    return;
  }

  event.preventDefault();
  navigateTo(normalizedPath);
};

export const bootApp = () => {
  if (!document.body.dataset.internalRouterBound) {
    document.addEventListener("click", handleNavClick);
    window.addEventListener("popstate", () => {
      renderRoute(window.location.pathname);
    });
    document.body.dataset.internalRouterBound = "true";
  }

  renderRoute(window.location.pathname);
};
