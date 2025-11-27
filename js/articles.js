// public/js/articles.js
import { initLayout } from "./common.js";
import { db, collection, getDocs, query, orderBy } from "./firebase-config.js";
import { formatDate } from "./utils.js";
import { initScrollAnimations } from "./scroll-anim.js";

initLayout("articles");
const app = document.getElementById("app");

async function loadArticles() {
  app.innerHTML = `<div class="container"><div class="card">Loading articles…</div></div>`;

  const params = new URLSearchParams(window.location.search);
  const search = (params.get("search") || "").toLowerCase();
  const topic = params.get("topic") || "";

  const snap = await getDocs(query(collection(db,"articles"), orderBy("createdAt","desc")));
  let items = [];
  snap.forEach(d => items.push({ id:d.id, ...d.data() }));

  if (search) {
    items = items.filter(a =>
      (a.title || "").toLowerCase().includes(search) ||
      (a.excerpt || "").toLowerCase().includes(search)
    );
  }
  if (topic) {
    items = items.filter(a => (a.topic || "").toLowerCase() === topic.toLowerCase());
  }

  const topics = [...new Set(items.map(a => a.topic).filter(Boolean))];

  app.innerHTML = `
    <div class="container">
      <section class="card">
        <h1 style="margin:0 0 12px;">Articles</h1>
        <p class="small">Writing from the studio — essays, field notes and research.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;">
          <input id="searchInput" placeholder="Search articles" value="${search}">
          <select id="topicFilter">
            <option value="">All topics</option>
            ${topics.map(t => `<option value="${t}" ${topic===t?"selected":""}>${t}</option>`).join("")}
          </select>
          <button class="btn" id="applyFilterBtn">Apply</button>
        </div>
      </section>

      <section style="margin-top:20px;">
        <div class="grid">
          ${items.map(a => `
            <article class="card article-card reveal">
              <img src="${a.image || "https://via.placeholder.com/600x400?text=Article"}" alt="${a.title}">
              <h3>${a.title}</h3>
              <div class="small">${formatDate(a.publishedAt || a.createdAt)}${a.topic ? " · " + a.topic : ""}</div>
              <p class="small" style="margin-top:6px;">${(a.excerpt || "").slice(0,160)}...</p>
              <div style="margin-top:8px;">
                <a class="small" href="article.html?id=${a.id}">Read more →</a>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    </div>
  `;

  // ⭐ Start animations AFTER HTML is updated
  setTimeout(() => initScrollAnimations(), 50);

  document.getElementById("applyFilterBtn").onclick = () => {
    const s = document.getElementById("searchInput").value.trim();
    const t = document.getElementById("topicFilter").value;
    const params = new URLSearchParams();
    if (s) params.set("search", s);
    if (t) params.set("topic", t);
    window.location.search = params.toString();
  };
}

loadArticles().catch(err => {
  console.error(err);
  app.innerHTML = `<div class="container"><div class="card">Error loading articles.</div></div>`;
});
