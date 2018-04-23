$(document).ready(function() {
	menu();
	hamburger();
	carousel();
	blog();
	smoothScroll();
	mailer();
});

function menu() {
	$(window).scroll(function() {
		var top = $('.trigger-header').offset().top - 112;

		if ($(document).scrollTop() < top) {
			$('.header').removeClass('alt');
		} else {
			$('.header').addClass('alt');
		}
	});
}

function hamburger() {
	$(".hamburger").click(function(){
    $('.hamburger, .mobile-menu').toggleClass('active');
  });

	$('.anchor').click(function() {
		$('.hamburger, .mobile-menu').toggleClass('active');
	});
}

function carousel() {
	$('.owl-carousel').owlCarousel({
		autoplay: true,
		autoplaySpeed: 1000,
		autoplayTimeout: 9000,
		items: 1,
		onChanged: callback,
		rewind: true
	});
}

function heroCopy() {
	var copyHeight = $('.hero-text .active').innerHeight();

	$('.hero-text').css('height', copyHeight);
}

function callback(event) {
  var item = event.item.index;

  switch (item) {
		case 0:
			$('.hero-copy').removeClass('active');
			$('.copy-1').addClass('active');
			break;
		case 1:
			$('.hero-copy').removeClass('active');
			$('.copy-2').addClass('active');
			break;
		case 2:
			$('.hero-copy').removeClass('active');
			$('.copy-3').addClass('active');
			break;
		case 3:
			$('.hero-copy').removeClass('active');
			$('.copy-4').addClass('active');
			break;
	}

	heroCopy();
}

function openPopup(name) {
	$.ajax({
		url: 'portfolio/' + name + '.html',
		dataType: 'html'
	}).then(function(html) {
		$('.popup').html(html);
	});

	$('.popup').show();
	$('body').css({'height':'100vh','overflow':'hidden'});
}

function closePopup(name) {
	$('.popup').hide().empty();
	$('.popup-video').each(function() {
		$(this)[0].load();
	});
	$('body').css({'height':'auto','overflow':'visible'});
}

function blog() {
	$('body').hasClass('main') ? mainPosts()  : $('body').hasClass('news') ? blogPosts()  : $('body').hasClass('article') && postPosts()
}

function mainPosts() {
	$.ajax({
  	url: "https://public-api.wordpress.com/wp/v2/sites/tribedigitalagency.wordpress.com/posts?per_page=3&orderby=date",
  	dataType: 'json'
  }).then(function(posts) {
  	showPosts(posts);
  });
}

function blogPosts() {
	$.ajax({
  	url: "https://public-api.wordpress.com/wp/v2/sites/tribedigitalagency.wordpress.com/posts?per_page=100&orderby=date",
  	dataType: 'json'
  }).then(function(posts) {
  	howMany(posts);
  });
}

function postPosts() {
	var id = getUrlParameter('id');

  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/tribedigitalagency.wordpress.com/posts/"+id+"",
    dataType: 'json'
  }).then(function(post) {
    drawPost(post);
  });

  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/tribedigitalagency.wordpress.com/posts?per_page=3&orderby=date",
    dataType: 'json'
  }).then(function(posts) {
    showPosts(posts);
  });
}

function showPosts(posts) {
	for (var i = 0; i <= posts.length; i++) {
    var image = posts[i].featured_media_url;
    var title = posts[i].title.rendered;
    var content = $(posts[i].excerpt.rendered).text();
    var date = dateConverter(posts[i].date);
    var id = posts[i].id;

    var post =
		'<div class="news-item">'+
			'<div class="news-image news-image'+i+'"></div>'+
			'<div class="news-info">'+
				'<a href="post.html?id='+id+'"><h4 class="news-title">'+title+'</h4></a>'+
				'<p class="news-excerpt">'+content+'</p>'+
				'<p class="news-date">'+date+'</p>'+
				'<a class="news-link" href="post.html?id='+id+'">Ver más</a>'+
			'</div>'+
		'</div>';

    $('.blog-news').append(post);

		$('.news-image'+i+'').css('background','url("'+image+'") center/cover no-repeat');
	}
}

