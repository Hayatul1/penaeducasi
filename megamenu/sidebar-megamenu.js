document.addEventListener("DOMContentLoaded", function() {
  // 1. Logika Pembebasan: Pindahkan isi mega menu keluar dari penjara sidebar
  const menuItems = document.querySelectorAll('.has-mega');
  
  menuItems.forEach(function(item) {
    const isiMega = item.querySelector('.mega-desktop');
    if (!isiMega) return;

    // Lakukan Teleportasi Fisik elemen ke bagian terluar web (Body)
    document.body.appendChild(isiMega);

    let delayHover; 

    // 2. Logika Hitung Kordinat dan Tampil
    const aktifkanMenu = function() {
      // Simbol < di bawah ini sekarang aman karena sudah dilindungi CDATA
      if (window.innerWidth < 992) return; 
      clearTimeout(delayHover);
      
      // Ambil kordinat "Y" persis di mana tulisan menu berada di layar 
      const rect = item.getBoundingClientRect();
      
      // Hitung posisi pintar (Mencegah Menu Terpotong Batas Layar Bawah)
      isiMega.style.display = 'block'; 
      let posTop = rect.top;
      let posLeft = rect.right; // Muncul persis di kanan sidebar
      
      const megaTinggi = isiMega.offsetHeight;
      if (posTop + megaTinggi > window.innerHeight) {
        posTop = window.innerHeight - megaTinggi - 20; // Otomatis naik jika mentok bawah layar
      }
      
      // Terapkan Kordinat
      isiMega.style.top = Math.max(10, posTop) + 'px';
      isiMega.style.left = posLeft + 'px';
      
      // Tampilkan
      isiMega.classList.add('tampil-mega');
      item.classList.add('ter-sorot');
    };

    const tutupMenu = function() {
      // Tunggu 150 milidetik sebelum menutup untuk toleransi gerakan tangan
      delayHover = setTimeout(function() {
        isiMega.classList.remove('tampil-mega');
        item.classList.remove('ter-sorot');
      }, 150); 
    };

    // 3. Pasang pendeteksi Mouse Hover
    item.addEventListener('mouseenter', aktifkanMenu);
    item.addEventListener('mouseleave', tutupMenu);
    isiMega.addEventListener('mouseenter', aktifkanMenu); // Mencegah tutup saat mouse masuk ke kotak
    isiMega.addEventListener('mouseleave', tutupMenu);
  });
});