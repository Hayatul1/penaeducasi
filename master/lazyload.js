function preloadCriticalResources() {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.crossorigin) link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}
// LazyLoad Image dengan IntersectionObserver
function lazyLoad() {
    const lazyElements = document.querySelectorAll(".lazy");
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    loadElement(element);
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '200px 0px', // Memuat gambar 200px sebelum masuk ke viewport
            threshold: 0.01
        });
        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    } else {
        // Fallback untuk browser yang tidak mendukung IntersectionObserver
        lazyElements.forEach(element => {
            if (isInViewport(element)) {
                loadElement(element);
            }
        });
        window.addEventListener("scroll", throttle(lazyLoad, 200));
        window.addEventListener("resize", throttle(lazyLoad, 200));
        window.addEventListener("orientationchange", throttle(lazyLoad, 200));
    }
}
// Fungsi untuk memuat elemen (gambar, iframe, video)
function loadElement(element) {
    if (element.tagName === "IMG") {
        element.src = element.getAttribute("data-src");
        if (element.getAttribute("data-srcset")) {
            element.srcset = element.getAttribute("data-srcset");
        }
    } else if (element.tagName === "IFRAME" || element.tagName === "VIDEO") {
        element.src = element.getAttribute("data-src");
    }
    element.classList.remove("lazy");
    element.onload = () => {
        element.style.opacity = 1; // Animasi fade-in setelah gambar dimuat
    };
}
// Fungsi untuk mengecek apakah elemen berada di viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
// Fungsi throttle untuk optimasi event listener
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
// Smooth scroll untuk anchor links dengan requestAnimationFrame
document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    // Preload font dan CSS
    preloadCriticalResources();
    const links = document.querySelectorAll("a[href^='#']");
    const isFirefoxOrTrident = /firefox|trident/i.test(navigator.userAgent);
    const scrollElement = isFirefoxOrTrident ? document.documentElement : document.body;
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;
            const targetPosition = targetElement.getBoundingClientRect().top;
            const startPosition = scrollElement.scrollTop;
            const distance = targetPosition - startPosition;
            const duration = 900;
            let startTime = null;
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                scrollElement.scrollTop = run;
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            requestAnimationFrame(animation);
        });
    });
    // Inisialisasi Owl Carousel dengan IntersectionObserver
    const owlCarouselElements = document.querySelectorAll(".owl-carousel");
    if (owlCarouselElements.length > 0) {
        const carouselObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const carousel = entry.target;
                    $(carousel).owlCarousel({
                        items: 1,
                        loop: true,
                        nav: true,
                        dots: true,
                        autoplay: true,
                        autoplayTimeout: 3000,
                        autoplayHoverPause: true,
                        lazyLoad: true // Aktifkan lazy load di Owl Carousel
                    });
                    observer.unobserve(carousel);
                }
            });
        }, {
            rootMargin: '200px 0px', // Memuat carousel 200px sebelum masuk ke viewport
            threshold: 0.01
        });
        owlCarouselElements.forEach(carousel => {
            carouselObserver.observe(carousel);
        });
    }
    // Jalankan lazy load setelah DOM selesai dimuat
    lazyLoad();
});
