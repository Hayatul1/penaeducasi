//<![CDATA[
$(function(a) {
    a.fn.lazyyard = function() {
        return this.each(function() {
            var b = a(this),
                c = b.attr("src"),
                d = Math.round(b.width()),
                e = Math.round(b.height()),
                f = "/w" + d + "-h" + e + "-p-k-no-nu",
                g = "";
            if (c.match("s72-c")) g = c.replace("/s72-c", f);
            else if (c.match("w72-h")) g = c.replace("/w72-h72-p-k-no-nu", f);
            else g = c;
            a(window).on("load resize scroll", h);

            function h() {
                var c = a(window).height(),
                    d = a(window).scrollTop(),
                    e = b.offset().top;
                if (d + c > e) {
                    var f = new Image();
                    f.onload = function() {
                        b.addClass("lazy-yard");
                    }, f.src = g;
                }
            }
            h();
        });
    };
});
$(function() {
$('.index-post .post-image-link .post-thumb, .PopularPosts .post-image-link .post-thumb, .FeaturedPost .entry-image-link .post-thumb,.about-author .author-avatar, .item-post .post-body img').lazyyard();
    $('#main-menu').each(function() {
        var iTms = $(this).find('.LinkList ul > li').children('a'),
            iLen = iTms.length;
        for (var i = 0; i < iLen; i++) {
            var i1 = iTms.eq(i),
                t1 = i1.text();
            if (t1.charAt(0) !== '_') {
                var i2 = iTms.eq(i + 1),
                    t2 = i2.text();
                if (t2.charAt(0) === '_') {
                    var l1 = i1.parent();
                    l1.append('<ul class="sub-menu m-sub"/>');
                }
            }
            if (t1.charAt(0) === '_') {
                i1.text(t1.replace('_', ''));
                i1.parent().appendTo(l1.children('.sub-menu'));
            }
        }
        for (var i = 0; i < iLen; i++) {
            var i3 = iTms.eq(i),
                t3 = i3.text();
            if (t3.charAt(0) !== '_') {
                var i4 = iTms.eq(i + 1),
                    t4 = i4.text();
                if (t4.charAt(0) === '_') {
                    var l2 = i3.parent();
                    l2.append('<ul class="sub-menu2 m-sub"/>');
                }
            }
            if (t3.charAt(0) === '_') {
                i3.text(t3.replace('_', ''));
                i3.parent().appendTo(l2.children('.sub-menu2'));
            }
        }
        $('#main-menu ul li ul').parent('li').addClass('has-sub');
  $('#main-menu ul > li a').each(function() {
            var $this = $(this),
                txt = $this.text().trim(),
                mtc = txt.toLowerCase(),
                sp = txt.split('-'),
                title = sp[0];
            if (mtc.match('-text')) {
                $this.attr('data-title', title);
                $this.parent('li').addClass('li-home').find('> a').text(title);
            }
            if (txt.match('-icon')) {
                $this.attr('data-title', title);
                $this.parent('li').addClass('li-home li-home-icon').find('> a').html('<i class="fa fa-home"/>');
            }
        });
        $('#main-menu .widget').addClass('show-menu');
    });
    $('#main-menu-nav').clone().appendTo('.mobile-menu');
    $('.mobile-menu .has-sub').append('<div class="submenu-toggle"/>');
    $('.mobile-menu ul > li a').each(function() {
        var $this = $(this),
            text = $this.attr('href').trim(),
            type = text.toLowerCase(),
            map = text.split('/'),
            label = map[0],
            title = $this.data('title');
            $this.parent('li.li-home').find('> a').text(title);
        if (type.match('mega-menu')) {
            $this.attr('href', '/search/label/' + label + '?&max-results=' + postPerPage);
        }
    });
    $('.slide-menu-toggle').on('click', function() {
        $('body').toggleClass('nav-active');
    });
    $('.mobile-menu ul li .submenu-toggle').on('click', function($this) {
        if ($(this).parent().hasClass('has-sub')) {
            $this.preventDefault();
            if (!$(this).parent().hasClass('show')) {
                $(this).parent().addClass('show').children('.m-sub').slideToggle(170);
            } else {
                $(this).parent().removeClass('show').find('> .m-sub').slideToggle(170);
            }
        }
    });
    $('.show-search, .show-mobile-search').on('click', function() {
        $('#nav-search, .mobile-search-form').fadeIn(250).find('input').focus();
    });
    $('.hide-search, .hide-mobile-search').on('click', function() {
        $('#nav-search, .mobile-search-form').fadeOut(250).find('input').blur();
    });
    $('.Label a, a.b-label').attr('href', function($this, href) {
        return href.replace(href, href + '?&max-results=' + postPerPage);
    });
    $('.avatar-image-container img').attr('src', function($this, i) {
        i = i.replace('/s35-c/', '/s45-c/');
        i = i.replace('//img1.blogblog.com/img/blank.gif', '//4.bp.blogspot.com/-uCjYgVFIh70/VuOLn-mL7PI/AAAAAAAADUs/Kcu9wJbv790hIo83rI_s7lLW3zkLY01EA/s55-r/avatar.png');
        return i;
    });
    $('.index-post .post-image-link img').attr('src', function($this, i) {
        i = i.replace('https://4.bp.blogspot.com/-O3EpVMWcoKw/WxY6-6I4--I/AAAAAAAAB2s/KzC0FqUQtkMdw7VzT6oOR_8vbZO6EJc-ACK4BGAYYCw/w680/nth.png', noThumbnail);
        return i;
    });
    $('.author-description a').each(function() {
        $(this).attr('target', '_blank');
    });
    $.each($('.list-label li a'), function() {
    var new_color =  '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
    $(this).css('background-color', new_color);
    });
    $('.post-nav').each(function() {
        var getURL_prev = $('a.prev-post-link').attr('href'),
            getURL_next = $('a.next-post-link').attr('href');
        $.ajax({
            url: getURL_prev,
            type: 'get',
            success: function(prev) {
                var title = $(prev).find('.blog-post h1.post-title').text();
                $('.post-prev a .post-nav-inner p').text(title);
            }
        });
        $.ajax({
            url: getURL_next,
            type: 'get',
            success: function(next) {
                var title = $(next).find('.blog-post h1.post-title').text();
                $('.post-next a .post-nav-inner p').text(title);
            }
        });
    });
    $('.post-body strike').each(function() {
        var $this = $(this),
            type = $this.text();
        if (type.match('left-sidebar')) {
            $this.replaceWith('<style>.item #main-wrapper{float:right;padding:0 15px 0 0px}.item #sidebar-wrapper{float:left}margin:0}</style>');
        }
        if (type.match('right-sidebar')) {
            $this.replaceWith('<style>.item #main-wrapper{float:left;padding:0 0 0 15px}.item #sidebar-wrapper{float:right}</style>');
        }
        if (type.match('full-width')) {
            $this.replaceWith('<style>.item #main-wrapper{width:100%;padding:0}.item #sidebar-wrapper{display:none}.item #content-wrapper > .container{margin:0}</style>');
        }
    });
    $('#main-wrapper, #sidebar-wrapper').each(function() {
        if (fixedSidebar == true) {
            $(this).theiaStickySidebar({
                additionalMarginTop: 25,
                additionalMarginBottom: 25
            });
        }
    });
    $('.back-top').each(function() {
        var $this = $(this);
        $(window).on('scroll', function() {
            $(this).scrollTop() >= 100 ? $this.fadeIn(250) : $this.fadeOut(250)
        }), $this.click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 500)
        });
    });
    $('#main-menu #main-menu-nav li').each(function() {
        var li = $(this),
            text = li.find('a').attr('href').trim(),
            $this = li,
            type = text.toLowerCase(),
            map = text.split('/'),
            label = map[0];
        ajaxPosts($this, type, 5, label);
    });
    $('#break-section .widget-content').each(function() {
        var $this = $(this),
            text = $this.text().trim(),
            type = text.toLowerCase(),
            map = text.split('/'),
            num = map[0],
            label = map[1];
        ajaxPosts($this, type, num, label);
    });
    $('#hot-section .widget-content').each(function() {
        var $this = $(this),
            text = $this.text().trim(),
            type = text.toLowerCase(),
            map = text.split('/'),
            label = map[0];
        ajaxPosts($this, type, 4, label);
    });
    $('#carousel-section .widget-content').each(function() {
        var $this = $(this),
            text = $this.text().trim(),
            type = text.toLowerCase(),
            map = text.split('/'),
            num = map[0],
            label = map[1];
        ajaxPosts($this, type, num, label);
    });
    $('.featured-posts .widget-content').each(function() {
        var $this = $(this),
            text = $this.text().trim(),
            type = text.toLowerCase(),
            map = text.split('/');
        if (type.match('feat-big')) {
            var num = 5,
                label = map[0];
        } else {
            num = map[0], label = map[1];
        }
        ajaxPosts($this, type, num, label);
    });
    $('.common-widget .widget-content').each(function() {
        var $this = $(this),
            text = $this.text().trim(),
            type = text.toLowerCase(),
            map = text.split('/'),
            num = map[0],
            label = map[1];
        ajaxPosts($this, type, num, label);
    });
    $('.related-ready').each(function() {
        var $this = $(this),
            label = $this.find('.related-tag').data('label');
        ajaxPosts($this, 'related', 3, label);
    });

    function post_link(feed, i) {
        for (var x = 0; x < feed[i].link.length; x++)
            if (feed[i].link[x].rel == 'alternate') {
                var link = feed[i].link[x].href;
                break
            }
        return link;
    }

    function post_title(feed, i, link) {
        var n = feed[i].title.$t,
            code = '<a href="' + link + '">' + n + '</a>';
        return code;
    }

    function post_author(feed, i) {
        var n = feed[i].author[0].name.$t,
            code = '<span class="post-author">' + n + ' </span>';
        return code;
    }

    function post_date(feed, i) {
        var c = feed[i].published.$t,
            d = c.substring(0, 4),
            f = c.substring(5, 7),
            m = c.substring(8, 10),
            h = monthFormat[parseInt(f, 10) - 1] + ' ' + m + ', ' + d,
            code = '<span class="post-date">' + h + '</span>';
        return code;
    }

  
