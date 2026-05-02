// --- Active link ---
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
  const linkPage = link.getAttribute("href").split("/").pop();
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});
