import "../styles.css";
import {
  renderBackdrop,
  renderHeader,
  renderProjectsSection,
  renderCertificationsSection,
  renderLanguagesSection,
  renderEducationSection,
  renderFooter,
  initAnimations,
} from "../render";

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
