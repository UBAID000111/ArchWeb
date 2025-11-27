// public/js/admin.js
import { initLayout } from "./common.js";
import {
  db,
  collection,
  addDoc
} from "./firebase-config.js";

initLayout("admin");
const app = document.getElementById("app");

const ADMIN_SECRET = "Arch@1"; // change later

function renderLogin() {
  app.innerHTML = `
    <div class="container">
      <section class="card">
        <h1>Admin</h1>
        <p class="small">Enter admin password to manage content.</p>
        <input id="adminPass" type="password" placeholder="Admin password">
        <button class="btn" id="loginBtn" style="margin-top:10px;">Login</button>
      </section>
    </div>
  `;
  document.getElementById("loginBtn").onclick = () => {
    const val = document.getElementById("adminPass").value;
    if (val === ADMIN_SECRET) {
      sessionStorage.setItem("a_admin", "ok");
      renderDashboard();
    } else {
      alert("Wrong password");
    }
  };
}

function renderDashboard() {
  app.innerHTML = `
    <div class="container">
      <section class="card">
        <h1>Admin Dashboard</h1>
        <p class="small">Create projects and articles for the website.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
          <button class="btn" id="newArticleBtn">New Article</button>
          <button class="btn" id="newProjectBtn">New Project</button>
          <button id="logoutBtn">Logout</button>
        </div>
      </section>

      <section style="margin-top:20px;" id="formArea"></section>
    </div>
  `;

  document.getElementById("logoutBtn").onclick = () => {
    sessionStorage.removeItem("a_admin");
    renderLogin();
  };
  document.getElementById("newArticleBtn").onclick = renderArticleForm;
  document.getElementById("newProjectBtn").onclick = renderProjectForm;
}

function renderArticleForm() {
  const area = document.getElementById("formArea");
  area.innerHTML = `
    <section class="card">
      <h2>New Article</h2>
      <div>
        <label class="small">Title</label>
        <input id="a_title" placeholder="Article title">
      </div>

      <div style="margin-top:8px;">
        <label class="small">Topic / Sector</label>
        <input id="a_topic" placeholder="e.g. Urbanism, Climate, Housing">
      </div>

      <div style="margin-top:8px;">
        <label class="small">Excerpt</label>
        <textarea id="a_excerpt" placeholder="Short summary shown on list page..."></textarea>
      </div>

      <div style="margin-top:8px;">
        <label class="small">Header Image URL</label>
        <input id="a_image" placeholder="https://example.com/header.jpg">
      </div>

      <div style="margin-top:8px;">
        <label class="small">Content (HTML allowed)</label>
        <textarea id="a_content" placeholder="<p>Your article here...</p>"></textarea>
      </div>

      <button class="btn" id="saveArticleBtn" style="margin-top:10px;">Publish Article</button>
    </section>
  `;

  document.getElementById("saveArticleBtn").onclick = async () => {
    const title = a_title.value.trim();
    const topic = a_topic.value.trim();
    const excerpt = a_excerpt.value.trim();
    const image = a_image.value.trim();
    const content = a_content.value.trim();

    if (!title || !content) {
      alert("Title and content required.");
      return;
    }

    const payload = {
      title,
      topic,
      excerpt,
      image,
      contentHtml: content,
      createdAt: Date.now(),
      publishedAt: Date.now()
    };

    await addDoc(collection(db, "articles"), payload);
    alert("Article published successfully!");
  };
}

function renderProjectForm() {
  const area = document.getElementById("formArea");
  area.innerHTML = `
    <section class="card">
      <h2>New Project</h2>

      <div>
        <label class="small">Title</label>
        <input id="p_title" placeholder="Project title">
      </div>

      <div style="margin-top:8px;">
        <label class="small">Category / Sector</label>
        <input id="p_category" placeholder="e.g. Housing, Landscape, Public">
      </div>

      <div style="margin-top:8px;">
        <label class="small">Location</label>
        <input id="p_location" placeholder="City, Country">
      </div>

      <div style="margin-top:8px;">
        <label class="small">Year</label>
        <input id="p_year" placeholder="2024">
      </div>

      <div style="margin-top:8px;">
        <label class="small">Description</label>
        <textarea id="p_description" placeholder="Project description..."></textarea>
      </div>

      <div style="margin-top:8px;">
        <label class="small">Main Image URL (hero image)</label>
        <input id="p_mainImage" placeholder="https://example.com/main.jpg">
      </div>

      <div style="margin-top:8px;">
        <label class="small">Gallery Image URLs (comma separated)</label>
        <textarea id="p_gallery" placeholder="url1, url2, url3"></textarea>
      </div>

      <button class="btn" id="saveProjectBtn" style="margin-top:10px;">Save Project</button>
    </section>
  `;

  document.getElementById("saveProjectBtn").onclick = async () => {
    const title = p_title.value.trim();
    const category = p_category.value.trim();
    const location = p_location.value.trim();
    const year = p_year.value.trim();
    const description = p_description.value.trim();

    const mainImage = p_mainImage.value.trim();
    const galleryRaw = p_gallery.value.trim();

    if (!title || !mainImage) {
      alert("Title and main image required.");
      return;
    }

    const gallery = galleryRaw
      .split(",")
      .map(x => x.trim())
      .filter(x => x.length > 0);

    const images = [mainImage, ...gallery];

    const payload = {
      title,
      category,
      location,
      year,
      description,
      images,
      createdAt: Date.now()
    };

    await addDoc(collection(db, "projects"), payload);
    alert("Project added successfully!");
  };
}

if (sessionStorage.getItem("a_admin") === "ok") {
  renderDashboard();
} else {
  renderLogin();
}
