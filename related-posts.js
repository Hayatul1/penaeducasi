
function loadPenaeducasiRelatedPosts() {
  const container = document.getElementById("penaeducasiMultiRelated");
  if (!container) return;

  const labels = [...document.querySelectorAll('a[rel="tag"]')].map(el => el.textContent.trim());
  if (labels.length === 0) return;

  const label = encodeURIComponent(labels[0]);
  const feedUrl = `/feeds/posts/default/-/${label}?alt=json&max-results=6`;

  fetch(feedUrl)
    .then(res => res.json())
    .then(data => {
      const entries = data.feed.entry || [];
      let html = `<div class="penaeducasiMultiRelated"><div class="content"><span style="border-left: 3px solid #34C759; padding-left: 5px; margin-right: 5px;"></span> <span style="background: linear-gradient(to right, #03A9F4, #8BC34A); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 14px; font-weight: bold;">BACA JUGA:</span><ul>`;

      let currentUrl = window.location.href;
      let count = 0;

      for (let entry of entries) {
        const title = entry.title?.$t || "Tanpa Judul";
        const link = (entry.link || []).find(l => l.rel === "alternate")?.href;

        if (link && link !== currentUrl && count < 4) {
          html += `<li><a href="${link}" title="${title}">${title}</a></li>`;
          count++;
        }
      }

      html += `</ul></div><div class="icon"></div></div>`;
      container.innerHTML = html;
    })
    .catch(err => console.error("Gagal memuat related posts:", err));
}

// Lazy load with IntersectionObserver
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadPenaeducasiRelatedPosts();
    observer.disconnect();
  }
});
observer.observe(document.getElementById("penaeducasiMultiRelated"));
