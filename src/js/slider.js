//Simple slider
function Slider(sliders) {

	$.each(sliders, function (index, value) {
		var that = $(this),
			sliderList = that.find('[data-gallery-list]'),
			sliderItems = that.find('[data-gallery-list] > li').length,
			sliderMainPhoto = that.find('[data-gallery-main] > img')[0];
		sliderWidth = sliderItems * 54;

		if (sliderItems > 3) {
			sliderMinMargin = -((sliderItems - 3) * 54);
		} else {
			that.find('[data-gallery-left]').hide();
			that.find('[data-gallery-right]').hide();
		}

		sliderList.css("width", sliderWidth);

		function getCurrentMargin() {
			return parseInt(sliderList.css("margin-left"));
		}

		that.on('click', '.gallery-cell--list--item', function () {
			if (sliderMainPhoto.src !== $(this).find('img')[0].src) {
				sliderMainPhoto.src = $(this).find('img')[0].src;
			}
		});

		that.on('click', 'a', function (e) {
			if ($(this).hasClass('gallery-cell--left')) {

				if (getCurrentMargin() <= 0 && getCurrentMargin() > sliderMinMargin) {
					sliderList.animate({
						marginLeft: "-=54",
					}, 300);
				}

			} else if ($(this).hasClass('gallery-cell--right')) {
				if (getCurrentMargin() <= 0 && getCurrentMargin() <= sliderMinMargin) {
					sliderList.animate({
						marginLeft: "+=54",
					}, 300);
				}
			}
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
	});
}