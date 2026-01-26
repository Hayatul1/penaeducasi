/* Flexible Wikipedia-Style Hyperlink Tooltip (Script) */
(function() {
  // Menunggu hingga seluruh elemen DOM dimuat agar tidak error
  document.addEventListener("DOMContentLoaded", function() {
    
    const tooltips = document.querySelectorAll('.wiki-tooltip');
    
    tooltips.forEach(trigger => {
      trigger.addEventListener('mouseenter', function() {
        const box = this.querySelector('.wiki-tooltip-box');
        if (!box) return;

        // Reset ke posisi atas dulu untuk pengecekan
        box.classList.remove('show-bottom');
        
        // Ambil koordinat kotak
        const rect = box.getBoundingClientRect();
        
        // Cek apakah menabrak bagian atas layar (rect.top < 0)
        if (rect.top < 0) {
          box.classList.add('show-bottom');
        }
      });
    });

  });
})();
