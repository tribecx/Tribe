$(document).ready(function() {
	carousel();
	catFilters();
});

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
	$('#popup-'+name).show();
}

function closePopup(name) {
	$('#popup-'+name).hide();
}
