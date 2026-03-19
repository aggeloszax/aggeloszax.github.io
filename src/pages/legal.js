import {
  renderBackdrop,
  renderHeader,
  renderLegalPage,
  renderFooter,
  initAnimations,
} from "../render.js";

export const mountLegalPage = (pageKey) => {
  const app = document.querySelector("#app");

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
