'use strict';
$(function(t) {
  t.fn.lazyyard = function() {
    return this.each(function() {
      function A() {
        var a = t(window).height(), c = t(window).scrollTop(), d = u.offset().top;
        c + a > d && (a = new Image(), a.onload = function() {
          u.addClass("lazy-yard");
        }, a.src = b);
      }
      var u = t(this), v = u.attr("src"), w = Math.round(u.width()), r = Math.round(u.height());
      w = "/w" + w + "-h" + r + "-p-k-no-nu";
      var b = "";
      b = v.match("s72-c") ? v.replace("/s72-c", w) : v.match("w72-h") ? v.replace("/w72-h72-p-k-no-nu", w) : v;
      t(window).on("load resize scroll", A);
      A();
    });
  };
});
$(function() {
  function t(b, a) {
    for (var c = 0; c < b[a].link.length; c++) {
      if (b[a].link[c].rel == "alternate") {
        var d = b[a].link[c].href;
        break;
      }
    }
    return d;
  }
  function A(b, a) {
    var c = b[a].published.$t;
    b = c.substring(0, 4);
    a = c.substring(5, 7);
    c = c.substring(8, 10);
    return '<span class="post-date">' + (monthFormat[parseInt(a, 10) - 1] + " " + c + ", " + b) + "</span>";
  }
  function u(b, a) {
    var c = b[a].title.$t, d = b[a].content.$t, q = $("<div>").html(d);
    "media$thumbnail" in b[a] ? (b = b[a].media$thumbnail.url, a = b.replace("/s72-c", "/w680"), b.match("img.youtube.com") && (a = b.replace("/default.", "/hqdefault."))) : a = d.indexOf("<img") > -1 ? q.find("img:first").attr("src") : noThumbnail;
    return '<img class="post-thumb" alt="' + c + '" src="' + a + '"/>';
  }
  function v(b, a) {
    b = b[a].content.$t;
    return '<p class="post-snippet">' + $("<div>").html(b).text().trim().substr(0, 86) + "\u2026</p>";
  }
  function w(b, a) {
    b = b[a].content.$t;
    return '<p class="post-snippet">' + $("<div>").html(b).text().trim().substr(0, 150) + "\u2026</p>";
  }
  function r(b, a, c, d) {
    if (a.match("mega-menu") || a.match("ticker-posts") || a.match("hot-posts") || a.match("slide-posts") || a.match("feat-big") || a.match("slider") || a.match("col-left") || a.match("col-right") || a.match("mini-slide") || a.match("grid-small") || a.match("grid-big") || a.match("feat-list") || a.match("post-list") || a.match("related")) {
      var q = "";
      q = d == "recent" ? "/feeds/posts/default?alt=json-in-script&max-results=" + c : d == "random" ? "/feeds/posts/default?max-results=" + c + "&start-index=" + (Math.floor(Math.random() * c) + 1) + "&alt=json-in-script" : "/feeds/posts/default/-/" + d + "?alt=json-in-script&max-results=" + c;
      $.ajax({url:q, type:"get", dataType:"jsonp", beforeSend:function() {
        a.match("ticker-posts") ? b.html('<ul class="loading-post">Loading......</ul>').parent().addClass("show-ticker") : a.match("hot-posts") ? b.html('<div class="hot-loader"/>').parent().addClass("show-hot") : a.match("slide-posts") ? b.html('<div class="loader"></div>').parent().addClass("show-slide") : a.match("slider") ? b.html('<div class="loader"></div>').parent().addClass("show-slider") : a.match("mini-slide") && b.html('<div class="loader"></div>').parent().addClass("show-slide");
      }, success:function(m) {
        if (a.match("mega-menu")) {
          var f = '<ul class="mega-menu-inner">';
        } else {
          a.match("ticker-posts") ? f = '<ul class="ticker-widget">' : a.match("hot-posts") ? f = '<ul class="hot-posts">' : a.match("slide-posts") ? f = '<ul class="slide-posts">' : a.match("feat-big") ? f = '<ul class="feat-big">' : a.match("slider") ? f = '<ul class="main-slider">' : a.match("col-right") || a.match("col-left") ? f = '<ul class="feat-col">' : a.match("mini-slide") ? f = '<ul class="slide-posts">' : a.match("grid-small") ? f = '<ul class="grid-small">' : a.match("grid-big") ? f = 
          '<ul class="grid-big">' : a.match("feat-list") ? f = '<ul class="feat-list">' : a.match("post-list") ? f = '<ul class="custom-widget">' : a.match("related") && (f = '<ul class="related-posts">');
        }
        m = m.feed.entry;
        if (m != void 0) {
          for (var e = 0; e < m.length; e++) {
            var g = t(m, e), l = '<a href="' + g + '">' + m[e].title.$t + "</a>", h = u(m, e), p = m[e].category != void 0 ? '<span class="post-tag">' + m[e].category[0].term + "</span>" : "", x = '<span class="post-author">' + m[e].author[0].name.$t + " </span>", n = A(m, e), y = v(m, e), B = w(m, e), k = "";
            a.match("mega-menu") ? k += '<div class="mega-item item-' + e + '"><div class="mega-content"><div class="post-image-wrap"><a class="post-image-link" href="' + g + '">' + h + "</a>" + p + '</div><h2 class="post-title">' + l + '</h2><div class="post-meta">' + n + "</div></div></div>" : a.match("ticker-posts") ? k += '<li class="ticker-item item-' + e + '"><a class="post-image-link" href="' + g + '">' + h + '</a><h2 class="post-title">' + l + "</h2>" + p + "</li>" : a.match("hot-posts") ? 
            k = e == 0 ? k + ('<li class="hot-item item-' + e + '"><div class="hot-item-inner"><a class="post-image-link" href="' + g + '">' + h + '</a><div class="post-info">' + p + '<h2 class="post-title">' + l + '</h2><div class="post-meta">' + x + n + "</div></div></div></li>") : k + ('<li class="hot-item item-' + e + '"><div class="hot-item-inner"><a class="post-image-link" href="' + g + '">' + h + '</a><div class="post-info">' + p + '<h2 class="post-title">' + l + '</h2><div class="post-meta">' + 
            n + "</div></div></div></li>") : a.match("slide-posts") ? k += '<li class="car-item item-' + (e + 1) + '"><div class="car-item-inner"><a class="post-image-link" href="' + g + '">' + h + '</a><div class="post-info-wrap"><div class="post-info">' + p + '<h2 class="post-title">' + l + '</h2><div class="post-meta">' + n + "</div>" + y + "</div></div></div></li>" : a.match("feat-big") ? k = e == 0 ? k + ('<li class="feat-item item-big item-' + e + '"><div class="feat-inner"><a class="post-image-link" href="' + 
            g + '">' + h + "</a>" + p + '<div class="post-info"><h2 class="post-title">' + l + '</h2><div class="post-meta">' + x + n + "</div>" + y + "</div></div></li>") : k + ('<li class="feat-item item-small item-' + e + '"><a class="post-image-link" href="' + g + '">' + h + '</a><div class="post-info"><h2 class="post-title">' + l + '</h2><div class="post-meta">' + n + "</div></div></li>") : a.match("slider") ? k += '<li class="slider-item item-' + (e + 1) + '"><div class="slider-item-inner"><a class="post-image-link" href="' + 
            g + '">' + h + '</a><div class="post-info-wrap"><div class="post-info">' + p + '<h2 class="post-title">' + l + '</h2><div class="post-meta">' + n + "</div>" + y + "</div></div></div></li>" : a.match("col-left") || a.match("col-right") ? k = e == 0 ? k + ('<li class="feat-item item-big item-' + e + '"><div class="feat-inner"><a class="post-image-link" href="' + g + '">' + h + "</a>" + p + '<div class="post-info"><h2 class="post-title">' + l + '</h2><div class="post-meta">' + x + n + "</div>" + 
            y + "</div></div></li>") : k + ('<li class="feat-item item-small item-' + e + '"><a class="post-image-link" href="' + g + '">' + h + '</a><div class="post-info"><h2 class="post-title">' + l + '</h2><div class="post-meta">' + n + "</div></div></li>") : a.match("mini-slide") ? k += '<li class="car-item item-' + (e + 1) + '"><div class="car-item-inner"><a class="post-image-link" href="' + g + '">' + h + '</a><div class="post-info-wrap"><div class="post-info">' + p + '<h2 class="post-title">' + 
            l + '</h2><div class="post-meta">' + n + "</div></div></div></div></li>" : a.match("grid-small") ? k += '<li class="feat-item item-small item-' + e + '"><div class="post-image-wrap"><a class="post-image-link" href="' + g + '">' + h + "</a>" + p + '</div><div class="post-info"><h2 class="post-title">' + l + '</h2><div class="post-meta">' + n + "</div></div></li>" : a.match("grid-big") ? k += '<li class="feat-item item-big item-' + e + '"><div class="feat-inner"><a class="post-image-link" href="' + 
            g + '">' + h + "</a>" + p + '<div class="post-info"><h2 class="post-title">' + l + '</h2><div class="post-meta">' + x + n + "</div>" + y + "</div></div></li>" : a.match("feat-list") ? k += '<li class="feat-item item-' + e + '"><div class="feat-inner"><a class="post-image-link" href="' + g + '">' + h + "</a>" + p + '<div class="post-info"><h2 class="post-title">' + l + '</h2><div class="post-meta">' + x + n + "</div>" + B + "</div></div></li>" : a.match("post-list") ? k += '<li class="item-' + 
            e + '"><a class="post-image-link" href="' + g + '">' + h + '</a><h2 class="post-title">' + l + '</h2><div class="post-meta">' + n + "</div></div></li>" : a.match("related") && (k += '<li class="related-item item-' + e + '"><div class="post-image-wrap"><a class="post-image-link" href="' + g + '">' + h + "</a>" + p + '</div><h2 class="post-title">' + l + '</h2><div class="post-meta">' + n + "</div></li>");
            f += k;
          }
          f += "</ul>";
        } else {
          f = '<ul class="no-posts">Error: No Posts Found <i class="fa fa-frown-o"/></ul>';
        }
        if (a.match("mega-menu")) {
          b.addClass("has-sub mega-menu").append(f), b.find("a:first").attr("href", function(C, z) {
            return z = d == "recent" || d == "random" ? z.replace(z, "/search/?&max-results=" + postPerPage) : z.replace(z, "/search/label/" + d + "?&max-results=" + postPerPage);
          });
        } else if (a.match("ticker-posts")) {
          b.html(f).parent().addClass("show-ticker"), b.find(".ticker-widget").owlCarousel({items:1, animateIn:"fadeInUp", animateOut:"fadeOutUp", smartSpeed:0, rtl:!1, nav:!0, navText:["", ""], loop:!0, autoplay:!0, autoplayHoverPause:!0, dots:!1, mouseDrag:!1, touchDrag:!1, freeDrag:!1, pullDrag:!1});
        } else if (a.match("hot-posts")) {
          b.html(f).parent().addClass("show-hot");
        } else if (a.match("slide-posts")) {
          b.html(f).parent().addClass("show-slide"), b.find(".slide-posts").owlCarousel({items:4, rtl:!1, nav:!0, navText:["", ""], loop:!0, margin:10, autoplay:!0, autoplayHoverPause:!0, dots:!1, mouseDrag:!1, touchDrag:!1, freeDrag:!1, pullDrag:!1, responsiveClass:!0, responsive:{0:{items:1}, 768:{items:3}, 1E3:{items:4, loop:!0}}}), b.parent().find(".widget-title").append('<a class="view-all" href="/search/label/' + d + "?&max-results=" + postPerPage + '">' + messages.viewAll + "</a>");
        } else if (a.match("slider")) {
          b.html(f).parent().addClass("show-slider"), b.find(".main-slider").owlCarousel({items:1, animateIn:"fadeInRight", animateOut:"fadeOutRight", smartSpeed:0, rtl:!1, nav:!0, navText:["", ""], loop:!0, autoplay:!0, autoplayHoverPause:!0, dots:!1, mouseDrag:!1, touchDrag:!1, freeDrag:!1, pullDrag:!1}), b.parent().find(".widget-title").append('<a class="view-all" href="/search/label/' + d + "?&max-results=" + postPerPage + '">' + messages.viewAll + "</a>");
        } else if (a.match("mini-slide")) {
          b.html(f).parent().addClass("show-slide"), b.find(".slide-posts").owlCarousel({items:3, rtl:!1, nav:!0, navText:["", ""], loop:!0, margin:10, autoplay:!1, autoplayHoverPause:!0, dots:!1, mouseDrag:!1, touchDrag:!1, freeDrag:!1, pullDrag:!1, responsiveClass:!0, responsive:{0:{items:1}, 768:{items:3}, 1E3:{items:3, loop:!0}}}), b.parent().find(".widget-title").append('<a class="view-all" href="/search/label/' + d + "?&max-results=" + postPerPage + '">' + messages.viewAll + "</a>");
        } else if (a.match("feat-big") || a.match("feat-list") || a.match("col-left") || a.match("col-right") || a.match("grid-small") || a.match("grid-big")) {
          b.parent().find(".widget-title").append('<a class="view-all" href="/search/label/' + d + "?&max-results=" + postPerPage + '">' + messages.viewAll + "</a>");
          if (a.match("col-left") || a.match("col-right")) {
            a.match("col-right") && b.parent().addClass("col-right"), b.parent().addClass("col-width");
          }
          b.html(f).parent().addClass("show-widget");
        } else {
          b.html(f);
        }
        b.find(".post-thumb").lazyyard();
      }});
    }
  }
  $(".index-post .post-image-link .post-thumb, .PopularPosts .post-image-link .post-thumb, .FeaturedPost .entry-image-link .post-thumb,.about-author .author-avatar, .item-post .post-body img").lazyyard();
  $("#main-menu").each(function() {
    for (var b = $(this).find(".LinkList ul > li").children("a"), a = b.length, c = 0; c < a; c++) {
      var d = b.eq(c), q = d.text();
      if (q.charAt(0) !== "_" && b.eq(c + 1).text().charAt(0) === "_") {
        var m = d.parent();
        m.append('<ul class="sub-menu m-sub"/>');
      }
      q.charAt(0) === "_" && (d.text(q.replace("_", "")), d.parent().appendTo(m.children(".sub-menu")));
    }
    for (c = 0; c < a; c++) {
      d = b.eq(c);
      q = d.text();
      if (q.charAt(0) !== "_" && b.eq(c + 1).text().charAt(0) === "_") {
        var f = d.parent();
        f.append('<ul class="sub-menu2 m-sub"/>');
      }
      q.charAt(0) === "_" && (d.text(q.replace("_", "")), d.parent().appendTo(f.children(".sub-menu2")));
    }
    $("#main-menu ul li ul").parent("li").addClass("has-sub");
    $("#main-menu ul > li a").each(function() {
      var e = $(this), g = e.text().trim(), l = g.toLowerCase(), h = g.split("-")[0];
      l.match("-text") && (e.attr("data-title", h), e.parent("li").addClass("li-home").find("> a").text(h));
      g.match("-icon") && (e.attr("data-title", h), e.parent("li").addClass("li-home li-home-icon").find("> a").html('<i class="fa fa-home"/>'));
    });
    $("#main-menu .widget").addClass("show-menu");
  });
  $("#main-menu-nav").clone().appendTo(".mobile-menu");
  $(".mobile-menu .has-sub").append('<div class="submenu-toggle"/>');
  $(".mobile-menu ul > li a").each(function() {
    var b = $(this), a = b.attr("href").trim(), c = a.toLowerCase();
    a = a.split("/")[0];
    var d = b.data("title");
    b.parent("li.li-home").find("> a").text(d);
    c.match("mega-menu") && b.attr("href", "/search/label/" + a + "?&max-results=" + postPerPage);
  });
  $(".slide-menu-toggle").on("click", function() {
    $("body").toggleClass("nav-active");
  });
  $(".mobile-menu ul li .submenu-toggle").on("click", function(b) {
    $(this).parent().hasClass("has-sub") && (b.preventDefault(), $(this).parent().hasClass("show") ? $(this).parent().removeClass("show").find("> .m-sub").slideToggle(170) : $(this).parent().addClass("show").children(".m-sub").slideToggle(170));
  });
  $(".show-search, .show-mobile-search").on("click", function() {
    $("#nav-search, .mobile-search-form").fadeIn(250).find("input").focus();
  });
  $(".hide-search, .hide-mobile-search").on("click", function() {
    $("#nav-search, .mobile-search-form").fadeOut(250).find("input").blur();
  });
  $(".Label a, a.b-label").attr("href", function(b, a) {
    return a.replace(a, a + "?&max-results=" + postPerPage);
  });
  $(".avatar-image-container img").attr("src", function(b, a) {
    a = a.replace("/s35-c/", "/s45-c/");
    return a = a.replace("//img1.blogblog.com/img/blank.gif", "//4.bp.blogspot.com/-uCjYgVFIh70/VuOLn-mL7PI/AAAAAAAADUs/Kcu9wJbv790hIo83rI_s7lLW3zkLY01EA/s55-r/avatar.png");
  });
  $(".index-post .post-image-link img").attr("src", function(b, a) {
    return a = a.replace("https://4.bp.blogspot.com/-O3EpVMWcoKw/WxY6-6I4--I/AAAAAAAAB2s/KzC0FqUQtkMdw7VzT6oOR_8vbZO6EJc-ACK4BGAYYCw/w680/nth.png", noThumbnail);
  });
  $(".author-description a").each(function() {
    $(this).attr("target", "_blank");
  });
  $.each($(".list-label li a"), function() {
    var b = "#" + ("000000" + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
    $(this).css("background-color", b);
  });
  $(".post-nav").each(function() {
    var b = $("a.prev-post-link").attr("href"), a = $("a.next-post-link").attr("href");
    $.ajax({url:b, type:"get", success:function(c) {
      c = $(c).find(".blog-post h1.post-title").text();
      $(".post-prev a .post-nav-inner p").text(c);
    }});
    $.ajax({url:a, type:"get", success:function(c) {
      c = $(c).find(".blog-post h1.post-title").text();
      $(".post-next a .post-nav-inner p").text(c);
    }});
  });
  $(".post-body strike").each(function() {
    var b = $(this), a = b.text();
    a.match("left-sidebar") && b.replaceWith("<style>.item #main-wrapper{float:right;padding:0 15px 0 0px}.item #sidebar-wrapper{float:left}margin:0}</style>");
    a.match("right-sidebar") && b.replaceWith("<style>.item #main-wrapper{float:left;padding:0 0 0 15px}.item #sidebar-wrapper{float:right}</style>");
    a.match("full-width") && b.replaceWith("<style>.item #main-wrapper{width:100%;padding:0}.item #sidebar-wrapper{display:none}.item #content-wrapper > .container{margin:0}</style>");
  });
  $("#main-wrapper, #sidebar-wrapper").each(function() {
    fixedSidebar == 1 && $(this).theiaStickySidebar({additionalMarginTop:25, additionalMarginBottom:25});
  });
  $(".back-top").each(function() {
    var b = $(this);
    $(window).on("scroll", function() {
      $(this).scrollTop() >= 100 ? b.fadeIn(250) : b.fadeOut(250);
    });
    b.click(function() {
      $("html, body").animate({scrollTop:0}, 500);
    });
  });
  $("#main-menu #main-menu-nav li").each(function() {
    var b = $(this), a = b.find("a").attr("href").trim(), c = a.toLowerCase();
    a = a.split("/")[0];
    r(b, c, 5, a);
  });
  $("#break-section .widget-content").each(function() {
    var b = $(this), a = b.text().trim(), c = a.toLowerCase();
    a = a.split("/");
    r(b, c, a[0], a[1]);
  });
  $("#hot-section .widget-content").each(function() {
    var b = $(this), a = b.text().trim(), c = a.toLowerCase();
    a = a.split("/")[0];
    r(b, c, 4, a);
  });
  $("#carousel-section .widget-content").each(function() {
    var b = $(this), a = b.text().trim(), c = a.toLowerCase();
    a = a.split("/");
    r(b, c, a[0], a[1]);
  });
  $(".featured-posts .widget-content").each(function() {
    var b = $(this), a = b.text().trim(), c = a.toLowerCase(), d = a.split("/");
    c.match("feat-big") ? (a = 5, d = d[0]) : (a = d[0], d = d[1]);
    r(b, c, a, d);
  });
  $(".common-widget .widget-content").each(function() {
    var b = $(this), a = b.text().trim(), c = a.toLowerCase();
    a = a.split("/");
    r(b, c, a[0], a[1]);
  });
  $(".related-ready").each(function() {
    var b = $(this), a = b.find(".related-tag").data("label");
    r(b, "related", 3, a);
  });
  $(".blog-post-comments").each(function() {
    var b = commentsSystem, a = '<div class="fb-comments" data-width="100%" data-href="' + $(location).attr("href") + '" data-numposts="5"></div>', c = "comments-system-" + b;
    b == "blogger" ? $(this).addClass(c).show() : b == "disqus" ? (b = document.createElement("script"), b.type = "text/javascript", b.async = !0, b.src = "//" + disqusShortname + ".disqus.com/embed.js", (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(b), $("#comments, #gpluscomments").remove(), $(this).append('<div id="disqus_thread"/>').addClass(c).show()) : b == "facebook" ? ($("#comments, #gpluscomments").remove(), $(this).append(a).addClass(c).show()) : 
    b == "hide" ? $(this).hide() : $(this).addClass("comments-system-default").show();
  });
});
$(document).scroll(function() {
  if (fixedMenu == 1) {
    $(window).on("scroll", function(t) {
      $(this).scrollTop() < 240 ? ($(".header-header").height(), $(".header-menu, .mobile-header").removeClass("scrolled-header")) : ($(".header-menu, .mobile-header").addClass("scrolled-header"),   $("body").css({marginTop:0}));
    });
  }
});
