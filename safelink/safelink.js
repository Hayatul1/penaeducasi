(function() {
    // Cek jika ini adalah safelink redirect
    const urlParams = new URLSearchParams(window.location.search);
    const isSafelink = urlParams.get('safelink') === 'true';
    const encryptedData = urlParams.get('data');
    
    if (!isSafelink || !encryptedData) return;
    
    console.log('🔗 Safelink redirect detected');
    
    // Tunggu halaman selesai load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSafelink);
    } else {
        initSafelink();
    }
    
    function initSafelink() {
        // Decrypt URL
        const originalUrl = decryptUrl(encryptedData);
        
        if (!originalUrl) {
            console.error('Invalid safelink data');
            showErrorNotification('Link safelink tidak valid atau rusak.');
            return;
        }
        
        if (originalUrl === 'EXPIRED') {
            showErrorNotification('Link safelink telah kedaluwarsa (lebih dari 48 jam).');
            return;
        }
        
        // Tampilkan floating button
        showFloatingButton(originalUrl);
        
        // Update click count
        updateClickCount();
    }
    
    function decryptUrl(encrypted) {
        try {
            const parts = encrypted.split('.');
            if (parts.length !== 2) return null;
            
            const [encoded, checksum] = parts;
            const decoded = decodeURIComponent(atob(encoded));
            const data = JSON.parse(decoded);
            
            // Validasi checksum
            const expectedChecksum = btoa(data.ts.toString()).substring(0, 6);
            if (checksum !== expectedChecksum) return null;
            
            // Cek expired (48 jam)
            const maxAge = 48 * 60 * 60 * 1000;
            if (Date.now() - data.ts > maxAge) return 'EXPIRED';
            
            return data.url;
        } catch (error) {
            console.error('Decrypt error:', error);
            return null;
        }
    }
    
    function showFloatingButton(url) {
        // Buat container floating
        const container = document.createElement('div');
        container.className = 'safelink-floating-container';
        container.id = 'safelinkContainer';
        
        // Buat konten
        const truncatedUrl = truncateText(url, 40);
        
        container.innerHTML = `
            <div class="safelink-floating-box">
                <button class="safelink-close-btn" onclick="closeSafelink()" title="Tutup">×</button>
                
                <div class="safelink-header">
                    <span class="safelink-icon">🛡️</span>
                    <h3 class="safelink-title">Safelink Ready</h3>
                </div>
                
                <div class="safelink-content">
                    <p class="safelink-message">Klik tombol di bawah untuk membuka link tujuan di tab baru.</p>
                    
                    <div class="safelink-url-preview">
                        <div class="safelink-url-label">Link Tujuan</div>
                        <div class="safelink-url-text" title="${url}">${truncatedUrl}</div>
                    </div>
                </div>
                
                <div class="safelink-buttons">
                    <button onclick="openSafelinkInNewTab('${encodeURIComponent(url)}')" 
                            class="safelink-btn safelink-btn-primary pulse" title="Buka di Tab Baru">
                        <span>↗</span>
                        Buka Link di Tab Baru
                    </button>
                    
                    <button onclick="copySafelinkUrl('${encodeURIComponent(url)}')" 
                            class="safelink-btn safelink-btn-secondary" title="Salin URL">
                        <span>📋</span>
                        Salin URL
                    </button>
                </div>
                
                <div class="safelink-footer">
                    <span>🔒</span>
                    <span>Safelink Protection</span>
                </div>
                
                <div class="safelink-minimized-icon" onclick="expandSafelink()">🛡️</div>
            </div>
        `;
        
        document.body.appendChild(container);
        
        // Simpan URL untuk digunakan nanti
        window.safelinkTargetUrl = url;
        
        // Auto-minimize setelah 10 detik
        setTimeout(() => {
            minimizeSafelink();
        }, 10000);
    }
    
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    }
    
    function showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            background: #dc3545;
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 999999;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        notification.innerHTML = `
            <span style="font-size: 16px;">❌</span>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    function showSuccessNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            background: #28a745;
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 999999;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        notification.innerHTML = `
            <span style="font-size: 16px;">✅</span>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    function updateClickCount() {
        try {
            const currentUrl = window.location.href;
            const records = JSON.parse(localStorage.getItem('safelink_redirects') || '[]');
            
            for (let record of records) {
                if (currentUrl.includes(record.safelink)) {
                    record.clicks = (record.clicks || 0) + 1;
                    record.lastClick = Date.now();
                    localStorage.setItem('safelink_redirects', JSON.stringify(records));
                    break;
                }
            }
        } catch (error) {
            console.error('Error updating click count:', error);
        }
    }
    
    // Fungsi global untuk aksi
    window.openSafelinkInNewTab = function(urlEncoded) {
        const url = decodeURIComponent(urlEncoded);
        
        // Buka di tab baru
        window.open(url, '_blank', 'noopener,noreferrer');
        
        // Tampilkan notifikasi
        showSuccessNotification('Link dibuka di tab baru!');
        
        // Optional: Close setelah dibuka
        setTimeout(() => {
            closeSafelink();
        }, 1000);
    };
    
    window.copySafelinkUrl = function(urlEncoded) {
        const url = decodeURIComponent(urlEncoded);
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url)
                .then(() => {
                    showSuccessNotification('URL berhasil disalin ke clipboard!');
                })
                .catch(() => {
                    fallbackCopy(url);
                });
        } else {
            fallbackCopy(url);
        }
    };
    
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        
        try {
            document.execCommand('copy');
            showSuccessNotification('URL berhasil disalin!');
        } catch (err) {
            showErrorNotification('Gagal menyalin URL');
        }
        
        document.body.removeChild(textarea);
    }
    
    window.closeSafelink = function() {
        const container = document.getElementById('safelinkContainer');
        if (container) {
            container.style.animation = 'safelinkSlideIn 0.5s ease-out reverse';
            setTimeout(() => {
                if (container.parentNode) {
                    container.parentNode.removeChild(container);
                }
            }, 500);
        }
    };
    
    window.minimizeSafelink = function() {
        const box = document.querySelector('.safelink-floating-box');
        if (box) {
            box.classList.add('minimized');
            // Update click event untuk expand
            const icon = box.querySelector('.safelink-minimized-icon');
            if (icon) {
                icon.onclick = expandSafelink;
            }
        }
    };
    
    window.expandSafelink = function() {
        const box = document.querySelector('.safelink-floating-box');
        if (box) {
            box.classList.remove('minimized');
        }
    };
    
    // Tambahkan style untuk animasi
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
})();