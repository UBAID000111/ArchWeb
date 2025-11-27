// HEADER MENU SYSTEM – Option B side panel

const hamburger = document.getElementById("hamburger");
const overlay   = document.getElementById("overlayMenu");
const closeBtn  = document.getElementById("closeOverlay");
const panel     = document.querySelector(".overlay-panel");

function openMenu() {
  if (!overlay) return;
  overlay.classList.add("open");
  if (hamburger) {
    hamburger.style.opacity = "0";
    hamburger.style.pointerEvents = "none";
  }
}

function closeMenu() {
  if (!overlay) return;
  overlay.classList.remove("open");
  if (hamburger) {
    hamburger.style.opacity = "1";
    hamburger.style.pointerEvents = "auto";
  }
}

if (hamburger) hamburger.addEventListener("click", openMenu);
if (closeBtn)  closeBtn.addEventListener("click", closeMenu);

// click outside the panel closes menu
if (overlay && panel) {
  overlay.addEventListener("click", (e) => {
    if (!panel.contains(e.target)) {
      closeMenu();
    }
  });
}