function post_image(feed, i) {
        var n = feed[i].title.$t,
            p = feed[i].content.$t,
            u = $('<div>').html(p);
        if ('media$thumbnail' in feed[i]) {
            var src = feed[i].media$thumbnail.url,
                s1 = src.replace('/s72-c', '/w680');
          if (src.match('img.youtube.com')) {
                s1 = src.replace('/default.', '/hqdefault.');
            }
        } else if (p.indexOf('<img') > -1) {
            s1 = u.find('img:first').attr('src');
        } else {
            s1 = noThumbnail;
        }
        var code = '<img class="post-thumb" alt="' + n + '" src="' + s1 + '"/>';
        return code;
    }
    function post_label(feed, i) {
        if (feed[i].category != undefined) {
            var tag = feed[i].category[0].term,
                code = '<span class="post-tag">' + tag + '</span>';
        } else {
            code = '';
        }
        return code;
    }
function post_snip(feed, i) {
        var p = feed[i].content.$t,
            u = $("<div>").html(p),
            g = u.text().trim().substr(0, 86),
            code = '<p class="post-snippet">' + g + '…</p>';
        return code;
    }
function post_snipp(feed, i) {
        var para = feed[i].content.$t,
            ulu = $("<div>").html(para),
            godi = ulu.text().trim().substr(0, 150),
            code = '<p class="post-snippet">' + godi + '…</p>';
        return code;
    }
    function ajaxPosts($this, type, num, label) {
        if (type.match('mega-menu') || type.match('ticker-posts') || type.match('hot-posts') || type.match('slide-posts') || type.match('feat-big') || type.match('slider') || type.match('col-left') || type.match('col-right') || type.match('mini-slide') || type.match('grid-small') || type.match('grid-big') || type.match('feat-list') || type.match('post-list') || type.match('related')) {
            var url = '';
            if (label == 'recent') {
                url = '/feeds/posts/default?alt=json-in-script&max-results=' + num;
            } else if (label == 'random') {
                var index = Math.floor(Math.random() * num) + 1;
                url = '/feeds/posts/default?max-results=' + num + '&start-index=' + index + '&alt=json-in-script';
            } else {
                url = '/feeds/posts/default/-/' + label + '?alt=json-in-script&max-results=' + num;
            }
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'jsonp',
                beforeSend: function() {
                    if (type.match('ticker-posts')) {
                        $this.html('<ul class="loading-post">Loading......</ul>').parent().addClass('show-ticker');
                    } else if (type.match('hot-posts')) {
                        $this.html('<div class="hot-loader"/>').parent().addClass('show-hot');
                    } else if (type.match('slide-posts')) {
                        $this.html('<div class="loader"></div>').parent().addClass('show-slide');
                    } else if (type.match('slider')) {
                        $this.html('<div class="loader"></div>').parent().addClass('show-slider');
                    } else if (type.match('mini-slide')) {
                        $this.html('<div class="loader"></div>').parent().addClass('show-slide');
                    } 
                },
                success: function(json) {
                    if (type.match('mega-menu')) {
                        var kode = '<ul class="mega-menu-inner">';
                    } else if (type.match('ticker-posts')) {
                        var kode = '<ul class="ticker-widget">';
                    } else if (type.match('hot-posts')) {
                        var kode = '<ul class="hot-posts">';
                    } else if (type.match('slide-posts')) {
                        var kode = '<ul class="slide-posts">';
                    } else if (type.match('feat-big')) {
                        var kode = '<ul class="feat-big">';
                    } else if (type.match('slider')) {
                        var kode = '<ul class="main-slider">';
                    } else if (type.match('col-right') || type.match('col-left')) {
                        var kode = '<ul class="feat-col">';
                    } else if (type.match('mini-slide')) {
                        var kode = '<ul class="slide-posts">';
                    } else if (type.match('grid-small')) {
                        var kode = '<ul class="grid-small">';
                    } else if (type.match('grid-big')) {
                        var kode = '<ul class="grid-big">';
                    } else if (type.match('feat-list')) {
                        var kode = '<ul class="feat-list">';
                    } else if (type.match('post-list')) {
                        var kode = '<ul class="custom-widget">';
                    } else if (type.match('related')) {
                        var kode = '<ul class="related-posts">';
                    }
                    var entry = json.feed.entry;
                    if (entry != undefined) {
                        for (var i = 0, feed = entry; i < feed.length; i++) {
                            var link = post_link(feed, i),
                                title = post_title(feed, i, link),
                                image = post_image(feed, i),
                                tag = post_label(feed, i),
                                author = post_author(feed, i),
                                date = post_date(feed, i),
                                snip = post_snip(feed, i),
                                snipp = post_snipp(feed, i);
                            var kontent = '';
                            if (type.match('mega-menu')) {
                                kontent += '<div class="mega-item item-' + i + '"><div class="mega-content"><div class="post-image-wrap"><a class="post-image-link" href="' + link + '">' + image + '</a>' + tag + '</div><h2 class="post-title">' + title + '</h2><div class="post-meta">' + date + '</div></div></div>';
                            } else if (type.match('ticker-posts')) {
                                kontent += '<li class="ticker-item item-' + i + '"><a class="post-image-link" href="' + link + '">' + image + '</a><h2 class="post-title">' + title + '</h2>' + tag + '</li>';
                            } else if (type.match('hot-posts')) {
                                if (i == 0) {
                                    kontent += '<li class="hot-item item-' + i + '"><div class="hot-item-inner"><a class="post-image-link" href="' + link + '">' + image + '</a><div class="post-info">' + tag + '<h2 class="post-title">' + title + '</h2><div class="post-meta">' + author + date + '</div></div></div></li>';
                                } else {
                                    kontent += '<li class="hot-item item-' + i + '"><div class="hot-item-inner"><a class="post-image-link" href="' + link + '">' + image + '</a><div class="post-info">' + tag + '<h2 class="post-title">' + title + '</h2><div class="post-meta">' + date + '</div></div></div></li>';
                                }
                            } else if (type.match('slide-posts')) {
                                kontent += '<li class="car-item item-' + (i + 1) + '"><div class="car-item-inner"><a class="post-image-link" href="' + link + '">' + image + '</a><div class="post-info-wrap"><div class="post-info">' + tag + '<h2 class="post-title">' + title + '</h2><div class="post-meta">' + date + '</div>' + snip + '</div></div></div></li>';
                            } else if (type.match('feat-big')) {
                                if (i == 0) {
                                    kontent += '<li class="feat-item item-big item-' + i + '"><div class="feat-inner"><a class="post-image-link" href="' + link + '">' + image + '</a>' + tag + '<div class="post-info"><h2 class="post-title">' + title + '</h2><div class="post-meta">' + author + date + '</div>' + snip + '</div></div></li>';
                                } else {
                                    kontent += '<li class="feat-item item-small item-' + i + '"><a class="post-image-link" href="' + link + '">' + image + '</a><div class="post-info"><h2 class="post-title">' + title + '</h2><div class="post-meta">' + date + '</div></div></li>';
                                }
                            } else if (type.match('slider')) {
                                kontent += '<li class="slider-item item-' + (i + 1) + '"><div class="slider-item-inner"><a class="post-image-link" href="' + link + '">' + image + '</a><div class="post-info-wrap"><div class="post-info">' + tag + '<h2 class="post-title">' + title + '</h2><div class="post-meta">' + date + '</div>' + snip + '</div></div></div></li>';
                            } else if (type.match('col-left') || type.match('col-right')) {
                                if (i == 0) {
                                    kontent += '<li class="feat-item item-big item-' + i + '"><div class="feat-inner"><a class="post-image-link" href="' + link + '">' + image + '</a>' + tag + '<div class="post-info"><h2 class="post-title">' + title + '</h2><div class="post-meta">' + author + date + '</div>' + snip + '</div></div></li>';
                                } else {
                                    kontent += '<li class="feat-item item-small item-' + i + '"><a class="post-image-link" href="' + link + '">' + image + '</a><div class="post-info"><h2 class="post-title">' + title + '</h2><div class="post-meta">' + date + '</div></div></li>';
                                }
                            } else if (type.match('mini-slide')) {
                                kontent += '<li class="car-item item-' + (i + 1) + '"><div class="car-item-inner"><a class="post-image-link" href="' + link + '">' + image + '</a><div class="post-info-wrap"><div class="post-info">' + tag + '<h2 class="post-title">' + title + '</h2><div class="post-meta">' + date + '</div></div></div></div></li>';
                            } else if (type.match('grid-small')) {
                                kontent += '<li class="feat-item item-small item-' + i + '"><div class="post-image-wrap"><a class="post-image-link" href="' + link + '">' + image + '</a>' + tag + '</div><div class="post-info"><h2 class="post-title">' + title + '</h2><div class="post-meta">' + date + '</div></div></li>';
                            } else if (type.match('grid-big')) {
                                kontent += '<li class="feat-item item-big item-' + i + '"><div class="feat-inner"><a class="post-image-link" href="' + link + '">' + image + '</a>' + tag + '<div class="post-info"><h2 class="post-title">' + title + '</h2><div class="post-meta">' + author + date + '</div>' + snip + '</div></div></li>';
                            } else if (type.match('feat-list')) {
                                kontent += '<li class="feat-item item-' + i + '"><div class="feat-inner"><a class="post-image-link" href="' + link + '">' + image + '</a>' + tag + '<div class="post-info"><h2 class="post-title">' + title + '</h2><div class="post-meta">' + author + date + '</div>' + snipp + '</div></div></li>';
                            } else if (type.match('post-list')) {
                                kontent += '<li class="item-' + i + '"><a class="post-image-link" href="' + link + '">' + image + '</a><h2 class="post-title">' + title + '</h2><div class="post-meta">' + date + '</div></div></li>';
                            } else if (type.match('related')) {
                                kontent += '<li class="related-item item-' + i + '"><div class="post-image-wrap"><a class="post-image-link" href="' + link + '">' + image + '</a>' + tag + '</div><h2 class="post-title">' + title + '</h2><div class="post-meta">' + date + '</div></li>';
                            }
                            kode += kontent;
                        }
                        kode += '</ul>';
                    } else {
                        kode = '<ul class="no-posts">Error: No Posts Found <i class="fa fa-frown-o"/></ul>';
                    }
                    if (type.match("mega-menu")) {
                        $this.addClass('has-sub mega-menu').append(kode);
                        $this.find('a:first').attr('href', function($this, href) {
                            if (label == 'recent' || label == 'random') {
                                href = href.replace(href, '/search/?&max-results=' + postPerPage);
                            } else {
                                href = href.replace(href, '/search/label/' + label + '?&max-results=' + postPerPage);
                            }
                            return href;
                        });
                    } else if (type.match('ticker-posts')) {
                        $this.html(kode).parent().addClass('show-ticker');
                        var $newsticker = $this.find('.ticker-widget');
                                $newsticker.owlCarousel({
                                    items: 1,
                                    animateIn: 'fadeInUp',
                                    animateOut: 'fadeOutUp',
                                    smartSpeed: 0,
                                    rtl: false,
                                    nav: true,
                                    navText: ['', ''],
                                    loop: true,
                                    autoplay: true,
                                    autoplayHoverPause: true,
                                    dots: false,
                                    mouseDrag: false,
                                    touchDrag: false,
                                    freeDrag: false,
                                    pullDrag: false
                                });
                    } else if (type.match('hot-posts')) {
                        $this.html(kode).parent().addClass('show-hot');
                    } else if (type.match('slide-posts')) {
                        $this.html(kode).parent().addClass('show-slide');
                        var $maincar = $this.find('.slide-posts');
                        $maincar.owlCarousel({
                                    items: 4,
                                    rtl: false,
                                    nav: true,
                                    navText: ['', ''],
                                    loop: true,
                                    margin:10,
                                    autoplay: true,
                                    autoplayHoverPause: true,
                                    dots: false,
                                    mouseDrag: false,
                                    touchDrag: false,
                                    freeDrag: false,
                                    pullDrag: false,
                                    responsiveClass: true,
                                              responsive: {
                                                0: {
                                                  items: 1
                                                },
                                                768: {
                                                  items: 3 
                                                },
                                                1000: {
                                                  items: 4,
                                                  loop: true
                                                }
                                               }
                                });
$this.parent().find('.widget-title').append('<a class="view-all" href="/search/label/' + label + '?&max-results=' + postPerPage + '">' + messages.viewAll + '</a>');
                    } else if (type.match('slider')) {
                        $this.html(kode).parent().addClass('show-slider');
                        var $mainslider = $this.find('.main-slider');
                        $mainslider.owlCarousel({
                                    items: 1,
                                    animateIn: 'fadeInRight',
                                    animateOut: 'fadeOutRight',
                                    smartSpeed: 0,
                                    rtl: false,
                                    nav: true,
                                    navText: ['', ''],
                                    loop: true,
                                    autoplay: true,
                                    autoplayHoverPause: true,
                                    dots: false,
                                    mouseDrag: false,
                                    touchDrag: false,
                                    freeDrag: false,
                                    pullDrag: false
                                });
$this.parent().find('.widget-title').append('<a class="view-all" href="/search/label/' + label + '?&max-results=' + postPerPage + '">' + messages.viewAll + '</a>');
                    } else if (type.match('mini-slide')) {
                        $this.html(kode).parent().addClass('show-slide');
                        var $minicar = $this.find('.slide-posts');
                        $minicar.owlCarousel({
                                    items: 3,
                                    rtl: false,
                                    nav: true,
                                    navText: ['', ''],
                                    loop: true,
                                    margin:10,
                                    autoplay: false,
                                    autoplayHoverPause: true,
                                    dots: false,
                                    mouseDrag: false,
                                    touchDrag: false,
                                    freeDrag: false,
                                    pullDrag: false,
                                    responsiveClass: true,
                                              responsive: {
                                                0: {
                                                  items: 1
                                                },
                                                768: {
                                                  items: 3 
                                                },
                                                1000: {
                                                  items: 3,
                                                  loop: true
                                                }
                                               }
                                });
$this.parent().find('.widget-title').append('<a class="view-all" href="/search/label/' + label + '?&max-results=' + postPerPage + '">' + messages.viewAll + '</a>');
                    } else if (type.match('feat-big') || type.match('feat-list') || type.match('col-left') || type.match('col-right') || type.match('grid-small') || type.match('grid-big')) {
                        $this.parent().find('.widget-title').append('<a class="view-all" href="/search/label/' + label + '?&max-results=' + postPerPage + '">' + messages.viewAll + '</a>');
                        if (type.match('col-left') || type.match('col-right')) {
                            if (type.match('col-right')) {
                                $this.parent().addClass('col-right');
                            }
                            $this.parent().addClass('col-width');
                        }
                        $this.html(kode).parent().addClass('show-widget');
                    } else {
                        $this.html(kode);
                    }
$this.find('.post-thumb').lazyyard();
                }
            });
        }
    }
    $('.blog-post-comments').each(function() {
        var system = commentsSystem,
            disqus_url = disqus_blogger_current_url,
            disqus = '<div id="disqus_thread"/>',
            current_url = $(location).attr('href'),
            facebook = '<div class="fb-comments" data-width="100%" data-href="' + current_url + '" data-numposts="5"></div>',
            sClass = 'comments-system-' + system;
        if (system == 'blogger') {
            $(this).addClass(sClass).show();
        } else if (system == 'disqus') {
            (function() {
                var dsq = document.createElement('script');
                dsq.type = 'text/javascript';
                dsq.async = true;
                dsq.src = '//' + disqusShortname + '.disqus.com/embed.js';
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            })();
            $('#comments, #gpluscomments').remove();
            $(this).append(disqus).addClass(sClass).show();
        } else if (system == 'facebook') {
            $('#comments, #gpluscomments').remove();
            $(this).append(facebook).addClass(sClass).show();
        } else if (system == 'hide') {
            $(this).hide();
        } else {
            $(this).addClass('comments-system-default').show();
        }
    });
})
$(document).scroll(function(){
if (fixedMenu == true) {
  $(window).on("scroll", function(e){   
    var height = 0;
    var scrollTop = $(this).scrollTop();
    if ( scrollTop < 240 ) {
      height = $(".header-header").height();
      $(".header-menu, .mobile-header").removeClass("scrolled-header");
    }   
    else {
      $(".header-menu, .mobile-header").addClass("scrolled-header");
      $("body").css({"marginTop": height});
    }
  });
}
});
