$(document).ready(function() {
	catFilters();
});

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
