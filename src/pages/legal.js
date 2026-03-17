import "../styles.css";
import {
  renderBackdrop,
  renderHeader,
  renderLegalPage,
  renderFooter,
  initAnimations,
} from "../render";

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
