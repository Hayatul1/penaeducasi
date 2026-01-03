/**
 * PenaEducasi Tooltip System v1.0
 * Tooltip Wikipedia-style untuk Blogger PenaEducasi.com
 * Host: GitHub CDN via jsDelivr
 * Author: Pena Educasi Team
 */

(function() {
  // Konfigurasi
  var CONFIG = {
    tooltipWidth: 220,
    mobileWidth: 200,
    excerptLength: 100,
    cacheTime: 3600000, // 1 jam dalam milidetik
    loadingText: 'Memuat preview...',
    defaultTitle: 'Pena Educasi',
    defaultDesc: 'Artikel edukasi berkualitas untuk siswa, guru, dan orang tua'
  };
  
  // Cache storage
  var previewCache = {};
  
  // Fungsi utama untuk setup tooltips
  function initializeTooltipSystem() {
    console.log('PenaEducasi Tooltip System v1.0 diinisialisasi');
    
    // Setup semua link dengan class link-preview
    setupLinkPreviews();
    
    // Event untuk menutup tooltip saat klik di luar
    setupCloseOnClickOutside();
    
    // Handle dynamic content (jika ada)
    setupMutationObserver();
  }
  
  // Setup semua link preview
  function setupLinkPreviews() {
    var links = document.getElementsByClassName('link-preview');
    var count = links.length;
    
    if (count === 0) {
      console.log('Tidak ditemukan link dengan class "link-preview"');
      return;
    }
    
    console.log('Menemukan ' + count + ' link preview');
    
    for (var i = 0; i < count; i++) {
      var link = links[i];
      
      // Skip jika sudah di-setup
      if (link.getAttribute('data-pena-setup') === 'true') {
        continue;
      }
      
      link.setAttribute('data-pena-setup', 'true');
      
      // Desktop: mouse events
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
      
      // Mobile: touch events
      link.addEventListener('touchstart', handleTouchStart, { passive: true });
      
      // Click event untuk aksesibilitas
      link.addEventListener('click', handleClick);
    }
  }
  
  // Handle mouse enter (desktop)
  function handleMouseEnter(event) {
    if (window.innerWidth > 768) { // Desktop only
      var link = event.currentTarget;
      showTooltip(link);
    }
  }
  
  // Handle mouse leave (desktop)
  function handleMouseLeave(event) {
    if (window.innerWidth > 768) {
      var link = event.currentTarget;
      
      // Delay sedikit sebelum hide
      setTimeout(function() {
        if (!isHovering(link)) {
          hideTooltip(link);
        }
      }, 300);
    }
  }
  
  // Handle touch start (mobile)
  function handleTouchStart(event) {
    event.stopPropagation();
    var link = event.currentTarget;
    
    // Close other tooltips first
    closeAllTooltipsExcept(link);
    
    // Toggle tooltip untuk link ini
    if (link.getAttribute('data-pena-active') === 'true') {
      hideTooltip(link);
    } else {
      showTooltip(link);
    }
    
    // Prevent default hanya jika di mobile
    if (window.innerWidth <= 768) {
      event.preventDefault();
    }
  }
  
  // Handle click
  function handleClick(event) {
    var link = event.currentTarget;
    
    // Di mobile, jika tooltip aktif, klik pertama tutup dulu
    if (window.innerWidth <= 768 && link.getAttribute('data-pena-active') === 'true') {
      event.preventDefault();
      hideTooltip(link);
    }
  }
  
  // Tampilkan tooltip
  function showTooltip(link) {
    // Close other tooltips
    closeAllTooltipsExcept(link);
    
    // Cek jika sudah ada tooltip
    var existingTooltip = link.querySelector('.pena-tooltip');
    if (existingTooltip) {
      link.setAttribute('data-pena-active', 'true');
      existingTooltip.style.opacity = '1';
      existingTooltip.style.visibility = 'visible';
      return;
    }
    
    // Buat tooltip baru
    var tooltip = createTooltipElement();
    
    // Tambahkan ke link
    link.appendChild(tooltip);
    link.setAttribute('data-pena-active', 'true');
    
    // Atur posisi untuk mobile
    adjustTooltipPosition(tooltip, link);
    
    // Load data preview
    loadPreviewData(link.href, function(data) {
      if (!tooltip.parentNode) return; // Jika tooltip sudah dihapus
      
      updateTooltipContent(tooltip, data, link.href);
    });
  }
  
  // Sembunyikan tooltip
  function hideTooltip(link) {
    link.setAttribute('data-pena-active', 'false');
    
    var tooltips = link.getElementsByClassName('pena-tooltip');
    for (var i = 0; i < tooltips.length; i++) {
      var tooltip = tooltips[i];
      
      // Animasi fade out
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
      
      // Hapus dari DOM setelah animasi
      setTimeout(function(t) {
        if (t.parentNode) {
          t.parentNode.removeChild(t);
        }
      }, 300, tooltip);
    }
  }
  
  // Tutup semua tooltip kecuali yang spesifik
  function closeAllTooltipsExcept(exceptLink) {
    var activeLinks = document.querySelectorAll('.link-preview[data-pena-active="true"]');
    
    for (var i = 0; i < activeLinks.length; i++) {
      var link = activeLinks[i];
      
      if (link !== exceptLink) {
        hideTooltip(link);
      }
    }
  }
  
  // Buat elemen tooltip
  function createTooltipElement() {
    var tooltip = document.createElement('div');
    tooltip.className = 'pena-tooltip';
    
    // Styling inline untuk inisialisasi
    tooltip.style.position = 'absolute';
    tooltip.style.bottom = '100%';
    tooltip.style.left = '50%';
    tooltip.style.width = CONFIG.tooltipWidth + 'px';
    tooltip.style.maxWidth = CONFIG.tooltipWidth + 'px';
    tooltip.style.backgroundColor = 'white';
    tooltip.style.border = '1px solid #a2a9b1';
    tooltip.style.borderRadius = '2px';
    tooltip.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    tooltip.style.padding = '8px';
    tooltip.style.zIndex = '1000';
    tooltip.style.marginBottom = '8px';
    tooltip.style.fontSize = '11px';
    tooltip.style.lineHeight = '1.3';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.opacity = '0';
    tooltip.style.visibility = 'hidden';
    tooltip.style.transition = 'opacity 0.15s ease';
    
    // Loading state
    tooltip.innerHTML = 
      '<div style="text-align:center;color:#70757a;font-size:10px;padding:10px 0;">' +
      CONFIG.loadingText +
      '</div>';
    
    return tooltip;
  }
  
  // Atur posisi tooltip (terutama untuk mobile)
  function adjustTooltipPosition(tooltip, link) {
    if (window.innerWidth <= 768) {
      var linkRect = link.getBoundingClientRect();
      var tooltipWidth = CONFIG.mobileWidth;
      
      tooltip.style.width = tooltipWidth + 'px';
      tooltip.style.maxWidth = '90vw';
      
      // Cek jika di dekat tepi kiri
      if (linkRect.left < 100) {
        tooltip.style.left = '0';
        tooltip.style.transform = 'none';
      }
      // Cek jika di dekat tepi kanan
      else if (linkRect.right > window.innerWidth - 100) {
        tooltip.style.left = 'auto';
        tooltip.style.right = '0';
        tooltip.style.transform = 'none';
      }
    }
  }
  
  // Load data preview dari Blogger API
  function loadPreviewData(url, callback) {
    // Cek cache dulu
    var cacheKey = 'pena_preview_' + btoa(url);
    var cachedData = getFromCache(cacheKey);
    
    if (cachedData) {
      callback(cachedData);
      return;
    }
    
    // Format URL untuk Blogger API
    var apiUrl = 'https://www.penaeducasi.com/feeds/posts/default?alt=json-in-script';
    apiUrl += '&q=' + encodeURIComponent(url);
    
    var callbackName = 'penaCallback_' + Date.now();
    
    window[callbackName] = function(response) {
      var data = null;
      
      if (response && response.feed && response.feed.entry && response.feed.entry.length > 0) {
        var entry = response.feed.entry[0];
        var content = entry.content ? entry.content.$t : '';
        
        data = {
          title: entry.title.$t || CONFIG.defaultTitle,
          excerpt: extractExcerpt(content),
          image: extractFirstImage(content),
          url: url,
          success: true
        };
        
        // Simpan ke cache
        saveToCache(cacheKey, data);
      } else {
        data = {
          title: CONFIG.defaultTitle,
          excerpt: CONFIG.defaultDesc,
          image: '',
          url: url,
          success: false
        };
      }
      
      callback(data);
      
      // Cleanup
      try {
        delete window[callbackName];
      } catch (e) {}
    };
    
    // Buat script element untuk JSONP
    var script = document.createElement('script');
    script.src = apiUrl + '&callback=' + callbackName;
    
    script.onerror = function() {
      callback({
        title: CONFIG.defaultTitle,
        excerpt: 'Gagal memuat preview. Silakan kunjungi artikel langsung.',
        image: '',
        url: url,
        success: false
      });
      
      try {
        delete window[callbackName];
      } catch (e) {}
    };
    
    document.head.appendChild(script);
    
    // Cleanup script setelah 5 detik
    setTimeout(function() {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }, 5000);
  }
  
  // Update konten tooltip
  function updateTooltipContent(tooltip, data, url) {
    var imageHtml = '';
    var title = data.title || CONFIG.defaultTitle;
    var excerpt = data.excerpt || CONFIG.defaultDesc;
    
    // Image jika ada
    if (data.image) {
      imageHtml = 
        '<div style="float:left;margin:0 6px 3px 0;">' +
        '<img src="' + data.image + '" style="width:50px;height:50px;object-fit:cover;border-radius:1px;border:1px solid #ddd;" alt="' + title + '" onerror="this.style.display=\'none\'">' +
        '</div>';
    }
    
    // Tooltip content
    tooltip.innerHTML = 
      imageHtml +
      '<div style="font-weight:bold;font-size:11px;color:#202124;margin-bottom:3px;line-height:1.2;">' +
      title +
      '</div>' +
      '<div style="color:#54595d;font-size:10px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">' +
      excerpt +
      '</div>' +
      '<a href="' + url + '" style="display:inline-block;font-size:9px;color:#3366cc;text-decoration:none;margin-top:4px;font-style:italic;" target="_blank" onclick="event.stopPropagation();">' +
      'Baca selengkapnya →' +
      '</a>';
    
    // Tampilkan tooltip
    setTimeout(function() {
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
    }, 10);
  }
  
  // Ekstrak excerpt dari konten
  function extractExcerpt(content) {
    if (!content) return CONFIG.defaultDesc;
    
    // Hapus tag HTML
    var text = content.replace(/<[^>]*>/g, ' ');
    
    // Hapus karakter khusus
    text = text.replace(/&[^;]+;/g, ' ');
    
    // Bersihkan spasi berlebih
    text = text.replace(/\s+/g, ' ').trim();
    
    // Potong sesuai panjang yang ditentukan
    if (text.length > CONFIG.excerptLength) {
      text = text.substring(0, CONFIG.excerptLength) + '...';
    }
    
    return text;
  }
  
  // Ekstrak gambar pertama dari konten
  function extractFirstImage(content) {
    if (!content) return '';
    
    var imgMatch = content.match(/<img[^>]+src="([^">]+)"/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
    
    return '';
  }
  
  // Cache management
  function getFromCache(key) {
    try {
      var item = previewCache[key];
      
      if (item && item.expiry > Date.now()) {
        return item.data;
      }
      
      // Juga cek localStorage
      var stored = localStorage.getItem(key);
      if (stored) {
        var parsed = JSON.parse(stored);
        if (parsed.expiry > Date.now()) {
          return parsed.data;
        }
      }
    } catch (e) {
      // Ignore cache errors
    }
    
    return null;
  }
  
  function saveToCache(key, data) {
    try {
      var item = {
        data: data,
        expiry: Date.now() + CONFIG.cacheTime
      };
      
      // Simpan di memory cache
      previewCache[key] = item;
      
      // Simpan di localStorage jika memungkinkan
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      // Ignore storage errors
    }
  }
  
  // Setup event untuk klik di luar tooltip
  function setupCloseOnClickOutside() {
    document.addEventListener('click', function(event) {
      var target = event.target;
      var isTooltipRelated = false;
      
      // Cek jika klik di dalam link preview atau tooltip
      while (target && target !== document.documentElement) {
        if (target.classList && 
            (target.classList.contains('link-preview') || 
             target.classList.contains('pena-tooltip'))) {
          isTooltipRelated = true;
          break;
        }
        target = target.parentNode;
      }
      
      // Jika klik di luar, tutup semua tooltip
      if (!isTooltipRelated) {
        closeAllTooltipsExcept(null);
      }
    });
  }
  
  // Setup MutationObserver untuk konten dinamis
  function setupMutationObserver() {
    if (typeof MutationObserver === 'undefined') return;
    
    var observer = new MutationObserver(function(mutations) {
      var shouldUpdate = false;
      
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length > 0) {
          shouldUpdate = true;
          break;
        }
      }
      
      if (shouldUpdate) {
        setTimeout(setupLinkPreviews, 100);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Helper function untuk cek hover state
  function isHovering(element) {
    return element.matches(':hover');
  }
  
  // Public API (opsional, untuk kontrol manual)
  window.PenaEducasiTooltip = {
    show: function(link) {
      if (link.classList.contains('link-preview')) {
        showTooltip(link);
      }
    },
    hide: function(link) {
      if (link.classList.contains('link-preview')) {
        hideTooltip(link);
      }
    },
    hideAll: function() {
      closeAllTooltipsExcept(null);
    },
    refresh: function() {
      setupLinkPreviews();
    }
  };
  
  // Inisialisasi saat DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTooltipSystem);
  } else {
    setTimeout(initializeTooltipSystem, 100);
  }
  
})();