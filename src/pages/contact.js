import {
  renderBackdrop,
  renderHeader,
  renderContactLoop,
  renderFormSection,
  renderFooter,
  initAnimations,
} from "../render.js";

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
