$(document).ready(function() {
	menu();
	hamburger();
	carousel();
	catFilters();
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
