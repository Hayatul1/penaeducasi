 function throttle(fn, delay) {
    var last, timer;
    return function () {
      var now = +new Date();
      if (last && now < last + delay) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          last = now;
          fn();
        }, delay);
      } else {
        last = now;
        fn();
      }
    };
  }

  function onScroll() {
    var nav = document.querySelector('.sticky');
    if (!nav) return;
    if (window.pageYOffset) {
      nav.classList.add('is-active');
    } else {
      nav.classList.remove('is-active');
    }
  }

  window.addEventListener('scroll', throttle(onScroll, 25));