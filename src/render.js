import { site } from "./data/site.js";

const externalAttrs = 'target="_blank" rel="noreferrer"';
const consentCookieName = "ag_cookie_consent";

const legalIcons = {
  cookie: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M14.5 2.5a4 4 0 0 0 5 5A8.5 8.5 0 1 1 12 2a4 4 0 0 0 2.5.5Z"></path>
      <circle cx="8.5" cy="10" r="1.1"></circle>
      <circle cx="14.2" cy="11.5" r="1.1"></circle>
      <circle cx="10.8" cy="15.4" r="1.1"></circle>
    </svg>
  `,
  privacy: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2.5 5 5.5v5.8c0 4.5 2.8 8.7 7 10.2 4.2-1.5 7-5.7 7-10.2V5.5l-7-3Z"></path>
      <path d="M9.4 11.3V9.8a2.6 2.6 0 1 1 5.2 0v1.5"></path>
      <rect x="8.5" y="11.3" width="7" height="5.4" rx="1.3"></rect>
    </svg>
  `,
  terms: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 3.5h8.6L19 6.9v13.6H7z"></path>
      <path d="M15.6 3.5v3.4H19"></path>
      <path d="M9.4 10.2h6.2"></path>
      <path d="M9.4 13.2h6.2"></path>
      <path d="M9.4 16.2h4.4"></path>
    </svg>
  `,
};

const navIcons = {
  home: {
    desktop: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 10.3 12 4.8l7 5.5"></path>
        <path d="M7.2 9.8v8.8h9.6V9.8"></path>
        <path d="M10.2 18.6v-4.3h3.6v4.3"></path>
      </svg>
    `,
    mobile: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 4.2 4.6 10v8.8c0 .6.4 1 1 1h4.3v-5.4c0-.6.4-1 1-1h2.2c.6 0 1 .4 1 1v5.4h4.3c.6 0 1-.4 1-1V10L12 4.2Zm0 2.1 5.4 4.2v7.3h-1.9v-4.7c0-1-.8-1.8-1.8-1.8h-3.4c-1 0-1.8.8-1.8 1.8v4.7H6.6v-7.3L12 6.3Z"></path>
      </svg>
    `,
  },
  resume: {
    desktop: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7 3.8h7.9l2.9 2.9v13.5H7z"></path>
        <path d="M14.9 3.8v2.9h2.9"></path>
        <path d="M9.4 10.1h5.2"></path>
        <path d="M9.4 13.2h5.2"></path>
        <path d="M9.4 16.3h3.8"></path>
        <circle cx="10.1" cy="7.4" r="1"></circle>
      </svg>
    `,
    mobile: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7 3.8c0-.5.4-.9.9-.9h7l3.1 3.1v13.2c0 .5-.4.9-.9.9H7.9c-.5 0-.9-.4-.9-.9V3.8Zm2 .9v13.6h7.2V7.6h-2.2c-.6 0-1-.4-1-1V4.7H9Zm5.8 0v1.1h1.1l-1.1-1.1ZM10.4 10h4.8v1.4h-4.8V10Zm0 3.1h4.8v1.4h-4.8v-1.4Zm0 3.1h3.4v1.4h-3.4v-1.4Z"></path>
      </svg>
    `,
  },
  contact: {
    desktop: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4.8 8.1 12 4.7l7.2 3.4v7.8L12 19.3 4.8 15.9z"></path>
        <path d="M8.7 10.4h6.6"></path>
        <path d="M8.7 13h4.7"></path>
      </svg>
    `,
    mobile: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5.2 5.8h13.6c1.2 0 2.2 1 2.2 2.2V16c0 1.2-1 2.2-2.2 2.2H5.2C4 18.2 3 17.2 3 16V8c0-1.2 1-2.2 2.2-2.2Zm0 1.8c-.2 0-.4.1-.5.2l7 5.3c.2.2.6.2.8 0l7-5.3c-.1-.1-.3-.2-.5-.2H5.2Zm14 8.8c.2 0 .4-.2.4-.4V9.6l-6.2 4.7c-.8.6-1.9.6-2.7 0L4.4 9.6V16c0 .2.2.4.4.4h14.4Z"></path>
      </svg>
    `,
  },
};

const getLegalPage = (pageKey) =>
  site.legal.links.find((link) => link.key === pageKey);

const normalizeConsentValue = (value) => {
  if (value === "accept" || value === "accepted") {
    return "accepted";
  }

  if (value === "decline" || value === "declined") {
    return "declined";
  }

  return "";
};

const readConsentCookie = () => {
  if (typeof document === "undefined") {
    return "";
  }

  const value = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${consentCookieName}=`));

  return value ? normalizeConsentValue(decodeURIComponent(value.split("=")[1])) : "";
};

