// public/js/common.js
import { createElement } from "./utils.js";

const STYLE = `
:root{
  --bg:#F6F2E9;
  --accent:#F39E7F;
  --footer:#494C37;
  --card:#ffffff;
  --text:#111111;
}
*{box-sizing:border-box;font-family:system-ui,-apple-system,BlinkMacSystemFont,"SF Pro",sans-serif;}
body{margin:0;background:var(--bg);color:var(--text);}
a{text-decoration:none;color:inherit;}
header{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;}
.logo{font-weight:700;font-size:20px;}
.hamb{font-size:22px;cursor:pointer;}
main{min-height:70vh;}
.overlay-menu{
  position:fixed;inset:0;background:var(--accent);
  display:none;flex-direction:column;padding:32px 22px;z-index:99;
}
.overlay-menu.open{display:flex;}
.overlay-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;}
.overlay-nav{display:flex;flex-direction:column;gap:14px;font-size:18px;margin-top:8px;}
.overlay-item{font-weight:500;cursor:pointer;}
.overlay-sub{margin-left:16px;font-size:14px;margin-top:4px;display:flex;flex-direction:column;gap:4px;}
.overlay-search{margin-top:auto;}
.overlay-search input{width:100%;padding:10px;border-radius:999px;border:none;}
footer{background:var(--footer);color:#fff;padding:22px 18px;margin-top:40px;}
.footer-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:14px;}
.container{max-width:1100px;margin:0 auto;padding:0 18px 32px;}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:18px;}
.card{background:var(--card);border-radius:16px;padding:16px;box-shadow:0 10px 30px rgba(0,0,0,0.06);}
.banner{width:100%;height:300px;object-fit:cover;border-radius:16px;}
.btn{background:var(--accent);border:none;border-radius:999px;padding:10px 18px;color:#fff;font-weight:500;cursor:pointer;}
.badge{display:inline-block;padding:4px 10px;border-radius:999px;background:#eee;font-size:11px;}
.small{font-size:13px;color:#555;}
@media (min-width:900px){
  header{padding:18px 40px;}
  .container{padding:0 40px 40px;}
}
`;

// inject base styles & shell
export function initLayout(activePage = "") {
  if (!document.getElementById("base-style")) {
    const styleTag = document.createElement("style");
    styleTag.id = "base-style";
    styleTag.textContent = STYLE;
    document.head.appendChild(styleTag);
  }

  document.body.innerHTML = `
    <header>
      <div class="logo"><a href="index.html">A°</a></div>
      <div class="hamb" id="hambBtn">☰</div>
    </header>
    <div class="overlay-menu" id="overlayMenu">
      <div class="overlay-top">
        <div style="font-weight:700;">Menu</div>
        <button class="btn" id="closeOverlay">Close</button>
      </div>
      <nav class="overlay-nav">
        <a href="projects.html" class="overlay-item ${activePage==="projects"?"active":""}">Projects</a>
        <div>
          <div class="overlay-item">Practice ▾</div>
          <div class="overlay-sub">
            <span>Design Philosophy</span>
            <span>Research</span>
          </div>
        </div>
        <div>
          <div class="overlay-item">People ▾</div>
          <div class="overlay-sub">
            <a href="people.html">Team</a>
            <span>Careers</span>
          </div>
        </div>
        <div>
          <div class="overlay-item">Resources ▾</div>
          <div class="overlay-sub">
            <a href="articles.html">Articles</a>
            <span>Publications</span>
          </div>
        </div>
        <a href="contact.html" class="overlay-item ${activePage==="contact"?"active":""}">Contact</a>
        <a href="admin.html" class="overlay-item">Admin</a>
      </nav>
      <div class="overlay-search">
        <input type="text" id="menuSearch" placeholder="Search projects & articles...">
      </div>
    </div>
    <main id="app"></main>
    <footer>
      <div class="footer-inner">
        <div>
          <div style="font-weight:700;">A° Studio</div>
          <div class="small">Architecture · Research · Urbanism</div>
        </div>
        <div class="small">© ${new Date().getFullYear()} A° Studio</div>
      </div>
    </footer>
  `;

  const overlay = document.getElementById("overlayMenu");
  document.getElementById("hambBtn").onclick = () => overlay.classList.add("open");
  document.getElementById("closeOverlay").onclick = () => overlay.classList.remove("open");

  // simple global search redirect
  const menuSearch = document.getElementById("menuSearch");
  menuSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = encodeURIComponent(menuSearch.value.trim());
      if (q) window.location.href = `articles.html?search=${q}`;
    }
  });
}
