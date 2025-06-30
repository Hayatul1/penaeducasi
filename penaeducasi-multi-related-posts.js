(function(){
  function loadPenaeducasiRelatedPosts() {
    const paragraphs = document.querySelectorAll('.post-body p');
    const labels = [...document.querySelectorAll('a[rel="tag"]')].map(el => el.textContent.trim());
    if (!labels.length || !paragraphs.length) return;

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
          if (link && link !== currentUrl && !relatedLinks.some(p => p.link === link)) {
            relatedLinks.push({ title, link });
          }
          if (relatedLinks.length >= 4) break;
        }

        let insertedCount = 0;
        for (let i = 1; i < paragraphs.length && insertedCount < relatedLinks.length; i += 2) {
          const post = relatedLinks[insertedCount];
          const box = document.createElement('div');
          box.className = 'penaeducasiMultiRelated';
          box.innerHTML = `
            <a class="relatedLinkCombined" href="${post.link}" title="${post.title}">
              <strong>BACA JUGA:</strong> ${post.title}
            </a>
          `;
          paragraphs[i].after(box);
          insertedCount++;
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