function howMany(posts) {
  var count = posts.length;
  var shown;
  var rest = count;
  var need;
  var start = 1;

  if (count <= 6) {
  	need = count;
  	shown = count;

  	$('.blog-more').hide();
  } else {
  	need =  6;
  	shown = 6;
  	rest = count - shown;
  }

  $('.blog-more').on('click', function() {
  	if (rest >= 7) {
  	  need = 6;
  	  start = start + need;
  	  shown = shown + need;
  	  rest = count - shown;

  	  drawBlog(posts, start, need);
  	} else {
  	  start = start + need;
  	  need = rest;
  	  shown = shown + need;
  	  rest = count - shown;

  	  drawBlog(posts, start, need);

  	  if (rest == 0) {
  	  	$('.blog-more').fadeOut();
  	  }
  	}
  });

  drawBlog(posts, start, need);
}

function drawBlog(posts, start, need) {
	for (var i = start-1; i <= start+(need-2); i++) {
		var image = posts[i].featured_media_url;
    var title = posts[i].title.rendered;
    var content = $(posts[i].excerpt.rendered).text();
    var date = dateConverter(posts[i].date);
    var id = posts[i].id;

    var post =
		'<div class="news-item">'+
			'<div class="news-image news-image'+i+'"></div>'+
			'<div class="news-info">'+
				'<a href="post.html?id='+id+'"><h4 class="news-title">'+title+'</h4></a>'+
				'<p class="news-excerpt">'+content+'</p>'+
				'<p class="news-date">'+date+'</p>'+
				'<a class="news-link" href="post.html?id='+id+'">Ver más</a>'+
			'</div>'+
		'</div>';

    $('.blog-news').append(post);

		$('.news-image'+i+'').css('background','url("'+image+'") center/cover no-repeat');
	}
}

function drawPost(post) {
	var background = post.featured_media_url;
  var title = post.title.rendered
  var date = dateConverter(post.date);
  var content = post.content.rendered;

  $('.post-head').css('background-image','url("'+background+'")');
  $('.post-title').html(title);
  $('.post-date').html(date);
  $('.post-content').html(content);

	postLayout();
}

function dateConverter(date) {
  var newDate = date.split('T') [0].split('-');
  return newDate[2] + ' de ' + ['Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'][parseInt(newDate[1]) - 1] + ' de ' + newDate[0]
}

function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}

function postLayout() {
	var image = $('.post-content p img');
	var embed = $('.post-content span[class^="embed"]');

	$(image).each(function() {
		if (!$(this).prev().is('img') && !$(this).next().is('img')) {
			$(this).css({'display':'block','flex':'0 1 100%'});
		}
	});

	if ($(embed).parent().is('p')) {
		$(embed).parent().css('display','inline-block');
	}

	if ($(image).parent().is('p')) {
		$(image).parent().css('display','flex');
	}
}

function mailer() {
	var form = $('#contact-form');
	var alert = $('.alert');

	$(form).submit(function(e) {
		e.preventDefault();

		var formData = $(form).serialize();

		$.ajax({
			type: 'POST',
			url: 'assets/php/contact.php',
			data: formData
		}).done(function(response) {
			$(alert).removeClass('error');
			$(alert).addClass('success');

			$(alert).text(response);

			$('#name').val('');
			$('#company').val('');
			$('#email').val('');
			$('#message').val('');
		}).fail(function(data) {
			$(alert).removeClass('success');
			$(alert).addClass('error');

			if (data.responseText !== '') {
				$(alert).text(data.responseText);
			} else {
				$(alert).text('Lo sentimos, ha ocurrido un error.');
			}
		});
	});
}

