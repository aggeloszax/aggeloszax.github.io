import {
  renderBackdrop,
  renderHeader,
  renderHero,
  renderAboutSection,
  renderFooter,
  initAnimations,
} from "../render.js";

export const mountHomePage = () => {
  document.title = "Aggelos Zaxariou";

  const app = document.querySelector("#app");

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
};
