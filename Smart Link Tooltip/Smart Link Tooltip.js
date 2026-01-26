/* Smart Link Tooltip - Optimized Version */
(function() {
  // Cache DOM elements
  const tooltip = document.getElementById('link-tooltip');
  const tImg = document.getElementById('tooltip-img');
  const tTitle = document.getElementById('tooltip-title');
  
  // Flag untuk mencegah multiple execution
  let isTooltipActive = false;
  let hideTimeout = null;

  // Fungsi yang dioptimasi
  function showTooltip(e, target) {
    if (isTooltipActive) return;
    isTooltipActive = true;
    
    clearTimeout(hideTimeout);

    const imgUrl = target.getAttribute('data-img');
    const titleText = target.getAttribute('data-title');

    if (!imgUrl || !titleText) return;

    // Set teks terlebih dahulu (lebih cepat)
    tTitle.textContent = titleText;

    // Preload gambar sebelum ditampilkan
    if (tImg.src !== imgUrl) {
      tImg.src = imgUrl; // Image akan lazy load karena ada atribut loading="lazy"
    }

    // Update visibility
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';

    // Hitung posisi dengan requestAnimationFrame (lebih smooth)
    requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect();
      const tWidth = 220; // Gunakan width fixed (220px)
      const tHeight = tooltip.offsetHeight;

      let left = rect.left + (rect.width / 2) - (tWidth / 2);
      let top = rect.top - tHeight - 10;

      // Reset arrow
      tooltip.classList.remove('arrow-top', 'arrow-bottom');

      // Jika tidak muat di atas, pindah ke bawah
      if (top < 10) {
        top = rect.bottom + 10;
        tooltip.classList.add('arrow-bottom');
      } else {
        tooltip.classList.add('arrow-top');
      }

      // Proteksi layar
      if (left < 10) left = 10;
      if (left + tWidth > window.innerWidth - 10) {
        left = window.innerWidth - tWidth - 10;
      }

      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
      
      isTooltipActive = false;
    });
  }

  function hideTooltip() {
    tooltip.style.opacity = '0';
    
    // Delay hide untuk smooth transition
    hideTimeout = setTimeout(() => {
      tooltip.style.visibility = 'hidden';
    }, 200); // Sesuai dengan transition duration
  }

  // Event Delegation yang lebih efisien
  document.addEventListener('mouseover', function(e) {
    const target = e.target.closest('.smart-link');
    if (target) {
      // Debounce untuk mencegah spam event
      clearTimeout(hideTimeout);
      setTimeout(() => showTooltip(e, target), 50);
    }
  });

  document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.smart-link')) {
      hideTooltip();
    }
  });

  // Mobile scroll handler yang dioptimasi
  let scrollTimer;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      if (tooltip.style.visibility === 'visible') {
        hideTooltip();
      }
    }, 100); // Debounce scroll
  }, { passive: true }); // PERBAIKAN: Tambahkan passive untuk performa scroll

  // Cleanup function
  window.addEventListener('beforeunload', function() {
    document.removeEventListener('mouseover', arguments.callee); 
    document.removeEventListener('mouseout', arguments.callee);
    window.removeEventListener('scroll', arguments.callee);
  });
})();