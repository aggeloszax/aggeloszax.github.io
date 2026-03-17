import "../styles.css";
import {
  renderBackdrop,
  renderHeader,
  renderContactLoop,
  renderFormSection,
  renderFooter,
  initAnimations,
} from "../render";

const app = document.querySelector("#app");

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
