(function(){
  function loadPenaeducasiRelatedPosts() {
    const paragraphs = document.querySelectorAll('.post-body p');
    const labels = [...document.querySelectorAll('a[rel="tag"]')].map(el => el.textContent.trim());
    if (!labels.length || !paragraphs.length) return;

    const label = encodeURIComponent(labels[0]);
    const feedUrl = `/feeds/posts/default/-/${label}?alt=json&max-results=4`;

    fetch(feedUrl)
      .then(res => res.json())
      .then(data => {
        const entries = data.feed.entry || [];
        const currentUrl = location.href;
        const relatedLinks = [];

        for (let entry of entries) {
          const title = entry.title?.$t || "Tanpa Judul";
          const link = (entry.link || []).find(l => l.rel === "alternate")?.href;
          if (link && link !== currentUrl && !relatedLinks.some(p => p.link === link)) {
            relatedLinks.push({ title, link });
          }
          if (relatedLinks.length >= 1) break;
        }

        for (let i = 1; i < paragraphs.length; i += 2) {
          const box = document.createElement('div');
          box.className = 'penaeducasiMultiRelated';
          box.innerHTML = `
            <div class="judulRelated">BACA JUGA</div>
            <ul class="listRelated">
              ${relatedLinks.map(post => `<li><a href="${post.link}" title="${post.title}">${post.title}</a></li>`).join('')}
            </ul>
          `;
          paragraphs[i].after(box);
        }
      })
      .catch(err => console.error("Gagal load related post:", err));
  }

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      loadPenaeducasiRelatedPosts();
      observer.disconnect();
    }
  });
  const target = document.querySelector('.post-body');
  if (target) observer.observe(target);
})();

// Lazy load with IntersectionObserver
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadPenaeducasiRelatedPosts();
    observer.disconnect();
  }
});
observer.observe(document.getElementById("penaeducasiMultiRelated"));
