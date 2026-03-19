import {
  renderBackdrop,
  renderHeader,
  renderProjectsSection,
  renderCertificationsSection,
  renderLanguagesSection,
  renderEducationSection,
  renderFooter,
  initAnimations,
} from "../render.js";

export const mountResumePage = () => {
  document.title = "Resume";

  const app = document.querySelector("#app");

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
};
