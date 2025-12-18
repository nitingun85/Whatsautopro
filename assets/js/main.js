// Smooth scroll for buttons and nav links
function smoothScrollTo(selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  const headerOffset = 72; // height of sticky header
  const elementPosition = target.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

// Handle data-scroll buttons
document.querySelectorAll("[data-scroll]").forEach((el) => {
  el.addEventListener("click", (e) => {
    const selector = el.getAttribute("data-scroll");
    if (selector) {
      e.preventDefault();
      smoothScrollTo(selector);
    }
  });
});

// Handle nav anchor links
document.querySelectorAll(".nav a[href^='#']").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(href);
      // Close mobile nav if open
      nav.classList.remove("is-open");
    }
  });
});

// Mobile nav toggle
const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("site-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });
}

// Simple intersection observer for animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14
  }
);

// Attach animation attribute to main cards/sections
document.querySelectorAll(
  ".card, .hero-content, .hero-visual, .section-header, .steps, .feature-groups, .pricing-grid, .cards-grid, .contact-grid, .about-grid"
).forEach((el) => {
  el.setAttribute("data-animate", "");
  observer.observe(el);
});

// Contact form fake submit
const contactForm = document.getElementById("contact-form");
const successMessage = document.getElementById("form-success");

if (contactForm && successMessage) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    successMessage.hidden = false;
    contactForm.reset();
    setTimeout(() => {
      successMessage.hidden = true;
    }, 6000);
  });
}

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