const writeConsentCookie = (value) => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${consentCookieName}=${encodeURIComponent(
    normalizeConsentValue(value)
  )}; Max-Age=31536000; Path=/; SameSite=Lax`;
};

export const renderBackdrop = () => `
  <div class="backdrop" aria-hidden="true">
    <div class="orb orb-one"></div>
    <div class="orb orb-two"></div>
    <div class="orb orb-three"></div>
    <div class="grid-overlay"></div>
  </div>
`;

const renderSocials = (socials) =>
  socials
    .map(
      (social) => `
        <a class="social-link" href="${social.href}" ${externalAttrs} aria-label="${social.label}">
          <img src="${social.icon}" alt="" loading="lazy" />
        </a>
      `
    )
    .join("");

const renderLegalIcon = (icon) => legalIcons[icon] || legalIcons.terms;

const renderLegalLinks = (links, activeKey = "") =>
  links
    .map(
      (link) => `
        <a
          class="legal-link${link.key === activeKey ? " is-active" : ""}"
          href="${link.href}"
          aria-label="${link.label}"
        >
          <span class="legal-link-icon">${renderLegalIcon(link.icon)}</span>
          <span>${link.label}</span>
        </a>
      `
    )
    .join("");

const renderNavLink = (href, label, icon) => `
  <a class="nav-highlight nav-rich-link" href="${href}" aria-label="${label}" title="${label}">
    <span class="nav-icon-badge">
      <span class="nav-icon-desktop">${navIcons[icon].desktop}</span>
      <span class="nav-icon-mobile">${navIcons[icon].mobile}</span>
    </span>
    <span class="nav-link-label">${label}</span>
  </a>
`;

const renderCookieBannerIcon = () => `
  <div class="cookie-banner-icon" aria-hidden="true">
    ${renderLegalIcon("cookie")}
  </div>
