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

if (grid) {
  projects.forEach((project, index) => {
    grid.innerHTML += `
      <a href="${project.link}" class="card reveal" style="transition: opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s">
        <div class="card-img">
          <img src="../assets/img/${project.img}" alt="Aperçu du projet ${project.name}" />
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