function smoothScroll() {
	if ($('.header').innerHeight() > 78) header = 78;
   else var header = $('.header').innerHeight();
	$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (e) {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var o = $(this.hash);
			(o = o.length ? o : $('[name=' + this.hash.slice(1) + ']')).length && (e.preventDefault(), $('html, body').animate({
				scrollTop: o.offset().top - header
			}, 1000, 'easeInOutExpo', function () {
				var e = $(o);
				if (e.focus(), e.is(':focus')) return !1;
				e.attr('tabindex', '-1'),
				e.focus()
			}))
		}
	})
}

$.easing.jswing = $.easing.swing;

$.extend($.easing, {
	def: 'easeOutQuad',
	swing: function (e, t, n, a, u) {
		return $.easing[$.easing.def](e, t, n, a, u)
	},
	easeInQuad: function (e, t, n, a, u) {
		return a * (t /= u) * t + n
	},
	easeOutQuad: function (e, t, n, a, u) {
		return - a * (t /= u) * (t - 2) + n
	},
	easeInOutQuad: function (e, t, n, a, u) {
		return (t /= u / 2) < 1 ? a / 2 * t * t + n : - a / 2 * (--t * (t - 2) - 1) + n
	},
	easeInCubic: function (e, t, n, a, u) {
		return a * (t /= u) * t * t + n
	},
	easeOutCubic: function (e, t, n, a, u) {
		return a * ((t = t / u - 1) * t * t + 1) + n
	},
	easeInOutCubic: function (e, t, n, a, u) {
		return (t /= u / 2) < 1 ? a / 2 * t * t * t + n : a / 2 * ((t -= 2) * t * t + 2) + n
	},
	easeInQuart: function (e, t, n, a, u) {
		return a * (t /= u) * t * t * t + n
	},
	easeOutQuart: function (e, t, n, a, u) {
		return - a * ((t = t / u - 1) * t * t * t - 1) + n
	},
	easeInOutQuart: function (e, t, n, a, u) {
		return (t /= u / 2) < 1 ? a / 2 * t * t * t * t + n : - a / 2 * ((t -= 2) * t * t * t - 2) + n
	},
	easeInQuint: function (e, t, n, a, u) {
		return a * (t /= u) * t * t * t * t + n
	},
	easeOutQuint: function (e, t, n, a, u) {
		return a * ((t = t / u - 1) * t * t * t * t + 1) + n
	},
	easeInOutQuint: function (e, t, n, a, u) {
		return (t /= u / 2) < 1 ? a / 2 * t * t * t * t * t + n : a / 2 * ((t -= 2) * t * t * t * t + 2) + n
	},
	easeInSine: function (e, t, n, a, u) {
		return - a * Math.cos(t / u * (Math.PI / 2)) + a + n
	},
	easeOutSine: function (e, t, n, a, u) {
		return a * Math.sin(t / u * (Math.PI / 2)) + n
	},
	easeInOutSine: function (e, t, n, a, u) {
		return - a / 2 * (Math.cos(Math.PI * t / u) - 1) + n
	},
	easeInExpo: function (e, t, n, a, u) {
		return 0 == t ? n : a * Math.pow(2, 10 * (t / u - 1)) + n
	},
	easeOutExpo: function (e, t, n, a, u) {
		return t == u ? n + a : a * (1 - Math.pow(2, - 10 * t / u)) + n
	},
	easeInOutExpo: function (e, t, n, a, u) {
		return 0 == t ? n : t == u ? n + a : (t /= u / 2) < 1 ? a / 2 * Math.pow(2, 10 * (t - 1)) + n : a / 2 * (2 - Math.pow(2, - 10 * --t)) + n
	},
	easeInCirc: function (e, t, n, a, u) {
		return - a * (Math.sqrt(1 - (t /= u) * t) - 1) + n
	},
	easeOutCirc: function (e, t, n, a, u) {
		return a * Math.sqrt(1 - (t = t / u - 1) * t) + n
	},
	easeInOutCirc: function (e, t, n, a, u) {
		return (t /= u / 2) < 1 ? - a / 2 * (Math.sqrt(1 - t * t) - 1) + n : a / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
	},
	easeInElastic: function (e, t, n, a, u) {
		var o = 1.70158,
		r = 0,
		i = a;
		if (0 == t) return n;
		if (1 == (t /= u)) return n + a;
		if (r || (r = 0.3 * u), i < Math.abs(a)) {
			i = a;
			o = r / 4
		} else o = r / (2 * Math.PI) * Math.asin(a / i);
		return - i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * (2 * Math.PI) / r) + n
	},
	easeOutElastic: function (e, t, n, a, u) {
		var o = 1.70158,
		r = 0,
		i = a;
		if (0 == t) return n;
		if (1 == (t /= u)) return n + a;
		if (r || (r = 0.3 * u), i < Math.abs(a)) {
			i = a;
			o = r / 4
		} else o = r / (2 * Math.PI) * Math.asin(a / i);
		return i * Math.pow(2, - 10 * t) * Math.sin((t * u - o) * (2 * Math.PI) / r) + a + n
	},
	easeInOutElastic: function (e, t, n, a, u) {
		var o = 1.70158,
		r = 0,
		i = a;
		if (0 == t) return n;
		if (2 == (t /= u / 2)) return n + a;
		if (r || (r = u * (0.3 * 1.5)), i < Math.abs(a)) {
			i = a;
			o = r / 4
		} else o = r / (2 * Math.PI) * Math.asin(a / i);
		return t < 1 ? i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * (2 * Math.PI) / r) * - 0.5 + n : i * Math.pow(2, - 10 * (t -= 1)) * Math.sin((t * u - o) * (2 * Math.PI) / r) * 0.5 + a + n
	},
	easeInBack: function (e, t, n, a, u, o) {
		return void 0 == o && (o = 1.70158),
		a * (t /= u) * t * ((o + 1) * t - o) + n
	},
	easeOutBack: function (e, t, n, a, u, o) {
		return void 0 == o && (o = 1.70158),
		a * ((t = t / u - 1) * t * ((o + 1) * t + o) + 1) + n
	},
	easeInOutBack: function (e, t, n, a, u, o) {
		return void 0 == o && (o = 1.70158),
		(t /= u / 2) < 1 ? a / 2 * (t * t * ((1 + (o *= 1.525)) * t - o)) + n : a / 2 * ((t -= 2) * t * ((1 + (o *= 1.525)) * t + o) + 2) + n
	},
	easeInBounce: function (e, t, n, a, u) {
		return a - $.easing.easeOutBounce(e, u - t, 0, a, u) + n
	},
	easeOutBounce: function (e, t, n, a, u) {
		return (t /= u) < 1 / 2.75 ? a * (7.5625 * t * t) + n : t < 2 / 2.75 ? a * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + n : t < 2.5 / 2.75 ? a * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + n : a * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + n
	},
	easeInOutBounce: function (e, t, n, a, u) {
		return t < u / 2 ? 0.5 * $.easing.easeInBounce(e, 2 * t, 0, a, u) + n : 0.5 * $.easing.easeOutBounce(e, 2 * t - u, 0, a, u) + 0.5 * a + n
	}
});

/*
function catFilters() {
	$('.categories-more').on('click', function() {
		$('.toggle-text, .categories-options')
		  .toggleClass('hidden');
	});

	$('.categories-item:not(.categories-all)').on('click', function() {
		$(this).toggleClass('active');
		$('.categories-all').removeClass('active');
	});

	var count = 0;

	$('.categories-item').each(function() {
		if ($(this).hasClass('active')) {
			count+=1;
		}
	});

	if ($('.categories-item').length == count) {
		$(this).toggleClass('active');
	}
}
*/
