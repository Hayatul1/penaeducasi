(function(){
  function loadPenaeducasiRelatedPosts() {
    const paragraphs = document.querySelectorAll('.post-body p');
    const labels = [...document.querySelectorAll('a[rel="tag"]')].map(el => el.textContent.trim());
    if (!labels.length || paragraphs.length < 5) return;

    const label = encodeURIComponent(labels[0]);
    const feedUrl = `/feeds/posts/default/-/${label}?alt=json&max-results=10`;

    fetch(feedUrl)
      .then(res => res.json())
      .then(data => {
        const entries = data.feed.entry || [];
        const currentUrl = location.href;
        const relatedLinks = [];

        for (let entry of entries) {
          const title = entry.title?.$t || "Tanpa Judul";
          const link = (entry.link || []).find(l => l.rel === "alternate")?.href;
          const media = entry.media$thumbnail?.url || 'https://via.placeholder.com/120x80?text=No+Image';
          if (link && link !== currentUrl && !relatedLinks.some(p => p.link === link)) {
            relatedLinks.push({ title, link, media });
          }
          if (relatedLinks.length >= 4) break;
        }

        // Sisipkan setelah paragraf ke-2, ke-7, ke-12, ke-17, ke-22, ke-27
        const positions = [2, 7, 12, 17, 22, 27];
        let insertedCount = 0;

        for (let pos of positions) {
          if (paragraphs[pos] && relatedLinks[insertedCount]) {
            const post = relatedLinks[insertedCount];
            const box = document.createElement('div');
            box.className = 'penaeducasiMultiRelated';
            box.innerHTML = `
              <a class="relatedItemThumb" href="${post.link}" title="${post.title}">
                <img src="${post.media}" alt="${post.title}" loading="lazy"/>
                <div><strong>ARTIKEL TERKAIT:</strong> ${post.title}</div>
              </a>
            `;
            paragraphs[pos].after(box);
            insertedCount++;
          }
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