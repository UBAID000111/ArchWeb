// public/js/home.js
import { initLayout } from "./common.js";
import { db, collection, getDocs, orderBy, query, limit } from "./firebase-config.js";
import { formatDate } from "./utils.js";
import { initScrollAnimations } from "./scroll-anim.js";

initLayout("home");

const app = document.getElementById("app");

async function loadHome() {
  app.innerHTML = `<div class="container"><div class="card">Loading…</div></div>`;

  const projSnap = await getDocs(
    query(collection(db,"projects"), orderBy("createdAt","desc"), limit(6))
  );
  const artSnap = await getDocs(
    query(collection(db,"articles"), orderBy("createdAt","desc"), limit(3))
  );

  const projects = [];
  projSnap.forEach(d => projects.push({ id:d.id, ...d.data() }));
  const articles = [];
  artSnap.forEach(d => articles.push({ id:d.id, ...d.data() }));

  const heroImage = projects[0]?.images?.[0] || articles[0]?.image || "https://via.placeholder.com/900x500?text=A%C2%B0+Studio";

  app.innerHTML = `
    <div class="container">
      <section class="hero">
        <div class="card">
          <img src="${heroImage}" class="banner" alt="Studio hero">
          <div class="hero-text">
            <h1>Architecture for climate, craft and community.</h1>
            <p>A° Studio is a design and research practice exploring humane architecture for evolving cities and ecologies.</p>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div class="card">
            <h3>Featured</h3>
            <p class="small">Projects and articles from our studio.</p>
            <div style="margin-top:10px;">
              <a class="btn" href="projects.html">View Projects</a>
            </div>
            <div style="margin-top:8px;">
              <a class="small" href="articles.html">Read Articles →</a>
            </div>
          </div>
          <div class="card">
            <h3>Practice</h3>
            <p class="small">We work across scales — from interior interventions to urban landscapes.</p>
          </div>
        </div>
      </section>

      <section>
        <div class="section-title">
          <h2>Latest Projects</h2>
          <span><a href="projects.html">All projects →</a></span>
        </div>
        <div class="grid">
          ${projects.map(p => `
            <article class="card project-card reveal">
              <img src="${p.images?.[0] || heroImage}" alt="${p.title}">
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

      <section>
        <div class="section-title">
          <h2>Latest Articles</h2>
          <span><a href="articles.html">All articles →</a></span>
        </div>
        <div class="grid">
          ${articles.map(a => `
            <article class="card article-card reveal">
              <img src="${a.image || heroImage}" alt="${a.title}">
              <h3>${a.title}</h3>
              <div class="small">${formatDate(a.publishedAt || a.createdAt)}</div>
              <p class="small">${(a.excerpt || "").slice(0,140)}...</p>
              <div style="margin-top:8px;">
                <a class="small" href="article.html?id=${a.id}">Read more →</a>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    </div>
  `;

  // ⭐ Run animation AFTER homepage content loads
  setTimeout(() => initScrollAnimations(), 50);
}

loadHome().catch(err => {
  console.error(err);
  app.innerHTML = `<div class="container"><div class="card">Error loading home.</div></div>`;
});
