// --- Active link ---
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
  const linkPage = link.getAttribute("href").split("/").pop();
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

// --- Scroll reveal ---
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// --- Render projects ---
const grid = document.getElementById("projects-grid");
const isPortfolio = currentPage === "portfolio.html";

if (grid) {
  const list = isPortfolio ? projects : projects.filter((p) => p.featured);

  list.forEach((project, index) => {
    const href = isPortfolio ? project.github : project.link;
    const target = isPortfolio ? 'target="_blank" rel="noopener"' : "";

    grid.innerHTML += `
      <a href="${href}" ${target} class="card reveal" style="transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s">
        <div class="card-img">
          ${
            project.img
              ? `<img src="${project.img}" alt="Aperçu du projet ${project.name}" />`
              : `<div class="card-img-placeholder"></div>`
          }
        </div>
        <div class="card-body">
          <h3 class="card-name">${project.name}</h3>
          <p class="card-desc">${project.desc}</p>
        </div>
      </a>
    `;
  });

  document.querySelectorAll(".card.reveal").forEach((el) => {
    revealObserver.observe(el);
  });
}

// --- Lightbox ---
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxOverlay = document.querySelector(".lightbox-overlay");

if (lightbox) {
  document.querySelectorAll(".projet-screen img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  };

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxOverlay.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}
