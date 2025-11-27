// public/js/projects.js
import { initLayout } from "./common.js";
import { db, collection, getDocs, query, orderBy } from "./firebase-config.js";
import { initScrollAnimations } from "./scroll-anim.js";

initLayout("projects");
const app = document.getElementById("app");

async function loadProjects() {
  app.innerHTML = `<div class="container"><div class="card">Loading projects…</div></div>`;

  const params = new URLSearchParams(window.location.search);
  const search = (params.get("search") || "").toLowerCase();
  const sector = params.get("sector") || "";

  let snap = await getDocs(query(collection(db, "projects"), orderBy("createdAt", "desc")));

  let projects = [];
  snap.forEach(d => projects.push({ id: d.id, ...d.data() }));

  if (search) {
    projects = projects.filter(p =>
      (p.title || "").toLowerCase().includes(search) ||
      (p.location || "").toLowerCase().includes(search)
    );
  }

  if (sector) {
    projects = projects.filter(
      p => (p.category || "").toLowerCase() === sector.toLowerCase()
    );
  }

  const allCategories = [...new Set(projects.map(p => p.category).filter(Boolean))];

  app.innerHTML = `
    <div class="container">
      <section class="card">
        <h1 style="margin:0 0 12px;">Projects</h1>
        <p class="small">Built and ongoing work across cities and landscapes.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;">
          <input id="searchInput" placeholder="Search by title or location" value="${search}">
          <select id="sectorFilter">
            <option value="">All sectors</option>
            ${allCategories.map(c => `<option value="${c}" ${sector===c?"selected":""}>${c}</option>`).join("")}
          </select>
          <button class="btn" id="applyFilterBtn">Apply</button>
        </div>
      </section>

      <section style="margin-top:20px;">
        <div class="grid">
          ${projects.map(p => `
            <article class="card project-card reveal">
              <img src="${p.images?.[0] || "https://via.placeholder.com/600x400?text=Project"}" alt="${p.title}">
              <h3>${p.title}</h3>
              <div class="small">${p.location || ""}${p.year ? " · " + p.year : ""}</div>
              <div class="chip-row">
                ${p.category ? `<span class="chip">${p.category}</span>` : ""}
              </div>
              <div style="margin-top:8px;">
                <a class="small" href="project.html?id=${p.id}">View project →</a>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    </div>
  `;

  // ⭐ Run animations AFTER the page content updates
  setTimeout(() => initScrollAnimations(), 50);

  // ⭐ Re-run animations after filter or search submit
  document.getElementById("applyFilterBtn").onclick = () => {
    const s = document.getElementById("searchInput").value.trim();
    const se = document.getElementById("sectorFilter").value;
    const params = new URLSearchParams();
    if (s) params.set("search", s);
    if (se) params.set("sector", se);
    window.location.search = params.toString();
  };
}

loadProjects().catch(err => {
  console.error(err);
  app.innerHTML = `<div class="container"><div class="card">Error loading projects.</div></div>`;
});