`;

const renderTagline = (items) =>
  items
    .map(
      (item, index) => `
        <a class="tagline-link" href="${item.href}" ${externalAttrs}>
          ${item.text}
        </a>
        ${index < items.length - 1 ? '<span class="tagline-sep">&amp;</span>' : ""}
      `
    )
    .join("");

const renderProjects = (projects) =>
  projects
    .map((project) => {
      const clickable = project.href && project.href !== "#";
      return clickable
        ? `
        <a class="card project-card" href="${project.href}" ${externalAttrs}>
          <div class="icon-shell">
            <img src="${project.icon}" alt="" loading="lazy" />
          </div>
          <h3>${project.title}</h3>
        </a>
      `
        : `
        <div class="card project-card" role="button" aria-disabled="true">
          <div class="icon-shell">
            <img src="${project.icon}" alt="" loading="lazy" />
          </div>
          <h3>${project.title}</h3>
        </div>
      `;
    })
    .join("");

const renderCertificationIcons = (icons) =>
  icons
    .map(
      (icon) => `
        <a class="icon-badge" href="${icon.href}" ${externalAttrs}>
          <img src="${icon.src}" alt="" loading="lazy" />
        </a>
      `
    )
    .join("");

const renderCertifications = (items) =>
  items
    .map((item) => {
      const clickable = item.cta && item.cta.href && item.cta.href !== "#";
      return `
        <article class="card cert-card">
          <div>
            <h3>${item.title}</h3>
            <p class="cert-subtitle">${item.subtitle}</p>
            ${
              Array.isArray(item.description)
                ? `<ul class="cert-list">
                    ${item.description
                      .map((point) => `<li>${point}</li>`)
                      .join("")}
                  </ul>`
                : `<p class="cert-desc">${item.description}</p>`
            }
          </div>
          <div class="cert-actions">
            ${
              clickable
                ? `<a class="btn btn-ghost" href="${item.cta.href}" ${externalAttrs}>${item.cta.label}</a>`
                : `<button class="btn btn-ghost" disabled>${item.cta.label}</button>`
            }
            <div class="icon-row">
              ${renderCertificationIcons(item.icons)}
            </div>
          </div>
        </article>
      `;
    })
    .join("");

const renderLanguages = (items, logos) =>
  items
    .map((item, index) => {
      const logo = logos
        ? index === 0
          ? logos[1]
          : logos[0]
        : null;

      return `
        <div class="card language-card">
          <div class="language-header">
            <h3>${item.name}</h3>
            ${
              logo
                ? `
              <a class="language-icon" href="${logo.href}" ${externalAttrs}>
                <img src="${logo.src}" alt="" loading="lazy" />
              </a>
            `
                : ""
            }
          </div>
          <p>${item.level}</p>
        </div>
      `;
    })
    .join("");

const renderEducation = (items) =>
  items
    .map(
      (item) => `
        <article class="card education-card">
          <div class="education-head">
            <div>
              <h3>${item.school}</h3>
              <p class="education-period">${item.period}</p>
            </div>
            <a class="icon-badge" href="${item.icon.href}" ${externalAttrs}>
              <img src="${item.icon.src}" alt="" loading="lazy" />
            </a>
          </div>
          <h4>${item.program}</h4>
          <p>${item.description}</p>
          <a class="inline-link" href="${item.locationHref}" ${externalAttrs}>
            ${item.locationLabel}
          </a>
        </article>
      `
    )
    .join("");

export const renderHeader = () => `
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="${site.header.home}" ${externalAttrs} aria-label="${site.meta.description}">
        <img src="${site.header.logo}" alt="${site.meta.description}" />
      </a>
      <nav class="site-nav">
        ${renderNavLink("/", "Home", "home")}
        ${renderNavLink("/resume/", "Resume", "resume")}
        ${renderNavLink("/contact/", "Contact", "contact")}
      </nav>
      <div class="header-socials">
        ${renderSocials(site.header.socials)}
      </div>
    </div>
  </header>
`;

export const renderHero = () => `
  <section class="hero section" id="home">
    <div class="container hero-grid">
      <div class="hero-content reveal">
        <h1>${site.hero.headline}</h1>
        <div class="tagline">${renderTagline(site.hero.tagline)}</div>
      </div>
      <div class="hero-media reveal">
        <div class="hero-card">
          <img src="${site.hero.image.src}" alt="${site.hero.image.alt}" />
        </div>
      </div>
    </div>
  </section>
