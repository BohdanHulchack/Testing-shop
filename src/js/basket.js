//Basket constructor
function Basket(container, template) {
	var that = this;
	this.basketList = [];
	this.basketContainer = container;
	this.basketTemplate = template;
	this.templateBasket = Handlebars.compile(this.basketTemplate.html());
	this.basketQuantity = $('#basket_count');
	this.basketWrapper = $('#basket_wrapper');
	this.basketItemContainer = $('#basket_container');
	this.basketTotalPrice = $('#basket_total_price');
	this.basketTotalSum = 0;
	this.basketTotalItems = 0;


	// Changes product quantity in Basket
	this.changePurchaseItemsCount = function (productId, inputValue) {
		$.each(that.basketList, function (index, value) {
			if (productId == this.id) {
				this.productQuantity = inputValue;
				that.updateBasketView(Basket);
				that.updateStepper();
			}
		});
	};

	// Delate item from Basket
	this.delatePurchaseItems = function (productId) {
		$.each(that.basketList, function (index, value) {
			if (productId == this.id) {
				that.basketList.splice(that.basketList.indexOf(this));
				that.updateBasketView(Basket);
				that.updateStepper();
			}
		});
	};

	// Adding new product to Basket
	this.purchase = function (productId, productQuantity) {

		$.each(Products.products, function (index, value) {

			//Checking either product is already in basket
			if (productId == this.id && this.inBasket === true) {

				//Find product in basket
				$.each(that.basketList, function (index, value) {

					//If purchasing quantity is lesser than product max quantity, add it
					if (productId == this.id && this.quantity > productQuantity && this.productQuantity < this.quantity) {
						this.productQuantity += productQuantity;
						that.updateBasketView(Basket);
						that.updateStepper();
						//If purchasing quantity is greater than product max quantity, add max product quantity
					}
				});

				//If purchasing item is new in basket, add it
			} else if (productId == this.id && this.inBasket === false) {
				this.changeStatus();
				that.basketList.push(new that.purchaseItemConstructor(value, productQuantity));
				that.updateBasketView(Basket);
				that.updateStepper();
			}
		});
	},


	// Purchase item constructor
	this.purchaseItemConstructor = function purchaseItem(value, productQuantity) {
		this.id = value.id;
		this.title = value.title;
		this.quantity = value.quantity;
		this.productQuantity = +(productQuantity);
		this.price = value.price;
		this.totalPrice = null;

		this.countTotalPrice = function () {
			this.totalPrice = null;
			this.totalPrice = +(this.price * this.productQuantity).toFixed(2);
		};
	},


	// Handlebars function to update view on the page
	this.updateBasketView = function (data) {
		this.basketCountQuantity();
		this.basketCountTotalSum();
		this.basketCountItemSum();

		this.basketItemContainer.html('');
		return this.basketContainer.append(this.templateBasket(data));
	},

	//Counts and places total cart quantity
	this.basketCountQuantity = function () {
		that.basketTotalItems = 0;
		$.each(that.basketList, function (index, value) {
			that.basketTotalItems += +this.productQuantity;
		});
		that.basketQuantity.text(that.basketTotalItems);
	},
	//Counts and places total cart sum price
	this.basketCountTotalSum = function () {
		that.basketTotalSum = 0;
		if (that.basketList[0]) {
			$.each(that.basketList, function (index, value) {
				that.basketTotalSum += this.price * this.productQuantity;
				that.basketTotalPrice.text("$ " + that.basketTotalSum.toFixed(2));
			});
		} else {
			that.basketTotalPrice.text("$ " + 0);
		}
	},

	//Initializing stepper input function on all basket items
	this.basketCountItemSum = function () {
		$.each(that.basketList, function (index, value) {
			this.countTotalPrice();
		});
	},

	//Initializing stepper function on all basket
	this.updateStepper = function () {
		this.basketWrapper.find("input[type='number']").stepper();
	};

}

var Basket = new Basket($('#basket_container'), $('#templateBasket'));