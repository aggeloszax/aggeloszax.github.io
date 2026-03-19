import {
  renderBackdrop,
  renderHeader,
  renderLegalPage,
  renderFooter,
  initAnimations,
} from "../render.js";
import { site } from "../data/site.js";

const getLegalPage = (pageKey) =>
  site.legal.links.find((link) => link.key === pageKey);

const normalizePath = (pathname) => pathname.replace(/\/+$/, "") || "/";

const getLegalPageKeyFromPath = () => {
  const pathname = normalizePath(window.location.pathname);
  const byPath = site.legal.links.find((link) => {
    const hrefPath = normalizePath(link.href);
    const canonicalPath = normalizePath(link.canonical);

    return pathname === hrefPath || pathname === canonicalPath;
  });

  return byPath ? byPath.key : "";
};

const resolveLegalPageKey = (requestedKey) => {
  const pathKey = getLegalPageKeyFromPath();
  if (pathKey) {
    return pathKey;
  }

  return requestedKey;
};

const setCanonical = (canonicalPath) => {
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute("href", canonicalPath);
  }
};

const applyLegalMeta = (pageKey) => {
  const page = getLegalPage(pageKey);
  if (!page) {
    return;
  }

  document.title = page.title;
  setCanonical(page.canonical);
};

export const mountLegalPage = (pageKey) => {
  const resolvedKey = resolveLegalPageKey(pageKey);
  const app = document.querySelector("#app");

  app.innerHTML = `
    ${renderBackdrop()}
    ${renderHeader()}
    <main>
      ${renderLegalPage(resolvedKey)}
    </main>
    ${renderFooter()}
  `;

  applyLegalMeta(resolvedKey);
  initAnimations();
};
