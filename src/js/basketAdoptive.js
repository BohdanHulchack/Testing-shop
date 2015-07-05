//Snippet for hiding basket on mobile
(function () {
	var basketWrapper = $('#basket_wrapper'),
		basketBtn = $('#basket_btn');

	function checkVis() {
		return basketWrapper.css('visibility', function (visibility) {
			if (basketWrapper.css("visibility") == "visible") {
				return 'hidden';
			} else {
				return 'visible';
			}
		});
	}

	basketBtn.on('click', function () {
		if (window.innerWidth < 980 && window.innerWidth > 640) {
			checkVis();
		}
	});

	$(window).on("resize", function () {
		if (window.innerWidth < 641 || window.innerWidth > 977) {
			basketWrapper.css('visibility', "visible");
		} else {
			basketWrapper.css('visibility', "hidden");
		}
	});

})();