//Javascript minified Code 
, $((function(t){t.fn.lazyyard=function(){return this.each((function(){var a=t(this),s=a.attr("src"),e="/w"+Math.round(a.width())+"-h"+Math.round(a.height())+"-p-k-no-nu",i="";function l(){var s=t(window).height();if(t(window).scrollTop()+s>a.offset().top){var e=new Image;e.onload=function(){a.addClass("lazy-yard")},e.src=i}}i=s.match("s72-c")?s.replace("/s72-c",e):s.match("w72-h")?s.replace("/w72-h72-p-k-no-nu",e):s,t(window).on("load resize scroll",l),l()}))}})),$((function(){function t(t,a){for(var s=0;s<t[a].link.length;s++)if("alternate"==t[a].link[s].rel){var e=t[a].link[s].href;break}return e}function a(t,a,s){return'<a href="'+s+'">'+t[a].title.$t+"</a>"}function s(t,a){return'<span class="post-author">'+t[a].author[0].name.$t+" </span>"}function e(t,a){var s=t[a].published.$t,e=s.substring(0,4),i=s.substring(5,7),l=s.substring(8,10);return'<span class="post-date">'+(monthFormat[parseInt(i,10)-1]+" "+l+", "+e)+"</span>"}function i(t,a){var s=t[a].title.$t,e=t[a].content.$t,i=$("<div>").html(e);if("media$thumbnail"in t[a]){var l=t[a].media$thumbnail.url,o=l.replace("/s72-c","/w680");l.match("img.youtube.com")&&(o=l.replace("/default.","/hqdefault."))}else o=e.indexOf("<img")>-1?i.find("img:first").attr("src"):noThumbnail;return'<img class="post-thumb" alt="'+s+'" src="'+o+'"/>'}function l(t,a){if(null!=t[a].category)var s='<span class="post-tag">'+t[a].category[0].term+"</span>";else s="";return s}function o(t,a){var s=t[a].content.$t;return'<p class="post-snippet">'+$("<div>").html(s).text().trim().substr(0,86)+"…</p>"}function r(t,a){var s=t[a].content.$t;return'<p class="post-snippet">'+$("<div>").html(s).text().trim().substr(0,150)+"…</p>"}function n(n,c,d,m){if(c.match("mega-menu")||c.match("ticker-posts")||c.match("hot-posts")||c.match("slide-posts")||c.match("feat-big")||c.match("slider")||c.match("col-left")||c.match("col-right")||c.match("mini-slide")||c.match("grid-small")||c.match("grid-big")||c.match("feat-list")||c.match("post-list")||c.match("related")){var h="";if("recent"==m)h="/feeds/posts/default?alt=json-in-script&max-results="+d;else if("random"==m){h="/feeds/posts/default?max-results="+d+"&start-index="+(Math.floor(Math.random()*d)+1)+"&alt=json-in-script"}else h="/feeds/posts/default/-/"+m+"?alt=json-in-script&max-results="+d;$.ajax({url:h,type:"get",dataType:"jsonp",beforeSend:function(){c.match("ticker-posts")?n.html('<ul class="loading-post">Loading......</ul>').parent().addClass("show-ticker"):c.match("hot-posts")?n.html('<div class="hot-loader"/>').parent().addClass("show-hot"):c.match("slide-posts")?n.html('<div class="loader"></div>').parent().addClass("show-slide"):c.match("slider")?n.html('<div class="loader"></div>').parent().addClass("show-slider"):c.match("mini-slide")&&n.html('<div class="loader"></div>').parent().addClass("show-slide")},success:function(d){if(c.match("mega-menu"))var h='<ul class="mega-menu-inner">';else if(c.match("ticker-posts"))h='<ul class="ticker-widget">';else if(c.match("hot-posts"))h='<ul class="hot-posts">';else if(c.match("slide-posts"))h='<ul class="slide-posts">';else if(c.match("feat-big"))h='<ul class="feat-big">';else if(c.match("slider"))h='<ul class="main-slider">';else if(c.match("col-right")||c.match("col-left"))h='<ul class="feat-col">';else if(c.match("mini-slide"))h='<ul class="slide-posts">';else if(c.match("grid-small"))h='<ul class="grid-small">';else if(c.match("grid-big"))h='<ul class="grid-big">';else if(c.match("feat-list"))h='<ul class="feat-list">';else if(c.match("post-list"))h='<ul class="custom-widget">';else if(c.match("related"))h='<ul class="related-posts">';var p=d.feed.entry;if(null!=p){for(var u=0,f=p;u<f.length;u++){var v=t(f,u),g=a(f,u,v),b=i(f,u),w=l(f,u),$=s(f,u),k=e(f,u),x=o(f,u),C=r(f,u),y="";c.match("mega-menu")?y+='<div class="mega-item item-'+u+'"><div class="mega-content"><div class="post-image-wrap"><a class="post-image-link" href="'+v+'">'+b+"</a>"+w+'</div><h2 class="post-title">'+g+'</h2><div class="post-meta">'+k+"</div></div></div>":c.match("ticker-posts")?y+='<li class="ticker-item item-'+u+'"><a class="post-image-link" href="'+v+'">'+b+'</a><h2 class="post-title">'+g+"</h2>"+w+"</li>":c.match("hot-posts")?y+=0==u?'<li class="hot-item item-'+u+'"><div class="hot-item-inner"><a class="post-image-link" href="'+v+'">'+b+'</a><div class="post-info">'+w+'<h2 class="post-title">'+g+'</h2><div class="post-meta">'+$+k+"</div></div></div></li>":'<li class="hot-item item-'+u+'"><div class="hot-item-inner"><a class="post-image-link" href="'+v+'">'+b+'</a><div class="post-info">'+w+'<h2 class="post-title">'+g+'</h2><div class="post-meta">'+k+"</div></div></div></li>":c.match("slide-posts")?y+='<li class="car-item item-'+(u+1)+'"><div class="car-item-inner"><a class="post-image-link" href="'+v+'">'+b+'</a><div class="post-info-wrap"><div class="post-info">'+w+'<h2 class="post-title">'+g+'</h2><div class="post-meta">'+k+"</div>"+x+"</div></div></div></li>":c.match("feat-big")?y+=0==u?'<li class="feat-item item-big item-'+u+'"><div class="feat-inner"><a class="post-image-link" href="'+v+'">'+b+"</a>"+w+'<div class="post-info"><h2 class="post-title">'+g+'</h2><div class="post-meta">'+$+k+"</div>"+x+"</div></div></li>":'<li class="feat-item item-small item-'+u+'"><a class="post-image-link" href="'+v+'">'+b+'</a><div class="post-info"><h2 class="post-title">'+g+'</h2><div class="post-meta">'+k+"</div></div></li>":c.match("slider")?y+='<li class="slider-item item-'+(u+1)+'"><div class="slider-item-inner"><a class="post-image-link" href="'+v+'">'+b+'</a><div class="post-info-wrap"><div class="post-info">'+w+'<h2 class="post-title">'+g+'</h2><div class="post-meta">'+k+"</div>"+x+"</div></div></div></li>":c.match("col-left")||c.match("col-right")?y+=0==u?'<li class="feat-item item-big item-'+u+'"><div class="feat-inner"><a class="post-image-link" href="'+v+'">'+b+"</a>"+w+'<div class="post-info"><h2 class="post-title">'+g+'</h2><div class="post-meta">'+$+k+"</div>"+x+"</div></div></li>":'<li class="feat-item item-small item-'+u+'"><a class="post-image-link" href="'+v+'">'+b+'</a><div class="post-info"><h2 class="post-title">'+g+'</h2><div class="post-meta">'+k+"</div></div></li>":c.match("mini-slide")?y+='<li class="car-item item-'+(u+1)+'"><div class="car-item-inner"><a class="post-image-link" href="'+v+'">'+b+'</a><div class="post-info-wrap"><div class="post-info">'+w+'<h2 class="post-title">'+g+'</h2><div class="post-meta">'+k+"</div></div></div></div></li>":c.match("grid-small")?y+='<li class="feat-item item-small item-'+u+'"><div class="post-image-wrap"><a class="post-image-link" href="'+v+'">'+b+"</a>"+w+'</div><div class="post-info"><h2 class="post-title">'+g+'</h2><div class="post-meta">'+k+"</div></div></li>":c.match("grid-big")?y+='<li class="feat-item item-big item-'+u+'"><div class="feat-inner"><a class="post-image-link" href="'+v+'">'+b+"</a>"+w+'<div class="post-info"><h2 class="post-title">'+g+'</h2><div class="post-meta">'+$+k+"</div>"+x+"</div></div></li>":c.match("feat-list")?y+='<li class="feat-item item-'+u+'"><div class="feat-inner"><a class="post-image-link" href="'+v+'">'+b+"</a>"+w+'<div class="post-info"><h2 class="post-title">'+g+'</h2><div class="post-meta">'+$+k+"</div>"+C+"</div></div></li>":c.match("post-list")?y+='<li class="item-'+u+'"><a class="post-image-link" href="'+v+'">'+b+'</a><h2 class="post-title">'+g+'</h2><div class="post-meta">'+k+"</div></div></li>":c.match("related")&&(y+='<li class="related-item item-'+u+'"><div class="post-image-wrap"><a class="post-image-link" href="'+v+'">'+b+"</a>"+w+'</div><h2 class="post-title">'+g+'</h2><div class="post-meta">'+k+"</div></li>"),h+=y}h+="</ul>"}else h='<ul class="no-posts">Error: No Posts Found <i class="fa fa-frown-o"/></ul>';if(c.match("mega-menu"))n.addClass("has-sub mega-menu").append(h),n.find("a:first").attr("href",(function(t,a){return a="recent"==m||"random"==m?a.replace(a,"/search/?&max-results="+postPerPage):a.replace(a,"/search/label/"+m+"?&max-results="+postPerPage)}));else if(c.match("ticker-posts")){n.html(h).parent().addClass("show-ticker"),n.find(".ticker-widget").owlCarousel({items:1,animateIn:"fadeInUp",animateOut:"fadeOutUp",smartSpeed:0,rtl:!1,nav:!0,navText:["",""],loop:!0,autoplay:!0,autoplayHoverPause:!0,dots:!1,mouseDrag:!1,touchDrag:!1,freeDrag:!1,pullDrag:!1})}else if(c.match("hot-posts"))n.html(h).parent().addClass("show-hot");else if(c.match("slide-posts")){n.html(h).parent().addClass("show-slide"),n.find(".slide-posts").owlCarousel({items:4,rtl:!1,nav:!0,navText:["",""],loop:!0,margin:10,autoplay:!0,autoplayHoverPause:!0,dots:!1,mouseDrag:!1,touchDrag:!1,freeDrag:!1,pullDrag:!1,responsiveClass:!0,responsive:{0:{items:1},768:{items:3},1e3:{items:4,loop:!0}}}),n.parent().find(".widget-title").append('<a class="view-all" href="/search/label/'+m+"?&max-results="+postPerPage+'">'+messages.viewAll+"</a>")}else if(c.match("slider")){n.html(h).parent().addClass("show-slider"),n.find(".main-slider").owlCarousel({items:1,animateIn:"fadeInRight",animateOut:"fadeOutRight",smartSpeed:0,rtl:!1,nav:!0,navText:["",""],loop:!0,autoplay:!0,autoplayHoverPause:!0,dots:!1,mouseDrag:!1,touchDrag:!1,freeDrag:!1,pullDrag:!1}),n.parent().find(".widget-title").append('<a class="view-all" href="/search/label/'+m+"?&max-results="+postPerPage+'">'+messages.viewAll+"</a>")}else if(c.match("mini-slide")){n.html(h).parent().addClass("show-slide"),n.find(".slide-posts").owlCarousel({items:3,rtl:!1,nav:!0,navText:["",""],loop:!0,margin:10,autoplay:!1,autoplayHoverPause:!0,dots:!1,mouseDrag:!1,touchDrag:!1,freeDrag:!1,pullDrag:!1,responsiveClass:!0,responsive:{0:{items:1},768:{items:3},1e3:{items:3,loop:!0}}}),n.parent().find(".widget-title").append('<a class="view-all" href="/search/label/'+m+"?&max-results="+postPerPage+'">'+messages.viewAll+"</a>")}else c.match("feat-big")||c.match("feat-list")||c.match("col-left")||c.match("col-right")||c.match("grid-small")||c.match("grid-big")?(n.parent().find(".widget-title").append('<a class="view-all" href="/search/label/'+m+"?&max-results="+postPerPage+'">'+messages.viewAll+"</a>"),(c.match("col-left")||c.match("col-right"))&&(c.match("col-right")&&n.parent().addClass("col-right"),n.parent().addClass("col-width")),n.html(h).parent().addClass("show-widget")):n.html(h);n.find(".post-thumb").lazyyard()}})}}$(".index-post .post-image-link .post-thumb, .PopularPosts .post-image-link .post-thumb, .FeaturedPost .entry-image-link .post-thumb,.about-author .author-avatar, .item-post .post-body img").lazyyard(),$("#main-menu").each((function(){for(var t=$(this).find(".LinkList ul > li").children("a"),a=t.length,s=0;s<a;s++){var e=t.eq(s),i=e.text();if("_"!==i.charAt(0))if("_"===t.eq(s+1).text().charAt(0)){var l=e.parent();l.append('<ul class="sub-menu m-sub"/>')}"_"===i.charAt(0)&&(e.text(i.replace("_","")),e.parent().appendTo(l.children(".sub-menu")))}for(s=0;s<a;s++){var o=t.eq(s),r=o.text();if("_"!==r.charAt(0))if("_"===t.eq(s+1).text().charAt(0)){var n=o.parent();n.append('<ul class="sub-menu2 m-sub"/>')}"_"===r.charAt(0)&&(o.text(r.replace("_","")),o.parent().appendTo(n.children(".sub-menu2")))}$("#main-menu ul li ul").parent("li").addClass("has-sub"),$("#main-menu ul > li a").each((function(){var t=$(this),a=t.text().trim(),s=a.toLowerCase(),e=a.split("-")[0];s.match("-text")&&(t.attr("data-title",e),t.parent("li").addClass("li-home").find("> a").text(e)),a.match("-icon")&&(t.attr("data-title",e),t.parent("li").addClass("li-home li-home-icon").find("> a").html('<i class="fa fa-home"/>'))})),$("#main-menu .widget").addClass("show-menu")})),$("#main-menu-nav").clone().appendTo(".mobile-menu"),$(".mobile-menu .has-sub").append('<div class="submenu-toggle"/>'),$(".mobile-menu ul > li a").each((function(){var t=$(this),a=t.attr("href").trim(),s=a.toLowerCase(),e=a.split("/")[0],i=t.data("title");t.parent("li.li-home").find("> a").text(i),s.match("mega-menu")&&t.attr("href","/search/label/"+e+"?&max-results="+postPerPage)})),$(".slide-menu-toggle").on("click",(function(){$("body").toggleClass("nav-active")})),$(".mobile-menu ul li .submenu-toggle").on("click",(function(t){$(this).parent().hasClass("has-sub")&&(t.preventDefault(),$(this).parent().hasClass("show")?$(this).parent().removeClass("show").find("> .m-sub").slideToggle(170):$(this).parent().addClass("show").children(".m-sub").slideToggle(170))})),$(".show-search, .show-mobile-search").on("click",(function(){$("#nav-search, .mobile-search-form").fadeIn(250).find("input").focus()})),$(".hide-search, .hide-mobile-search").on("click",(function(){$("#nav-search, .mobile-search-form").fadeOut(250).find("input").blur()})),$(".Label a, a.b-label").attr("href",(function(t,a){return a.replace(a,a+"?&max-results="+postPerPage)})),$(".avatar-image-container img").attr("src",(function(t,a){return a=(a=a.replace("/s35-c/","/s45-c/")).replace("//img1.blogblog.com/img/blank.gif","//4.bp.blogspot.com/-uCjYgVFIh70/VuOLn-mL7PI/AAAAAAAADUs/Kcu9wJbv790hIo83rI_s7lLW3zkLY01EA/s55-r/avatar.png")})),$(".index-post .post-image-link img").attr("src",(function(t,a){return a=a.replace("https://4.bp.blogspot.com/-O3EpVMWcoKw/WxY6-6I4--I/AAAAAAAAB2s/KzC0FqUQtkMdw7VzT6oOR_8vbZO6EJc-ACK4BGAYYCw/w680/nth.png",noThumbnail)})),$(".author-description a").each((function(){$(this).attr("target","_blank")})),$.each($(".list-label li a"),(function(){var t="#"+("000000"+Math.floor(16777215*Math.random()).toString(16)).slice(-6);$(this).css("background-color",t)})),$(".post-nav").each((function(){var t=$("a.prev-post-link").attr("href"),a=$("a.next-post-link").attr("href");$.ajax({url:t,type:"get",success:function(t){var a=$(t).find(".blog-post h1.post-title").text();$(".post-prev a .post-nav-inner p").text(a)}}),$.ajax({url:a,type:"get",success:function(t){var a=$(t).find(".blog-post h1.post-title").text();$(".post-next a .post-nav-inner p").text(a)}})})),$(".post-body strike").each((function(){var t=$(this),a=t.text();a.match("left-sidebar")&&t.replaceWith("<style>.item #main-wrapper{float:right;padding:0 15px 0 0px}.item #sidebar-wrapper{float:left}margin:0}</style>"),a.match("right-sidebar")&&t.replaceWith("<style>.item #main-wrapper{float:left;padding:0 0 0 15px}.item #sidebar-wrapper{float:right}</style>"),a.match("full-width")&&t.replaceWith("<style>.item #main-wrapper{width:100%;padding:0}.item #sidebar-wrapper{display:none}.item #content-wrapper > .container{margin:0}</style>")})),$("#main-wrapper, #sidebar-wrapper").each((function(){1==fixedSidebar&&$(this).theiaStickySidebar({additionalMarginTop:25,additionalMarginBottom:25})})),$(".back-top").each((function(){var t=$(this);$(window).on("scroll",(function(){$(this).scrollTop()>=100?t.fadeIn(250):t.fadeOut(250)})),t.click((function(){$("html, body").animate({scrollTop:0},500)}))})),$("#main-menu #main-menu-nav li").each((function(){var t=$(this),a=t.find("a").attr("href").trim();n(t,a.toLowerCase(),5,a.split("/")[0])})),$("#break-section .widget-content").each((function(){var t=$(this),a=t.text().trim(),s=a.toLowerCase(),e=a.split("/");n(t,s,e[0],e[1])})),$("#hot-section .widget-content").each((function(){var t=$(this),a=t.text().trim();n(t,a.toLowerCase(),4,a.split("/")[0])})),$("#carousel-section .widget-content").each((function(){var t=$(this),a=t.text().trim(),s=a.toLowerCase(),e=a.split("/");n(t,s,e[0],e[1])})),$(".featured-posts .widget-content").each((function(){var t=$(this),a=t.text().trim(),s=a.toLowerCase(),e=a.split("/");if(s.match("feat-big"))var i=5,l=e[0];else i=e[0],l=e[1];n(t,s,i,l)})),$(".common-widget .widget-content").each((function(){var t=$(this),a=t.text().trim(),s=a.toLowerCase(),e=a.split("/");n(t,s,e[0],e[1])})),$(".related-ready").each((function(){var t=$(this),a=t.find(".related-tag").data("label");n(t,"related",3,a)})),$(".blog-post-comments").each((function(){var t,a=commentsSystem,s=(disqus_blogger_current_url,'<div class="fb-comments" data-width="100%" data-href="'+$(location).attr("href")+'" data-numposts="5"></div>'),e="comments-system-"+a;"blogger"==a?$(this).addClass(e).show():"disqus"==a?((t=document.createElement("script")).type="text/javascript",t.async=!0,t.src="//"+disqusShortname+".disqus.com/embed.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(t),$("#comments, #gpluscomments").remove(),$(this).append('<div id="disqus_thread"/>').addClass(e).show()):"facebook"==a?($("#comments, #gpluscomments").remove(),$(this).append(s).addClass(e).show()):"hide"==a?$(this).hide():$(this).addClass("comments-system-default").show()}))})),$(document).scroll((function(){1==fixedMenu&&$(window).on("scroll",(function(t){var a=0;$(this).scrollTop()<240?(a=$(".header-header").height(),$(".header-menu, .mobile-header").removeClass("scrolled-header")):($(".header-menu, .mobile-header").addClass("scrolled-header"),$("body").css({marginTop:a}))}))}));
