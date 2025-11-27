// public/js/utils.js

export function createElement(html) {
    const div = document.createElement("div");
    div.innerHTML = html.trim();
    return div.firstElementChild;
  }
  
  export function formatDate(ts) {
    if (!ts) return "";
    try {
      return new Date(ts).toLocaleDateString();
    } catch {
      return "";
    }
  }
  