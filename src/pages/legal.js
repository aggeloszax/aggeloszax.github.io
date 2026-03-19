import {
  renderBackdrop,
  renderHeader,
  renderLegalPage,
  renderFooter,
  initAnimations,
} from "../render.js";

const legalPageTitles = {
  cookies: "Cookie Policy",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
};

export const mountLegalPage = (pageKey) => {
  const app = document.querySelector("#app");
  document.title = legalPageTitles[pageKey] || "Legal";

  app.innerHTML = `
    ${renderBackdrop()}
    ${renderHeader()}
    <main>
      ${renderLegalPage(pageKey)}
    </main>
    ${renderFooter()}
  `;

  initAnimations();
};
