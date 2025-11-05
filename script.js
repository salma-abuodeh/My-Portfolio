let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const toggles = document.querySelectorAll(".theme-toggle");
toggles.forEach(btn => btn.addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
}));
document.documentElement.dataset.theme = localStorage.getItem("theme") || "light";

const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("active"); });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

const typingEl = document.getElementById("typing");
const texts = [
  "Software Engineering Student",
  "Driven to turn ideas into impactful",
  "intelligent solutions."
];

function type() {
  const current = texts[textIndex];

  if (isDeleting) {
    charIndex = Math.max(0, charIndex - 1);
  } else {
    charIndex = Math.min(current.length, charIndex + 1);
  }

  typingEl.textContent = current.substring(0, charIndex);

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 1200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    speed = 500;
  }

  setTimeout(type, speed);
}

type();