function throttle(fn, delay) {
  var last = undefined;
  var timer = undefined;

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
  if (window.pageYOffset) {
    $$html.classList.add('is-active');
  } else {
    $$html.classList.remove('is-active');
  }
}

var $$html = document.querySelector('.sticky');

window.addEventListener(&#39;scroll&#39;,()=&gt;{
  const nav=document.querySelector(&#39;.sticky&#39;);
  nav.classList.toggle(&#39;is-active&#39;,window.scrollY&gt;100);
});