`;

export const renderAboutSection = () => `
  <section class="section about" id="about">
    <div class="container">
      <div class="about-card reveal">
        <div class="about-copy">
          <p class="about-eyebrow">AGGELOS ZAXARIOU</p>
          <h2>${site.about.title}</h2>
          <p>${site.about.intro}</p>
        </div>
        <div class="about-highlights">
          ${site.about.highlights
            .map(
              (item) => `
              <div class="highlight">
                <span class="highlight-dot"></span>
                <span>${item}</span>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    </div>
  </section>
`;

export const renderProjectsSection = () => `
  <section class="section projects" id="projects">
    <div class="container">
      <div class="section-head reveal">
        <h2>${site.projects.title}</h2>
      </div>
      <div class="project-controls">
        <button class="project-nav" type="button" data-direction="prev" aria-label="Scroll projects left">
          ‹
        </button>
        <div class="project-track" aria-label="Projects list">
          <div class="grid project-grid">
            ${renderProjects(site.projects.items)}
          </div>
        </div>
        <button class="project-nav" type="button" data-direction="next" aria-label="Scroll projects right">
          ›
        </button>
      </div>
    </div>
  </section>
`;

export const renderCertificationsSection = () => `
  <section class="section section-alt" id="certifications">
    <div class="container">
      <div class="section-head reveal">
        <h2>${site.certifications.title}</h2>
      </div>
      <div class="cert-controls reveal">
        <button class="cert-nav" type="button" data-direction="prev" aria-label="Scroll certifications left">
          ‹
        </button>
        <div class="cert-track" aria-label="Certifications list">
          <div class="grid cert-grid">
            ${renderCertifications(site.certifications.items)}
          </div>
        </div>
        <button class="cert-nav" type="button" data-direction="next" aria-label="Scroll certifications right">
          ›
        </button>
      </div>
    </div>
  </section>
`;

export const renderLanguagesSection = () => `
  <section class="section" id="languages">
    <div class="container">
      <div class="section-head reveal">
        <div class="section-title">
          <h2>${site.languages.title}</h2>
        </div>
      </div>
      <div class="grid language-grid reveal">
        ${renderLanguages(site.languages.items, site.languages.logos)}
      </div>
      <div class="work-timeline reveal">
        <div class="work-line"></div>
        ${site.languages.work
          .map((item) => {
            const workImage = item.image || site.languages.workImage;

            return `
            <article class="work-item">
              <div class="work-marker">
                <span class="work-dot"></span>
                <span class="work-pulse"></span>
              </div>
              <div class="work-card">
                <div class="work-card-content">
                  <div class="work-head">
                    <h3>${item.title}</h3>
                    <span class="work-period">${item.period}</span>
                  </div>
                  <p>${item.description}</p>
                </div>
                <a class="work-card-logo" href="${workImage.href}" ${externalAttrs}>
                  <img src="${workImage.src}" alt="${workImage.alt}" loading="lazy" />
                </a>
              </div>
            </article>
          `;
          })
          .join("")}
      </div>
    </div>
  </section>
`;

export const renderEducationSection = () => `
  <section class="section section-alt" id="education">
    <div class="container">
      <div class="section-head reveal">
        <h2>${site.education.title}</h2>
      </div>
      <div class="education-timeline reveal">
        <div class="timeline-line"></div>
        ${site.education.items
          .map(
            (item) => `
            <article class="timeline-item">
              <div class="timeline-marker">
                <span class="timeline-dot"></span>
                <span class="timeline-ring"></span>
              </div>
              <div class="timeline-card">
                <div class="education-head">
                  <div>
                    <h3>${item.school}</h3>
                    <p class="education-period">${item.period}</p>
                  </div>
                  <a class="icon-badge" href="${item.icon.href}" ${externalAttrs}>
                    <img src="${item.icon.src}" alt="" loading="lazy" />
                  </a>
                </div>
                <h4>${item.program}</h4>
                <p>${item.description}</p>
                <a class="inline-link" href="${item.locationHref}" ${externalAttrs}>
                  ${item.locationLabel}
                </a>
              </div>
            </article>
          `
          )
          .join("")}
      </div>
    </div>
  </section>
`;

export const renderContactSection = () => `
  <section class="section" id="contact">
    <div class="container contact-grid">
      <div class="contact-card reveal">
        <h2>${site.contact.title}</h2>
        <p class="contact-subtitle">${site.contact.subtitle}</p>
        <div class="contact-item">
          <span class="contact-icon">
            <img src="${site.contact.phone.icon}" alt="" loading="lazy" />
          </span>
          <div>
            <p>${site.contact.phone.label}</p>
            <a href="${site.contact.phone.href}">${site.contact.phone.value}</a>
          </div>
        </div>
        <div class="contact-item">
          <span class="contact-icon">
            <img src="${site.contact.email.icon}" alt="" loading="lazy" />
          </span>
          <div>
            <p>${site.contact.email.label}</p>
            <a href="${site.contact.email.href}">${site.contact.email.value}</a>
          </div>
        </div>
      </div>
      <div class="contact-media reveal" style="background-image: url('${site.contact.image}')"></div>
    </div>
  </section>
`;

export const renderContactLoop = () => `
  <section class="section contact-loop" id="contact-loop">
    <div class="container">
      <div class="contact-loop-track">
        <div class="contact-loop-row">
          <span class="loop-label">Phone</span>
          <a class="loop-value" href="${site.contact.phone.href}">${site.contact.phone.value}</a>
          <span class="loop-divider">•</span>
          <span class="loop-label">Email</span>
          <a class="loop-value" href="${site.contact.email.href}">${site.contact.email.value}</a>
          <span class="loop-divider">•</span>
          <span class="loop-label">Phone</span>
          <a class="loop-value" href="${site.contact.phone.href}">${site.contact.phone.value}</a>
          <span class="loop-divider">•</span>
          <span class="loop-label">Email</span>
          <a class="loop-value" href="${site.contact.email.href}">${site.contact.email.value}</a>
        </div>
      </div>
    </div>
  </section>
`;

export const renderFormSection = (options = {}) => {
  const className = options.className ?? "section section-alt";
  const styleAttr = options.withContactBackdrop
    ? ` style="--contact-bg: url('${site.contact.image}')"`
    : "";

  return `
  <section class="${className}" id="get-in-touch"${styleAttr}>
    <div class="container form-grid">
      <div class="form-card reveal">
        <h2>${site.form.title}</h2>
        <form action="#" data-action="${site.form.action}" method="POST" class="contact-form" onsubmit="return false">
          <label>
            ${site.form.fields.name.label}
            <input type="text" name="name" placeholder="${site.form.fields.name.placeholder}" required />
          </label>
          <label>
            ${site.form.fields.email.label}
            <input type="email" name="email" placeholder="${site.form.fields.email.placeholder}" required />
          </label>
          <label>
            ${site.form.fields.message.label}
            <textarea name="message" rows="4" placeholder="${site.form.fields.message.placeholder}" required></textarea>
          </label>
          <button class="btn" type="submit">${site.form.submitLabel}</button>
          <p class="form-message" aria-live="polite">${site.form.successMessage}</p>
          <p class="form-message form-error" aria-live="polite">${site.form.errorMessage}</p>
        </form>
      </div>
      <div class="form-illustration reveal">
        <img src="${site.form.illustration}" alt="" loading="lazy" />
      </div>
    </div>
  </section>
`;
};

export const renderLegalPage = (pageKey) => {
  const page = getLegalPage(pageKey);

  if (!page) {
    return "";
  }

  return `
  <section class="section legal-page" id="top">
    <div class="container legal-layout">
      <div class="legal-hero-card reveal">
        <p class="about-eyebrow">${site.legal.navLabel}</p>
        <h1>${page.title}</h1>
        <p class="legal-intro">${page.intro}</p>
        <div class="legal-meta">
          <span>Last updated</span>
          <strong>${page.updated}</strong>
        </div>
        <div class="legal-nav" aria-label="${site.legal.navLabel}">
          ${renderLegalLinks(site.legal.links, page.key)}
        </div>
      </div>
      <div class="legal-grid">
        ${page.sections
          .map(
            (section) => `
              <article class="card legal-card reveal">
                <h2>${section.heading}</h2>
                <p>${section.body}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>
`;
};

export const renderFooter = () => {
  const year = new Date().getFullYear();
  const footerText = site.footer.text.replace(/\b\d{4}\b/, String(year));

  return `
  <footer class="site-footer">
    <div class="container footer-inner">
      <a href="${site.footer.href}" class="footer-link">${footerText}</a>
      <div class="footer-legal" aria-label="${site.footer.legalLabel}">
        ${renderLegalLinks(site.legal.links)}
      </div>
    </div>
  </footer>
  <aside class="cookie-banner" data-cookie-banner hidden role="dialog" aria-live="polite" aria-label="${site.cookieBanner.title}">
    <div class="cookie-banner-main">
      ${renderCookieBannerIcon()}
      <div class="cookie-banner-copy">
        <p class="cookie-banner-eyebrow">Privacy First</p>
        <p class="cookie-banner-title">${site.cookieBanner.title}</p>
        <p class="cookie-banner-text">${site.cookieBanner.description}</p>
      </div>
    </div>
    <div class="cookie-banner-actions">
      <button class="btn" type="button" data-cookie-action="accept">${site.cookieBanner.acceptLabel}</button>
      <button class="btn btn-ghost" type="button" data-cookie-action="decline">${site.cookieBanner.declineLabel}</button>
    </div>
  </aside>
`;
};

export const initAnimations = () => {
  const revealElements = document.querySelectorAll(".reveal");
  const cookieBanner = document.querySelector("[data-cookie-banner]");
  const consentValue = readConsentCookie();

  if (window.location.hash === "#top") {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  const applyConsentState = (value) => {
    if (!cookieBanner) {
      return;
    }

    const normalizedValue = normalizeConsentValue(value);
    const hasChoice = normalizedValue === "accepted" || normalizedValue === "declined";
    document.documentElement.dataset.cookieConsent = normalizedValue || "unset";
    cookieBanner.hidden = hasChoice;
    cookieBanner.classList.toggle("is-visible", !hasChoice);
  };

  applyConsentState(consentValue);

  if (cookieBanner && !cookieBanner.dataset.bound) {
    cookieBanner.dataset.bound = "true";
    cookieBanner
      .querySelectorAll("[data-cookie-action]")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const value = button.dataset.cookieAction;
          writeConsentCookie(value);
          applyConsentState(value);
        });
      });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((element) => observer.observe(element));

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion) {
    const heroCard = document.querySelector(".hero-card");

    if (heroCard) {
      heroCard.addEventListener("mousemove", (event) => {
        const rect = heroCard.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        heroCard.style.setProperty("--tilt-x", `${y * -8}deg`);
        heroCard.style.setProperty("--tilt-y", `${x * 10}deg`);
      });

      heroCard.addEventListener("mouseleave", () => {
        heroCard.style.setProperty("--tilt-x", "0deg");
        heroCard.style.setProperty("--tilt-y", "0deg");
      });
    }
  }

  const projectControls = document.querySelectorAll(".project-controls");

  projectControls.forEach((controls) => {
    const track = controls.querySelector(".project-track");
    const buttons = controls.querySelectorAll(".project-nav");

    if (!track || buttons.length === 0) {
      return;
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.dataset.direction === "prev" ? -1 : 1;
        const amount = Math.max(track.clientWidth * 0.7, 240);
        track.scrollBy({ left: amount * direction, behavior: "smooth" });
      });
    });
  });

  const certControls = document.querySelectorAll(".cert-controls");

  certControls.forEach((controls) => {
    const track = controls.querySelector(".cert-track");
    const buttons = controls.querySelectorAll(".cert-nav");

    if (!track || buttons.length === 0) {
      return;
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.dataset.direction === "prev" ? -1 : 1;
        const amount = Math.max(track.clientWidth * 0.7, 260);
        track.scrollBy({ left: amount * direction, behavior: "smooth" });
      });
    });
  });

  const submitContactForm = async (form) => {
    const successMessage = form.querySelector(".form-message:not(.form-error)");
    const errorMessage = form.querySelector(".form-message.form-error");
    const submitButton = form.querySelector('button[type="submit"]');

    if (!successMessage || !errorMessage) {
      return;
    }

    const resetMessages = () => {
      successMessage.classList.remove("is-visible");
      errorMessage.classList.remove("is-visible");
    };

    resetMessages();

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute("aria-busy", "true");
    }

    try {
      const action = form.dataset.action || form.action;
      const response = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        successMessage.classList.add("is-visible");
        form.reset();
      } else {
        errorMessage.classList.add("is-visible");
      }
    } catch (error) {
      errorMessage.classList.add("is-visible");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.removeAttribute("aria-busy");
      }
    }
  };

  if (!document.body.dataset.formHandler) {
    document.body.dataset.formHandler = "true";
    document.addEventListener(
      "submit",
      (event) => {
        const form = event.target.closest(".contact-form");
        if (!form) {
          return;
        }
        event.preventDefault();
        submitContactForm(form);
      },
      true
    );
  }

};
