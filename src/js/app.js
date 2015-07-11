$(document).ready(function () {
	var numberInputs = "input[type='number']";

	//Initializing stepper inputs
	$(numberInputs).stepper();

	//Setting click event on "buy" buttons
	$('#products_container').on('click', "button", function (e) {
		var productId = $(this).attr("data-id"),
			productQuantityInput = $(this).prev().find(numberInputs),
			productQuantity = +productQuantityInput.val();

		e.preventDefault();
		e.stopPropagation();
		if(productQuantityInput[0]) {
			Basket.purchase(productId, productQuantity);
		}
		return false;
	});

	$('#basket_container').on('change', "input[type='number']", function (e) {
		var productId = $(this).attr("data-id"),
			inputValue = $(this).val(),
			poductMaxQuantity = +($(this).attr("max")),
			regNumersOnly = new RegExp('^[1-9]$');


		e.stopPropagation();

		//If value don't have minus integer or 0, delate item
		if (inputValue === 0 || inputValue < 0) {
			Basket.delatePurchaseItems(productId);
			//If value greater than max product quantity set max product quantity
		}
		if (inputValue > poductMaxQuantity) {
			inputValue = poductMaxQuantity;
			Basket.changePurchaseItemsCount(productId, inputValue);
			//If everything is OK and it's a number, set it
		} else if (regNumersOnly.test(inputValue)) {
			Basket.changePurchaseItemsCount(productId, inputValue);
			//If it's something else set 1
		} else {
			Basket.delatePurchaseItems(productId);
		}
		Products.updatePageView(Products);
	});

	$('#categories_container').on('click', 'a', function (e) {
		e.preventDefault();
		e.stopPropagation();
		$('#price_select').val("none");
		var catId = $(this).attr('href');
		if (catId == "showAll") {
			Products.updatePageView(Products);
		} else {
			Categories.showCategory(catId);
		}
		return false;
	});

	$('#price_select').on('change', function (e) {
		var value = $(this).val();
		if (value == 'high') {
			Products.sortToHigh();
		} else if (value == 'low') {
			Products.sortToLow();
		}
	});
});