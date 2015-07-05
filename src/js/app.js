$(document).ready(function () {

	//Initializing objects
	//Initializing backend paths

	//Initializing stepper inputs
	$("input[type='number']").stepper();

	//Setting click event on "buy" buttons
	$('#products_container').on('click', "button", function (e) {
		var productId = $(this).attr("data-id"),
			productQuantity = $(this).prev().find("input[type='number']").val();
		e.preventDefault();
		e.stopPropagation();
		Basket.purchase(productId, productQuantity);
		return false;
	});
});