(function() {
  // Config
  const CONFIG = {
    tooltipClass: 'smart-link-tooltip',
    linkClass: 'smart-link',
    tooltipWidth: 220,
    tooltipZIndex: 9999,
    offsetTop: 3, // Jarak tooltip dari link (px)
    checkInterval: 1000, // Interval cek link baru (ms)
    defaultImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuM2VtIj5BcnRpa2VsIFByZXZpZXc8L3RleHQ+PC9zdmc+' // Placeholder SVG
  };
  
  // State
  const state = {
    activeLink: null,
    isHovering: false,
    tooltip: null,
    initializedLinks: new Set(),
    checkTimer: null
  };
  
  // Fungsi utama: inisialisasi sistem
  function initTooltipSystem() {
    createTooltipElement();
    attachGlobalListeners();
    scanAndInitLinks();
    startLinkScanner();
  }
  
  // 1. Buat elemen tooltip
  function createTooltipElement() {
    if (!state.tooltip) {
      state.tooltip = document.createElement('div');
      state.tooltip.className = CONFIG.tooltipClass;
      state.tooltip.style.cssText = `
        position: fixed;
        display: none;
        width: ${CONFIG.tooltipWidth}px;
        background: white;
        border: 1px solid #a2a9b1;
        border-radius: 2px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 8px;
        z-index: ${CONFIG.tooltipZIndex};
        font-size: 11px;
        line-height: 1.3;
        pointer-events: none;
      `;
      document.body.appendChild(state.tooltip);
    }
    return state.tooltip;
  }
  
  // 2. Scan dan inisialisasi semua link .smart-link
  function scanAndInitLinks() {
    const links = document.querySelectorAll(`.${CONFIG.linkClass}`);
    
    links.forEach(link => {
      const linkId = getLinkId(link);
      
      if (!state.initializedLinks.has(linkId)) {
        initLinkTooltip(link);
        state.initializedLinks.add(linkId);
      }
    });
  }
  
  // 3. Inisialisasi tooltip untuk sebuah link
  function initLinkTooltip(link) {
    // Ambil data dari link (jika ada)
    const tooltipData = {
      image: link.dataset.tooltipImage || CONFIG.defaultImage,
      title: link.dataset.tooltipTitle || link.textContent.trim(),
      description: link.dataset.tooltipDesc || 'Klik untuk membaca artikel',
      source: link.dataset.tooltipSource || new URL(link.href).hostname.replace('www.', '')
    };
    
    // Event handlers
    function handleMouseEnter(e) {
      state.activeLink = link;
      state.isHovering = true;
      
      // Update konten tooltip
      updateTooltipContent(tooltipData);
      
      // Tampilkan dan posisikan
      showTooltipAtLink(link);
    }
    
    function handleMouseLeave() {
      state.isHovering = false;
      hideTooltip();
    }
    
    // Attach events
    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);
    link.addEventListener('mousemove', handleMouseEnter); // Update posisi saat mouse bergerak
    
    // Tambah style visual
    link.style.cssText += `
      cursor: help;
      text-decoration: none;
      border-bottom: 1px dotted #1a73e8;
      color: #1a73e8;
    `;
    
    link.addEventListener('mouseenter', () => {
      link.style.color = '#0d47a1';
      link.style.borderBottomColor = '#0d47a1';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.color = '#1a73e8';
      link.style.borderBottomColor = '#1a73e8';
    });
  }
  
  // 4. Update konten tooltip
  function updateTooltipContent(data) {
    state.tooltip.innerHTML = `
      <img src="${data.image}" 
           alt="${data.title}" 
           style="width:100%; height:auto; max-height:120px; object-fit:cover; margin-bottom:5px; border-radius:2px;"
           onerror="this.src='${CONFIG.defaultImage}'">
      <strong style="display:block; margin-bottom:2px; color:#000;">${data.title}</strong>
      <p style="margin:0 0 3px 0; color:#545454; font-size:10px;">${data.description}</p>
      <small style="color:#6b6b6b; font-size:9px;">${data.source}</small>
    `;
  }
  
  // 5. Tampilkan tooltip di posisi link
  function showTooltipAtLink(link) {
    const rect = link.getBoundingClientRect();
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    
    // Hitung posisi (tengah horizontal, tepat di atas link)
    let left = rect.left + scrollX + (rect.width / 2) - (CONFIG.tooltipWidth / 2);
    let top = rect.top + scrollY - state.tooltip.offsetHeight - CONFIG.offsetTop;
    
    // Pastikan tidak keluar dari viewport
    left = Math.max(10, Math.min(left, window.innerWidth - CONFIG.tooltipWidth - 10));
    top = Math.max(10, top);
    
    // Terapkan posisi
    state.tooltip.style.left = left + 'px';
    state.tooltip.style.top = top + 'px';
    state.tooltip.style.display = 'block';
  }
  
  // 6. Sembunyikan tooltip
  function hideTooltip() {
    if (state.tooltip) {
      state.tooltip.style.display = 'none';
    }
  }
  
  // 7. Update posisi saat scroll (untuk link aktif)
  function updateTooltipPosition() {
    if (state.isHovering && state.activeLink) {
      showTooltipAtLink(state.activeLink);
    }
  }
  
  // 8. Attach global event listeners
  function attachGlobalListeners() {
    // Update posisi saat scroll
    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateTooltipPosition);
    });
    
    // Update posisi saat resize
    window.addEventListener('resize', updateTooltipPosition);
    
    // Sembunyikan tooltip saat klik di mana saja
    document.addEventListener('click', hideTooltip);
    
    // Deteksi perubahan halaman (untuk pagination/AJAX)
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(() => {
        scanAndInitLinks();
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }
  
  // 9. Scanner untuk link baru (periodic check)
  function startLinkScanner() {
    state.checkTimer = setInterval(scanAndInitLinks, CONFIG.checkInterval);
  }
  
  // 10. Helper: dapatkan ID unik untuk link
  function getLinkId(link) {
    return `${link.href}-${link.textContent}`;
  }
  
  // 11. Cleanup function
  function cleanup() {
    if (state.checkTimer) {
      clearInterval(state.checkTimer);
    }
    if (state.tooltip && state.tooltip.parentNode) {
      state.tooltip.parentNode.removeChild(state.tooltip);
    }
  }
  
  // ===== INISIALISASI =====
  
  // Tunggu DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTooltipSystem);
  } else {
    initTooltipSystem();
  }
  
  // Export untuk debugging (opsional)
  window.SmartLinkTooltip = {
    init: initTooltipSystem,
    scan: scanAndInitLinks,
    cleanup: cleanup,
    version: '1.0.0'
  };
  
  // Auto-cleanup sebelum page unload
  window.addEventListener('beforeunload', cleanup);
  
  console.log('✅ Universal Smart Link Tooltip loaded');
})();